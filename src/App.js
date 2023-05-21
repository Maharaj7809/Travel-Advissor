import './App.css';
import axios from 'axios';
import {  BrowserRouter as Router,Route } from "react-router-dom";
import Header from './components/Header/Header';
import List from './components/List/List';
import PlaceDetail from './components/PlaceDetail/PlaceDetail';
import React, { useState, useEffect } from 'react';


function App() {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
 
 const[places,setPlaces]=useState([]);
 const [filteredPlaces, setFilteredPlaces] = useState([]);
 const [coordinates, setCoordinates] = useState({});
 const [bounds, setBounds] = useState({});

 useEffect(() => {
  navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    setCoordinates({ lat: latitude, lng: longitude });
   
  });
}, []);

useEffect(() => {
  const filtered = places?.filter((place) => Number(place.rating) > rating);

  setFilteredPlaces(filtered);
}, [rating]);


  useEffect(() => {
      getPlacesData(type,bounds.sw, bounds.ne).then((data) => {
           setPlaces(data); 
           setFilteredPlaces([]);

        });
    
  }, [type,coordinates,bounds]);

  
  return (
    <Router>
     <Header/>

    <div className='Listmap'> 
      <List
      places={filteredPlaces.length ? filteredPlaces : places}
           type={type}
        setType={setType}
          rating={rating}
         setRating={setRating}
      
      />
      <PlaceDetail
      setCoordinates={setCoordinates}
      setBounds={setBounds}
      coordinates={coordinates}
      places={filteredPlaces.length ? filteredPlaces : places}
      />
    </div>
      </Router>

  );
  
}

export default App;



const getPlacesData = async (type,sw,ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': '87369e2fe8msh6fc7f4126b22623p1a2cbfjsn9dddc50c3e28',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
            return data;
  }catch (error) {
    console.log(error);
  }
};

