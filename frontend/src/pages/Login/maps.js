import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, RoutePanel, Button } from 'react-yandex-maps';

const DeliveryMap = () => {
    const [courierLocation, setCourierLocation] = useState([0, 0]); // Placeholder coordinates
    const [destination, setDestination] = useState([39.764855457089354, 64.43235714337523]); // User's address
    const [isRouteActive, setIsRouteActive] = useState(false);

    // Simulate courier's location updates (replace with real-time tracking)
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate movement - update courier's location
            setCourierLocation([
                courierLocation[0] + 0.001,
                courierLocation[1] + 0.001,
            ]);
        }, 5000);

        // Clean up the interval on unmount
        return () => clearInterval(interval);
    }, [courierLocation]);

    const startNavigation = () => {
        setIsRouteActive(true);
    };

    return (
        <YMaps
            query={{
                apikey: "e24090ad-351e-4321-8071-40c04c55f144", // Replace with your Yandex Maps API key
                lang: "en_US",
                coordorder: "latlong",
                load: "package.full",
            }}
        >
            <Map
                defaultState={{
                    center: courierLocation,
                    zoom: 10,
                }}
                width="100%"
                height="400px"
            >
                <RoutePanel
                    from={courierLocation}
                    to={destination}
                    options={{
                        controlTop: '5px',
                    }}
                    active={isRouteActive}
                />
                <Button
                    data={{ content: isRouteActive ? 'Delivery in Progress' : 'Start Delivery' }}
                    options={{ float: 'right' }}
                    onClick={startNavigation}
                    disabled={isRouteActive}
                />
            </Map>
        </YMaps>
    );
};

export default DeliveryMap;
