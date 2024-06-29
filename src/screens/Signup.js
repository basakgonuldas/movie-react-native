import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignup = async () => {
        if (username && email && password) {
            try {
                const response = await axios.post('http://192.168.224.83:5000/api/auth/signup', {
                    username: username,
                    email: email,
                    password: password,
                });

                console.log('Signup Response:', response.data); // Response'i kontrol etmek için

                if (response.status === 200) {
                    navigation.navigate('Login');
                } else {
                    Alert.alert('Hata', 'Kayıt sırasında bir hata oluştu.');
                }
            } catch (error) {
                console.error('Kayıt hatası:', error.response); // Hatanın detaylarını console'a yazdır

                if (error.response) {
                    // Serverdan gelen hata mesajını alınabilir
                    Alert.alert('Hata', error.response.data.message || 'Kayıt sırasında bir hata oluştu.');
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
            Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/Login.png')}
            style={styles.container}
        >
            <View style={styles.formContainer}>
                <Text style={styles.label}>Kullanıcı Adı</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Kullanıcı Adı"
                />
                <Text style={styles.label}>E-posta</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-posta"
                />
                <Text style={styles.label}>Şifre</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Şifre"
                    secureTextEntry
                />
                <Button title="Hesap Oluştur" onPress={handleSignup} color="#000000" />
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
});

export default SignupScreen;