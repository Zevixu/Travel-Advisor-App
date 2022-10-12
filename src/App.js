import {React, useEffect, useState} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header.js';
import List from './components/List/List.js';
import Map from './components/Map/Map.js';
import getPlaceData from './api/api';

const App = () => {
    const [places,setPlace]=useState([]);
    const [centercoor,setCenter]=useState({});
    const [boundcoor,setBound]=useState({});
    const [placeClick,setPlaceClick]=useState(null);
    const [loading,setLoading]=useState();
    const [type,setType]=useState('restaurants');
    const [rating,setRating]=useState(0);
    const [filterPlaces,setFilterPlaces]=useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) => {
            setCenter({lat:latitude,lng:longitude});
        })
    },[])

    useEffect(() => {
        const tmp=places.filter((place) => Number(place.rating)>rating);
        setFilterPlaces(tmp);
        setPlaceClick(null);
    }, [rating])

    useEffect(()=>{
        setLoading(true);
        getPlaceData(type,boundcoor.sw,boundcoor.ne).then((data)=>{
            console.log(data);  //print out the response data
            setPlace(data);
            setPlaceClick(null);
            setLoading(false);
            setFilterPlaces([]);
            setRating(0);
        });
    },[type,boundcoor])  //[] -- dependence array

    return (
        <>
            <CssBaseline />
            <Header setCenter={setCenter} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List 
                        type={type} 
                        setType={setType} 
                        loading={loading} 
                        placeClick={placeClick} 
                        places={filterPlaces.length ? filterPlaces:places} 
                        rating={rating}
                        setRating={setRating} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setPlaceClick={setPlaceClick} 
                        places={filterPlaces.length ? filterPlaces:places} 
                        centercoor={centercoor} 
                        setCenter={setCenter} 
                        setBound={setBound}/>
                </Grid>
            </Grid>
        </>
    );
}

export default App;