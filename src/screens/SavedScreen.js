import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Modal,
    StyleSheet,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { image500 } from "../../utils/moviesapi";

const { width, height } = Dimensions.get("window");

export default function SavedScreen() {
    const navigation = useNavigation();
    const [savedMovies, setSavedMovies] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);

    useFocusEffect(
        useCallback(() => {
            // Load saved movies from AsyncStorage when the screen gains focus
            const loadSavedMovies = async () => {
                try {
                    const savedMovies = await AsyncStorage.getItem("savedMovies");
                    const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
                    setSavedMovies(savedMoviesArray);
                    console.log("Pulled saved movies from AsyncStorage");
                } catch (error) {
                    console.log(error);
                }
            };
            loadSavedMovies();
        }, [navigation])
    );

    const confirmDeleteMovie = (movie) => {
        setMovieToDelete(movie);
        setModalVisible(true);
    };

    const deleteMovie = async () => {
        if (movieToDelete) {
            try {
                const newSavedMovies = savedMovies.filter(m => m.id !== movieToDelete.id);
                await AsyncStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
                setSavedMovies(newSavedMovies);
                console.log("Deleted movie from saved list");
            } catch (error) {
                console.log("Error deleting movie", error);
            } finally {
                setModalVisible(false);
                setMovieToDelete(null);
            }
        }
    };

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require("../../assets/images/Login.png")}
                    style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                    }}
                    resizeMode="cover"
                >
                    <View style={{ marginTop: 48, padding: 16 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>
                                Saved Movies
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                            {savedMovies.map((movie, index) => (
                                <View style={{ marginTop: 16 }} key={index}>
                                    <TouchableOpacity
                                        onPress={() => navigation.push("Movie", { movie })}
                                        onLongPress={() => confirmDeleteMovie(movie)}
                                    >
                                        <Image
                                            source={{
                                                uri: movie && movie.poster_path ? image500(movie.poster_path) : 'https://via.placeholder.com/150'
                                            }}
                                            style={{
                                                width: width * 0.41,
                                                height: height * 0.25,
                                                borderRadius: 15
                                            }}
                                        />
                                        <Text style={{ color: "#D1D5DB", fontWeight: "bold", fontSize: 18, marginLeft: 4 }}>
                                            {movie && movie.title ? (movie.title.length > 15 ? `${movie.title.slice(0, 15)}...` : movie.title) : 'No Title'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Are you sure you want to delete this movie?</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonDelete]}
                                        onPress={deleteMovie}
                                    >
                                        <Text style={styles.textStyle}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </ImageBackground>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 15,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    buttonDelete: {
        backgroundColor: "#FF0000",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
    },
});
