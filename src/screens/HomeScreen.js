import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { BellIcon, MagnifyingGlassCircleIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import { useQuery } from '@tanstack/react-query';
import TrendingMovies from '../components/TrendingMovies';
import PopularMovies from '../components/PopularMovies';
import UpcomingMovies from '../components/UpcomingMovies';
import TopRatedMovies from '../components/TopRatedMovies';
import Loading from '../components/Loading';
import { fetchTrendingMovie, fetchPopularMovie, fetchUpComingMovie, fetchTopRatedMovie } from '../../utils/moviesapi';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const { isLoading: isTrendingLoading } = useQuery({
        queryKey: ["trendingMovies"],
        queryFn: fetchTrendingMovie,
        onSuccess: (data) => {
            setTrendingMovies(data.results || []);
        },
        onError: (error) => {
            console.error("Error fetching trending Movies:", error);
        },
    });

    const { isLoading: isPopularLoading } = useQuery({
        queryKey: ["popularMovies"],
        queryFn: fetchPopularMovie,
        onSuccess: (data) => {
            setPopularMovies(data.results || []);
        },
        onError: (error) => {
            console.error("Error fetching popular Movies:", error);
        },
    });

    const { isLoading: isUpcomingLoading } = useQuery({
        queryKey: ["upcomingMovies"],
        queryFn: fetchUpComingMovie,
        onSuccess: (data) => {
            setUpcomingMovies(data.results || []);
        },
        onError: (error) => {
            console.error("Error fetching upcoming Movies:", error);
        },
    });

    const { isLoading: isTopRatedLoading } = useQuery({
        queryKey: ["topRatedMovies"],
        queryFn: fetchTopRatedMovie,
        onSuccess: (data) => {
            setTopRatedMovies(data.results || []);
        },
        onError: (error) => {
            console.error("Error fetching top rated Movies:", error);
        },
    });

    const handleSearchPress = () => {
        navigation.navigate("Search", {
            trendingMovies,
            popularMovies,
            upcomingMovies,
            topRatedMovies
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/Login.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <StatusBar style="light" />
                <View style={styles.header}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={require("../../assets/images/profile.png")}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.iconContainer}>
                        <BellIcon size={30} strokeWidth={2} color="white" />
                        <TouchableOpacity onPress={handleSearchPress}>
                            <MagnifyingGlassCircleIcon size={30} strokeWidth={2} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                {(isTrendingLoading || isPopularLoading || isUpcomingLoading || isTopRatedLoading) ? (
                    <Loading />
                ) : (
                    <>
                        <TrendingMovies data={trendingMovies} />
                        <PopularMovies data={popularMovies} />
                        <UpcomingMovies data={upcomingMovies} title="Upcoming Movies" />
                        <TopRatedMovies data={topRatedMovies} title="Top Rated Movies" />
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImageContainer: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 9999,
        overflow: 'hidden',
    },
    profileImage: {
        width: 45,
        height: 45,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 70,
    },
});
