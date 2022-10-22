import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlineIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './style';

const Map=({setPlaceClick, places,centercoor, setCenter, setBound}) => {
    const style_class=useStyles();
    const isDesk=useMediaQuery('(min-width:600px)'); //return false if the viewport is smaller than 600px
    const coords={lat:0,lng:0};
    const google_map_api_key='AIzaSyA0xcG9udaDiVDsfu20hGYWoV2iZmEI-w8'; //your access key to the google map api

    return (
        <div className={style_class.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:google_map_api_key}}
                defaultCenter={coords}
                center={centercoor}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e)=>{   //we can use console.log to print out the attributes of e
                    setCenter({lat:e.center.lat, lng:e.center.lng});
                    setBound({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
                }}
                onChildClick={(child) => setPlaceClick(child)}
            >
                {places?.map((place,index) => {
                    return (
                        place.name &&  ////only render those places with a name
                            <div className={style_class.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={index}>
                                {
                                    !isDesk ? (
                                        <LocationOnOutlineIcon color='primary' fontSize='large' />
                                    ):(
                                        <Paper elevation={3} className={style_class.paper}>
                                            <Typography className={style_class.typography} variant='subtitle2' gutterBottom>{place.name}</Typography>
                                            <img 
                                                src={place.photo?place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                                alt={place.name}
                                                className={style_class.pointer}
                                            />
                                            <Rating size='small' value={Number(place.rating)} readOnly />
                                        </Paper>
                                    )
                                } 
                            </div>
                    )
                })}
            </GoogleMapReact>
        </div>
    )
}

export default Map;