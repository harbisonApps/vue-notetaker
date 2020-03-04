import axios from 'axios'

const BASE_URL = 'http://localhost:5000';

export function getFacts() {
    return axios.get(`${BASE_URL}/fact/list`)
        .then(response => response.data);
}

export function factCreate(data) {
    return axios.post(`${BASE_URL}/fact/create`, {
        name: data.name,
        category: data.category,
        description: data.description,
        fullText: data.fullText,
        imageUrl: data.imageUrl,
        slug: data.slug
    }).then(response => {
        return response.data
    }).catch(err => Promise.reject(err.message));
}

export function updateFact(data, id) {
    return axios.post(`${BASE_URL}/fact/update/${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message));
}

export function deleteFact(id){
    return axios.post(`${BASE_URL}/fact/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message));
}

// export function deleteNote(id) {
//     return axios.post(`${BASE_URL}/api/note/delete/${id}`)
//         .then(response => response.data)
//         .catch(err => Promise.reject(err.message));
// }