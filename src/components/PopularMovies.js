import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeartIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../../utils/moviesapi"; // image500 fonksiyonu buradan alınacak

const windowWidth = Dimensions.get("window").width;

const PopularMovies = () => {
    const navigation = useNavigation();
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=fc1a8630f36eedfcb498ca12c7a8a3f9"
        )
            .then((response) => response.json())
            .then((data) => {
                setPopularMovies(data.results);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching popular movies");
                setLoading(false);
            });
    }, []);

    const handleSaveMovie = async (movie) => {
        try {
            const existingMovie = savedMovies.find(
                (savedMovie) => savedMovie.id === movie.id
            );
            if (!existingMovie) {
                const newSavedMovies = [...savedMovies, movie];
                await AsyncStorage.setItem(
                    "savedMovies",
                    JSON.stringify(newSavedMovies)
                );
                setSavedMovies(newSavedMovies);
                console.log("Movie saved successfully!");
                navigation.navigate("Saved"); // SavedScreen'e yönlendirme
            } else {
                console.log("Movie already saved.");
            }
        } catch (error) {
            console.error("Error saving movie:", error);
        }
    };

    const handleMoviePress = (movie) => {
        // Navigasyonu kullanarak "Movie" ekranına yönlendirme
        navigation.navigate("Movie", { movie });
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
            <Text style={styles.heading}>Popular Movies</Text>
            <ScrollView
                horizontal
                contentContainerStyle={styles.scrollViewContent}
            >
                {popularMovies.map((movie) => (
                    <View key={movie.id} style={styles.movieItemContainer}>
                        <TouchableOpacity
                            onPress={() => handleMoviePress(movie)}
                        >
                            <View style={styles.movieItem}>
                                <Image
                                    source={{
                                        uri: image500(movie.poster_path),
                                    }}
                                    style={styles.movieImage}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.heartIconContainer}
                            onPress={() => handleSaveMovie(movie)}
                        >
                            <HeartIcon size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
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
        fontWeight: "bold",
        color: "white",
        marginBottom: 8,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    scrollViewContent: {
        paddingVertical: 16,
    },
    movieItemContainer: {
        marginRight: 16,
        position: "relative",
    },
    movieItem: {
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        paddingBottom: 16,
    },
    movieImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    heartIconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 15,
        padding: 5,
    },
});

export default PopularMovies;
