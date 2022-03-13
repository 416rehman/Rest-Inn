import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: {text: string}) => <div>{text}</div>;

interface IProps {
    center: {
        lat: number,
        lng: number
    },
    zoom: number
}

function Map({center = {lat: 59.95, lng: 30.33}, zoom =11}: IProps) {
    return (
        // Important! Always set the container height explicitly
        <div style={{height: '100vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyCTsPApskQvfifUtvjWvzwzsV93T5nn1dk'}}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <AnyReactComponent text="My Marker"/>
            </GoogleMapReact>
        </div>
    );
}

export default Map;