import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (username && password) {
            try {
                const response = await axios.post('http://192.168.224.83:5000/api/auth/login', {
                    email: username,
                    password: password,
                });

                console.log('Login Response:', response.data); // Response'i kontrol etmek için

                if (response.status === 200) {
                    navigation.navigate('Main', {
                        screen: 'HomeStack',
                        params: {
                            screen: 'HomeMain',
                            params: { username: username },
                        },
                    });
                } else {
                    Alert.alert('Hata', 'Giriş sırasında bir hata oluştu.');
                }
            } catch (error) {
                console.error('Giriş hatası:', error.response); // Hatanın detaylarını console'a yazdır

                if (error.response) {
                    // Serverdan gelen hata mesajını alınabilir
                    Alert.alert('Hata', error.response.data.message || 'Giriş sırasında bir hata oluştu.');
                } else if (error.request) {
                    // Request yapılamadı hatası
                    console.error('Request yapılamadı:', error.request);
                    Alert.alert('Hata', 'Sunucuya erişim sağlanamadı.');
                } else {
                    // Diğer hata durumları
                    console.error('Beklenmeyen hata:', error.message);
                    Alert.alert('Hata', 'Beklenmeyen bir hata oluştu.');
                }
            }
        } else {
            Alert.alert('Uyarı', 'Kullanıcı adı ve şifreyi giriniz.');
        }
    };

    const handleSignupNavigation = () => {
        navigation.navigate('Signup');
    };

    return (
        <ImageBackground
            source={require('../../assets/images/Login.png')}
            style={styles.container}
        >
            <View style={styles.formContainer}>
                <Text style={styles.label}>Mail</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Mail :"
                />
                <Text style={styles.label}>Şifre</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Şifre"
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Giriş Yap</Text>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <TouchableOpacity onPress={handleSignupNavigation} style={styles.button}>
                        <Text style={styles.buttonText}>Hesap Oluştur</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        backgroundColor: '#3d405b',
    },
    formContainer: {
        marginHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#fdf0d5',
    },
    input: {
        borderWidth: 1,
        borderColor: '#fdf0d5',
        padding: 5,
        marginBottom: 16,
        borderRadius: 4,
        color: '#fdf0d5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
    },
    space: {
        width: '4%',
    },
});

export default LoginScreen;
