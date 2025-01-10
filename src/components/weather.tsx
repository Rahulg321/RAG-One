type WeatherProps = {
    temperature: number;
    weather: string;
    location: string;
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
    return (
        <div className="bg-muted p-4 rounded-md">
            <h2>Current Weather for {location}</h2>
            <span>Condition: {weather}</span>
            <span>Temperature: {temperature}°C</span>
        </div>
    );
};
