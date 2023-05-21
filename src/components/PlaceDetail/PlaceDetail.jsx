import React from 'react'
import GoogleMapReact from 'google-map-react';
import './PlaceDetail.scss';




const PlaceDetail = ({setCoordinates,setBounds,coordinates,places}) => {
  return (
    <div className='MapPlace'>
    <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDl6WNEzIVSMzV2FdfZRAfh9NBqH1vcl2o" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        onChange={(e)=>{
        setCoordinates({lat: e.center.lat, lng: e.center.lng})
        setBounds({ne:e.marginBounds.ne,sw: e.marginBounds.sw})
        }}
        options={''}
        onChildClick={''}
      >
    

    {  places?.map((place, i) => (
       <div
       className="markerContainer"
    
       lat={Number(place.latitude)}
       lng={Number(place.longitude)}
       key={i}
     >
           <div  className="Paper">
                  <h5> {place.name}</h5>
                  <img src={place?.photo?.images?.large?.url } alt=" place.name"/>
                </div>
          </div>
        ))}


      </GoogleMapReact>
   </div>
  );
};

export default PlaceDetail;