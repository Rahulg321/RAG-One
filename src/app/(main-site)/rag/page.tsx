'use client';

import { Stock } from '@/components/stock';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Weather } from '@/components/weather';
import { useChat } from 'ai/react';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function Chat() {
    const [files, setFiles] = useState<FileList | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload, error, setMessages } = useChat({
        maxSteps: 8,
        onFinish: (message, { usage, finishReason }) => {
            console.log('Finished streaming message:', message);
            console.log('Token usage:', usage);
            console.log('Finish reason:', finishReason);
        },
        onError: error => {
            console.error('An error occurred:', error);
        },
        onResponse: response => {
            /**It's worth noting that you can abort the processing by throwing an error in the onResponse callback. only do it when we have undesired responses from the AI */
            console.log('Received HTTP response from server:', response);
        },
    });

    const handleDelete = (id: string) => {
        setMessages(messages.filter(message => message.id !== id))
    }

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <div className="space-y-4">
                {messages.map(m => (
                    <div key={m.id} className="whitespace-pre-wrap">
                        <div>
                            <div className="font-bold">{m.role}</div>
                            <p>
                                {m.content.length > 0 ? (
                                    <div>
                                        {m.content}
                                        <button onClick={() => handleDelete(m.id)}>Delete</button>
                                    </div>
                                ) : (
                                    <div>
                                        <span className="italic font-light">
                                            {'calling tool: ' + m?.toolInvocations?.[0].toolName}
                                        </span>
                                    </div>
                                )}
                            </p>
                            <div>
                                {m.toolInvocations?.map(toolInvocation => {
                                    const { toolName, toolCallId, state } = toolInvocation;

                                    if (state === 'result') {
                                        if (toolName === 'displayWeather') {
                                            const { result } = toolInvocation;
                                            return (
                                                <div key={toolCallId}>
                                                    <Weather {...result} />
                                                </div>
                                            );
                                        } else if (toolName === 'getStockPrice') {
                                            const { result } = toolInvocation;
                                            return <Stock key={toolCallId} {...result} />;
                                        }
                                    } else {
                                        return (
                                            <div key={toolCallId}>
                                                {toolName === 'displayWeather' ? (
                                                    <div>Loading weather...</div>
                                                ) : toolName === 'getStockPrice' ? (
                                                    <div>Loading stock price...</div>
                                                ) : <div>Loading....</div>}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            <div>
                                {m?.experimental_attachments
                                    ?.filter(attachment =>
                                        attachment?.contentType?.startsWith('image/'),
                                    )
                                    .map((attachment, index) => (
                                        <Image
                                            key={`${m.id}-${index}`}
                                            src={attachment.url}
                                            width={500}
                                            height={500}
                                            alt={attachment.name ?? `attachment-${index}`}
                                        />
                                    ))}
                            </div>
                            {isLoading && (
                                <div>
                                    <Skeleton className='size-6 rounded-full' />
                                    <button onClick={stop} disabled={!isLoading}>Stop</button>
                                </div>
                            )}
                            {error && (
                                <>
                                    <div>An error occurred.</div>
                                    <Button type="button" variant={"destructive"} onClick={() => reload()}>
                                        Retry
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={event => {
                handleSubmit(event, {
                    experimental_attachments: files,
                    body: {
                        customKey: "somevalue"
                    }
                });

                setFiles(undefined);

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }}>
                <input
                    type="file"
                    className=""
                    onChange={event => {
                        if (event.target.files) {
                            setFiles(event.target.files);
                        }
                    }}
                    multiple
                    ref={fileInputRef}
                />
                <input
                    className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}
