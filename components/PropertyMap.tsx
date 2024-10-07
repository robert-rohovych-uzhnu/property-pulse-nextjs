'use client';
import React, {FunctionComponent, useEffect, useState} from "react"
import {fromAddress, OutputFormat, setDefaults} from "react-geocode";
import Map, {Marker} from "react-map-gl";
import Spinner from "@/components/Spinner";
import pin from "@/assets/images/pin.svg";
import Image from "next/image";
import 'mapbox-gl/dist/mapbox-gl.css';

type PropertyMapProps = {
    property: any
}

/**
 * @name PropertyMap
 * @param property
 * @constructor
 */
const PropertyMap: FunctionComponent<PropertyMapProps> = ({property}) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px'
    });

    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(null);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        language: 'en',
        region: 'us',
        outputFormat: OutputFormat.JSON,
    });

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const res = await fromAddress(`${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipcode}`);
                if (res.results.length === 0) {
                    setGeocodeError(true);
                    return;
                }
                const {lat, lng} = res.results[0].geometry.location;

                setLat(lat);
                setLng(lng);
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng
                });
            } catch (error) {
                console.log(error);
                setGeocodeError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchCoords();
    }, []);

    if (loading) return <Spinner/>;

    if (geocodeError) return <div className='text-xl'>Geocode error</div>;

    return !loading && (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={import('mapbox-gl')}
            initialViewState={{
                longitude: lng ?? undefined,
                latitude: lat ?? undefined,
                zoom: 15
            }}
            style={{width: '100%', height: '500px'}}
            mapStyle={'mapbox://styles/mapbox/streets-v9'}
        >
            <Marker longitude={lng ?? 0} latitude={lat ?? 0} anchor='bottom'>
                <Image src={pin} alt='location' width={40} height={40}></Image>
            </Marker>
        </Map>
    );
}

export default PropertyMap;
