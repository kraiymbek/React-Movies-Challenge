import axios from "axios"



export const getMoviesLists = () => {
        const url = 'http://localhost:8080/moviesList';
        return axios.get(url);
};

export const createMoviesList = (body) => {
    const url = `http://localhost:8080/moviesList/create`;
    return axios.post(url, body);
};

export const updateMoviesList = (id, body) => {
    const url = `http://localhost:8080/moviesList/${id}/edit`;
    return axios.post(url, body);
};


export const deleteMoviesListById = (id) => {
    const url = `http://localhost:8080/moviesList/${id}/delete`;
    return axios.delete(url);
};
