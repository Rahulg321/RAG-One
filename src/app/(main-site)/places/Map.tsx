"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { APIProvider, Map, Marker, useMap, useMapsLibrary, useMarkerRef } from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import vitaminCStyles from '@/lib/map-styles/vitamin-c';
import brightColorsStyles from '@/lib/map-styles/bright-colors';
import {
    AdvancedMarker,
    InfoWindow,
    Pin
} from '@vis.gl/react-google-maps';
import { MovingMarker } from './moving-marker';
import { MarkerWithInfowindow } from './marker-with-infowindow';
import { RealEstateListing } from '@/lib/types';
import { loadRealEstateListing } from '@/app/(server)/data/load-real-estate-listing';
import { CustomAdvancedMarker } from '@/components/custom-advanced-marker/custom-advanced-marker';
import { getCategories, loadTreeDataset, Tree } from '@/app/(server)/data/trees';
import { ClusteredTreeMarkers } from './clustered-tree-markers';
import { ControlPanelTrees } from './control-panel-trees';
import { Feature, Point } from 'geojson';
import { ClusteredMarkers } from './clustered-markers';
import { InfoWindowContent } from './castle-info-window-content';
import { CastlesGeojson, loadCastlesGeojson } from '@/app/(server)/data/castles';


const CustomMap = () => {
    const [markerRef, marker] = useMarkerRef();
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });
    const [error, setError] = useState<string | null>(null);
    const [realEstateListing, setRealEstateListing] =
        useState<RealEstateListing | null>(null);
    const [trees, setTrees] = useState<Tree[]>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);



    const [geojson, setGeojson] = useState<CastlesGeojson | null>(null);
    const [numClusters, setNumClusters] = useState(0);

    useEffect(() => {
        void loadCastlesGeojson().then(data => setGeojson(data));
    }, []);

    const [infowindowData, setInfowindowData] = useState<{
        anchor: google.maps.marker.AdvancedMarkerElement;
        features: Feature<Point>[];
    } | null>(null);

    const handleInfoWindowClose = useCallback(
        () => setInfowindowData(null),
        [setInfowindowData]
    );



    // load data asynchronously
    useEffect(() => {
        loadTreeDataset().then(data => setTrees(data));
    }, []);

    // get category information for the filter-dropdown
    const categories = useMemo(() => getCategories(trees), [trees]);
    const filteredTrees = useMemo(() => {
        if (!trees) return null;

        return trees.filter(
            t => !selectedCategory || t.category === selectedCategory
        );
    }, [trees, selectedCategory]);




    useEffect(() => {
        void loadRealEstateListing().then(data => {
            setRealEstateListing(data);
        });
    }, []);


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
        <div>
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


            <div className='advanced-marker-example rounded-xl'>
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} onLoad={() => console.log('Maps API has loaded.')}>
                    <Map
                        mapId={'bf51a910020fa25a'}
                        style={{ width: '100vw', height: '100vh', color: "darkblue" }}
                        defaultCenter={{ lat: 22.54992, lng: 0 }}
                        defaultZoom={3}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        className='custom-marker-clustering-map rounded-xl'
                    >
                        {filteredTrees && <ClusteredTreeMarkers trees={filteredTrees} />}
                        {geojson && (
                            <ClusteredMarkers
                                geojson={geojson}
                                setNumClusters={setNumClusters}
                                setInfowindowData={setInfowindowData}
                            />
                        )}

                        {infowindowData && (
                            <InfoWindow
                                onCloseClick={handleInfoWindowClose}
                                anchor={infowindowData.anchor}>
                                <InfoWindowContent features={infowindowData.features} />
                            </InfoWindow>
                        )}

                        <ControlPanelTrees
                            categories={categories}
                            onCategoryChange={setSelectedCategory}
                        />

                        {/* advanced marker with html-content */}
                        {realEstateListing && (
                            <CustomAdvancedMarker realEstateListing={realEstateListing} />
                        )}


                        <Marker ref={markerRef} position={{ lat: currentLocation.latitude || 53.54992, lng: currentLocation.longitude || 10.00678 }} clickable={true}
                            onClick={() => alert('marker was clicked!')}
                            title={'clickable google.maps.Marker'} />
                        {/* advanced marker with customized pin */}
                        <AdvancedMarker
                            position={{ lat: 20, lng: 10 }}
                            title={'AdvancedMarker with customized pin.'}>
                            <Pin
                                background={'#22ccff'}
                                borderColor={'#1e89a1'}
                                glyphColor={'#0f677a'}></Pin>
                        </AdvancedMarker>

                        {/* advanced marker with html-content */}
                        <AdvancedMarker
                            position={{ lat: 30, lng: 10 }}
                            title={'AdvancedMarker with custom html content.'}>
                            <div
                                style={{
                                    width: 16,
                                    height: 16,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    background: '#1dbe80',
                                    border: '2px solid #0e6443',
                                    borderRadius: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}></div>
                        </AdvancedMarker>

                        {/* simple positioned infowindow */}
                        <InfoWindow position={{ lat: 40, lng: 0 }} maxWidth={200}>
                            <p>
                                This is the content for another infowindow with <em>HTML</em>
                                -elements.
                            </p>
                        </InfoWindow>
                        {/* continously updated marker */}
                        <MovingMarker />

                        {/* simple stateful infowindow */}
                        <MarkerWithInfowindow />



                    </Map>

                    <CustomMapComponent />
                </APIProvider>
            </div>
        </div>
    )
}

export default CustomMap


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
