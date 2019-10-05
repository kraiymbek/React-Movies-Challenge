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

export const getImdbList = (params) => {
    const url = `http://localhost:8080/imdb/list`;
    return axios.get(url, {params});
};


export const deleteMoviesListById = (id) => {
    const url = `http://localhost:8080/moviesList/${id}/delete`;
    return axios.delete(url);
};

export const addMovie = (body) => {
    const url = `http://localhost:8080/movie/add`;
    return axios.post(url, body);
};

export const deleteMovie = (id) => {
    const url = `http://localhost:8080/movie/${id}/delete`;
    return axios.delete(url);
};

export const getMoviesByIds = (body) => {
    const url = `http://localhost:8080/movie/list`;
    return axios.post(url, body);
};

export const updateMovieById = (id, body) => {
    const url = `http://localhost:8080/movie/${id}/edit`;
    return axios.post(url, body);
};
