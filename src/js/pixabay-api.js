import axios from "axios";

export default function getImagesByQuery(query) {
    return axios.get("https://pixabay.com/api/", {
        params: {
            key: "53349109-bd5e9ac2d632572f7cfde5587",
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }
    })
        .then(response => response.data);
}