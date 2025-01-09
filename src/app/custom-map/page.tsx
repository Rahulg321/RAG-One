"use client";

import React, { useEffect, useState } from 'react'
import { APIProvider, Map, Marker, useMap, useMapsLibrary, useMarkerRef } from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';


const CustomMapPage = () => {
    const [markerRef, marker] = useMarkerRef();
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });
    const [error, setError] = useState<string | null>(null);

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                    setError(null);
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };



    useEffect(() => {
        if (!marker) {
            return;
        }

        // do something with marker instance here
    }, [marker]);



    return (
        <section className='block-space big-container overflow-hidden'>
            <h1>Climate Connect</h1>
            <div>
                <Button onClick={getUserLocation}>Get Location</Button>
                {currentLocation.latitude && currentLocation.longitude ? (
                    <div>
                        <span className='block'>Latitude: {currentLocation.latitude}</span>
                        <span className='block'>Longitude: {currentLocation.longitude}</span>
                    </div>
                ) : (
                    <p>{error || 'Click the button to get your location.'}</p>
                )}
            </div>


            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    style={{ width: '100vw', height: '100vh' }}
                    defaultCenter={{ lat: 22.54992, lng: 0 }}
                    defaultZoom={3}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    <Marker ref={markerRef} position={{ lat: currentLocation.latitude || 53.54992, lng: currentLocation.longitude || 10.00678 }} />
                </Map>

                <CustomMapComponent />
            </APIProvider>
        </section>
    )
}

export default CustomMapPage


const CustomMapComponent = () => {
    const map = useMap();

    // triggers loading the places library and returns the API Object once complete (the
    // component calling the hook gets automatically re-rendered when this is
    // the case)
    const placesLibrary = useMapsLibrary('places');

    const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

    useEffect(() => {
        if (!placesLibrary || !map) return;

        // when placesLibrary is loaded, the library can be accessed via the
        // placesLibrary API object
        setPlacesService(new placesLibrary.PlacesService(map));
    }, [placesLibrary, map]);

    useEffect(() => {
        if (!placesService) return;

        console.log("placesService", placesService)
        // ...use placesService...
    }, [placesService]);

    return <></>;
};
