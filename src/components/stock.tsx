type StockProps = {
    price: number;
    symbol: string;
};

export const Stock = ({ price, symbol }: StockProps) => {
    return (
        <div className="bg-muted p-4 rounded-md">
            <h2>Stock Information</h2>
            <p>Symbol: {symbol}</p>
            <p>Price: ${price}</p>
        </div>
    );
};
