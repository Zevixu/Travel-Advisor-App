import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style';

const Header = ({setCenter}) => {
    const style_class = useStyles();
    const [placeSearch,setPlaceSearch]=useState(null);
    const onLoad= (value) => setPlaceSearch(value);
    const onPlaceChanged= () => {
        const lat=placeSearch.getPlace().geometry.location.lat();
        const lng=placeSearch.getPlace().geometry.location.lng();
        setCenter({lat:lat,lng:lng});
    }

    return (
        <AppBar position='static'>
            <Toolbar className={style_class.toolbar}>
                <Typography variant='h5' className={style_class.title}>
                    Travel Advisor
                </Typography>
                <Box display='flex'>
                    <Typography variant='h6' className={style_class.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={style_class.search}>
                            <div className={style_class.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='search a place..' classes={{ root: style_class.inputRoot, input: style_class.inputInput }} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header; 