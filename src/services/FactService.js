import axios from 'axios'

const BASE_URL = 'http://localhost:5000';

export function getFacts() {
    return axios.get(`${BASE_URL}/api/fact/list`)
        .then(response => response.data);
}

export function createFact(data) {
    return axios.post(`${BASE_URL}/api/fact/create`, {
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
    return axios.post(`${BASE_URL}/api/fact/update/${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message));
}

export function deleteFact(id){
    return axios.delete(`${BASE_URL}/api/fact/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message));
}