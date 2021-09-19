import React from 'react';
import GoogleMapReact from 'google-map-react';
import './maps.scss';

const Maps = ({lat, lng}) => (
  <div className="maps">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY}}
        center={{lat: lat, lng: lng}}
        zoom={8}
      >
      </GoogleMapReact>
    
  </div>
);

export default Maps;
