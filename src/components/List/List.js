import {React, useEffect, createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
import useStyles from './style';
import { useState } from 'react';
import PlaceInfo from '../Place/Place';

const List=({rating, setRating, type, setType, loading, placeClick, places}) => {
    const style_class=useStyles();
    const [refPlaces,setRefPlaces]=useState([]);

    useEffect(() => {
        const refs=Array(places?.length).fill().map((_,i) => createRef())
        setRefPlaces(refs);
    }, [places])

    return (
        <div className={style_class.container}>
            <Typography variant='h4'>Places recommended for you</Typography>
            <FormControl className={style_class.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=>{setType(e.target.value)}}>
                    <MenuItem value='restaurants'>Restaurants</MenuItem>
                    <MenuItem value='hotels'>Hotels</MenuItem>
                    <MenuItem value='attractions'>Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={style_class.formControl}>
                <InputLabel>Rate</InputLabel>
                <Select value={rating} onChange={(e)=>{setRating(e.target.value)}}>
                    <MenuItem value='0'>ALL</MenuItem>
                    <MenuItem value='3'>Above 3</MenuItem>
                    <MenuItem value='4'>Above 4</MenuItem>
                    <MenuItem value='4.5'>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            {loading ? (
                <div className={style_class.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ): (
            <>
                <Grid container spacing={3} className={style_class.list}>
                    {places?.map((place,index)=>{
                        return (place.name &&     //only render those places with a name
                            <Grid ref={refPlaces[index]} item xs='12'>
                                <PlaceInfo selected={index === Number(placeClick)} ref_itself={refPlaces[index]} place={place}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </>
            )
            }

        </div>
    )
}

export default List;