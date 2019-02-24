import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { mapOptions } from "../styledComponents/MapStyles"

  const MyMapComponent = withGoogleMap((props) =>
     <GoogleMap
       defaultZoom={6}
       defaultCenter={{ lat: props.lat, lng: props.lng }}
       options={mapOptions}
     >
       {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng}} />}
     </GoogleMap>
    )

export default MyMapComponent
