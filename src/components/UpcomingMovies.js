import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const UpcomingMovies = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=fc1a8630f36eedfcb498ca12c7a8a3f9')
            .then(response => response.json())
            .then(data => {
                console.log('API Call Response:', data);
                setUpcomingMovies(data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching upcoming movies:', error);
                setError('Error fetching upcoming movies');
                setLoading(false);
            });
    }, []);

    const handleMoviePress = (movie) => {
        if (selectedMovie === movie) {
            setSelectedMovie(null);
        } else {
            setSelectedMovie(movie);
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
            <Text style={styles.heading}>Upcoming Movies</Text>
            <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
                {upcomingMovies.length === 0 ? (
                    <Text>No upcoming movies available.</Text>
                ) : (
                    upcomingMovies.map(movie => (
                        <TouchableOpacity key={movie.id} onPress={() => handleMoviePress(movie)}>
                            <View style={styles.movieItem}>
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                    style={styles.movieImage}
                                />
                                {selectedMovie === movie && (
                                    <View style={styles.selectedMovieDetails}>
                                        <Text style={styles.movieDate}>{movie.release_date}</Text>
                                        <Text style={styles.movieOverview}>{movie.overview}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

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
    movieItem: {
        marginRight: 16,
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
});

export default UpcomingMovies;
