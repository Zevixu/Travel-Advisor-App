import React from 'react';
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from './style';

const Place=({selected, ref_itself, place}) => {
    const style_class=useStyles();

    if(selected) ref_itself?.current?.scrollIntoView({behavior:'smooth',block:'start'});

    return (
        <Card elevation={6}>
            <CardMedia
                style={{height:350}}
                image={place.photo?place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5'>{place.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Typography>Price Level</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' my={2}>
                    <Rating name='read-only' value={Number(place.rating)} readOnly />
                    <Typography component='legend'>from {place.num_reviews} review{place.num_reviews>1 && 's'}</Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box display='flex' justifyContent='space-between' my={1} alignItems="center">
                        <image src={award.images.small} />
                        <Typography variant='subtitle2' color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map((label) => (
                    <Chip key={label.name} size='small' label={label.name} className={style_class.chip} />
                ))}
                <Box display='flex' justifyContent='flex-start' marginTop='10px'>
                    <LocationOnIcon />
                    <Typography variant='subtitle2' color="textSecondary">{place.address}</Typography>
                </Box>
                <Box display='flex' justifyContent='flex-start' marginTop='10px'>
                    <PhoneIcon />
                    <Typography variant='subtitle2' color="textSecondary">{place.phone}</Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size='small' color='primary' onClick={() => window.open(place.web_url,'_blank')} >
                    Reviews
                </Button>
                <Button size='small' color='primary' onClick={() => window.open(place.website,'_blank')} >
                    Website
                </Button>
            </CardActions>
        </Card>
    )
}

export default Place;