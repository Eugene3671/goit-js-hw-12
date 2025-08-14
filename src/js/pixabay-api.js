import axios from "axios";

export function getImagesByQuery(query) {
   return axios.get('https://pixabay.com/api/', {
        params: {
            key: '25786434-348adb767e319176b4ad356ea',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true
        }
    })
       .then(response => {
           const hits = response.data.hits;
           if (hits.length === 0) {
               return Promise.reject();
           }
           return hits;
       })
        .catch(error =>  Promise.reject(error));
}