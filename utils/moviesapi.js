import { movieapikey } from "./apikey";
import axios from "axios";

// Endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${movieapikey}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${movieapikey}`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${movieapikey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/toprated?api_key=${movieapikey}`;
const genresEndpoint = `${apiBaseUrl}/genre/movie/list?api_key=${movieapikey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${movieapikey}`;

// Movie Details Endpoint
const movieDetailsEndpoint = (id) =>
    `${apiBaseUrl}/keyword/${id}?api_key=${movieapikey}`;

const movieCreditsEndpoint = (id) =>
    `${apiBaseUrl}/keyword/${id}/credits?api_key=${movieapikey}`;

const similarMoviesEndpoint = (id) =>
    `${apiBaseUrl}/keyword/${id}/similar?api_key=${movieapikey}`;

// Cast Api call to get cast of movie
const personDetailsEndpoint = (id) =>
    `${apiBaseUrl}/person/${id}?api_key=${movieapikey}`;

const personMovieEndpoint = (id) =>
    `${apiBaseUrl}/person/${id}/movie_credits?api_key=${movieapikey}`;

// API çağrısını gerçekleştiren fonksiyon
export const movieApiCall = async (endpoint) => {
    try {
        const response = await fetch(endpoint);
        console.log('API Call Response:', response); // API çağrısı yanıtını kontrol etmek için
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Call Data:', data); // Dönen veriyi kontrol etmek için
        return data;
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
};

// Fonksiyonlar farklı boyutlarda ve genişlikte görüntüler almak için
export const image500 = (posterpath) =>
    posterpath ? "https://image.tmdb.org/t/p/w500" + posterpath : null;

// Ana ekran için API'ler
export const fetchTrendingMovie = () => {
    return movieApiCall(trendingMoviesEndpoint);
};

export const fetchPopularMovie = () => {
    return movieApiCall(popularMoviesEndpoint);
};

export const fetchUpComingMovie = async () => {
    try {
        const response = await fetch(upComingMoviesEndpoint); // Upcoming movies endpoint'i kullanılıyor
        const data = await response.json();
        console.log('Upcoming Movies API Response:', data); // API yanıtını konsola logla
        return data;
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        throw error;
    }
};

export const fetchTopRatedMovie = () => {
    return movieApiCall(topRatedMoviesEndpoint);

};

export const fetchGenres = () => {
    return movieApiCall(genresEndpoint);
};

export const fetchMovieDetails = (id) => {
    return movieApiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (keywordId) => {
    return movieApiCall(movieCreditsEndpoint(movieId));
};

export const fetchSimilarMovies = (keywordId) => {
    return movieApiCall(similarMoviesEndpoint(movieId));
};

export const searchMovies = (params) => {
    const url = `${searchMoviesEndpoint}&query=${params.query}`;
    return movieApiCall(url);
};

// Oyuncu detaylarını getiren fonksiyonlar
export const fetchPersonDetails = (id) => {
    return movieApiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
    return movieApiCall(personMovieEndpoint(id));
};
