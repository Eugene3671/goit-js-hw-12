import axios from "axios";

export async function getImagesByQuery(query, page) {
    const res = await axios.get('https://pixabay.com/api/', {
        params: {
            key: '25786434-348adb767e319176b4ad356ea',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 15,
            page: page,
        }
    });
    return res.data;
}