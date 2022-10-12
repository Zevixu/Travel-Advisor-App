import axios from 'axios';

const getPlaceData = async (type, sw, ne) => {
    try {
        const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': 'b710f4a96dmsh148ce80f0b7c43ep1c38e5jsna85ea015f097',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });

        return data;

    } catch (error) {
        console.log(error);
    }
}

export default getPlaceData;