import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeartIcon } from 'react-native-heroicons/outline';

const windowWidth = Dimensions.get('window').width;

const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=fc1a8630f36eedfcb498ca12c7a8a3f9')
            .then(response => response.json())
            .then(data => {
                console.log('API Call Response:', data);
                setTrendingMovies(data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching trending movies:', error);
                setError('Error fetching trending movies');
                setLoading(false);
            });

        // Load saved movies from AsyncStorage when the component mounts
        const loadSavedMovies = async () => {
            try {
                const savedMovies = await AsyncStorage.getItem('savedMovies');
                const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
                setSavedMovies(savedMoviesArray);
            } catch (error) {
                console.error("Error loading saved movies from AsyncStorage:", error);
            }
        };

        loadSavedMovies();
    }, []);

    const handleMoviePress = (movie) => {
        if (selectedMovie === movie) {
            setSelectedMovie(null);
        } else {
            setSelectedMovie(movie);
        }
    };

    const handleSaveMovie = async (movie) => {
        try {
            const existingMovie = savedMovies.find(savedMovie => savedMovie.id === movie.id);
            if (!existingMovie) {
                const newSavedMovies = [...savedMovies, movie];
                await AsyncStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
                setSavedMovies(newSavedMovies);
                console.log("Movie saved successfully!");
            } else {
                console.log("Movie already saved.");
            }
        } catch (error) {
            console.error("Error saving movie:", error);
        }
    };

    const handleCloseDetails = () => {
        setSelectedMovie(null);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Trending Movies</Text>
            <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
                {trendingMovies.length === 0 ? (
                    <Text>No trending movies available.</Text>
                ) : (
                    trendingMovies.map(movie => (
                        <View key={movie.id} style={styles.movieItemContainer}>
                            <TouchableOpacity onPress={() => handleMoviePress(movie)}>
                                <View style={styles.movieItem}>
                                    <Image
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                        style={styles.movieImage}
                                    />
                                    {selectedMovie === movie && (
                                        <View style={styles.selectedMovieDetails}>
                                            <Text style={styles.movieDate}>{movie.release_date}</Text>
                                            <Text style={styles.movieOverview}>{movie.overview}</Text>
                                            <TouchableOpacity onPress={handleCloseDetails} style={styles.closeButton}>
                                                <Text style={styles.closeButtonText}>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.heartIconContainer}
                                onPress={() => handleSaveMovie(movie)}
                            >
                                <HeartIcon size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    scrollViewContent: {
        paddingVertical: 16,
    },
    movieItemContainer: {
        marginRight: 16,
        position: 'relative',
    },
    movieItem: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingBottom: 16,
    },
    movieImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    selectedMovieDetails: {
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        padding: 16,
        marginTop: 8,
        borderRadius: 8,
        width: windowWidth - 32,
    },
    movieDate: {
        fontSize: 14,
        color: 'lightgrey',
    },
    movieOverview: {
        fontSize: 14,
        marginTop: 8,
        color: 'white',
    },
    heartIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 5,
    },
    closeButton: {
        marginTop: 8,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        color: 'red',
        fontSize: 14,
    },
});

export default TrendingMovies;
