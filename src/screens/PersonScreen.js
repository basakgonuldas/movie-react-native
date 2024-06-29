import React, { useState } from 'react';
import { View, TextInput, ImageBackground, StyleSheet, Image, } from 'react-native';

const PersonScreen = () => {
    const [username, setUsername] = useState('basak');
    const [email, setEmail] = useState('basak123');
    const [password, setPassword] = useState('123');
    const [photoUrl] = useState(require("../../assets/images/profile.png"));

    // Kayıt işlemi için işlev
    const register = () => {
        // Burada kayıt işlemleri yapılabilir. Örneğin bir API'ye kayıt bilgilerini göndermek.
        console.log('Kullanıcı adı:', username);
        console.log('E-posta:', email);
        console.log('Şifre:', password);
        console.log('Fotoğraf URL:', photoUrl);
    };

    return (
        <ImageBackground source={require("../../assets/images/Login.png")} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={styles.photoContainer}>
                        <Image
                            source={photoUrl}
                            style={styles.photo}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Kullanıcı Adı"
                        onChangeText={text => setUsername(text)}
                        value={username}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-posta"
                        onChangeText={text => setEmail(text)}
                        value={email}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Şifre"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                    />

                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    formContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opak siyah arka plan
        borderRadius: 10,
        alignItems: 'center',

    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative', // Konumlandırma ayarı
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50, // Daire şeklinde göstermek için kenar yarıçapını kullanın
        position: 'absolute', // Konumlandırma ayarı
        top: -50, // Yukarıda hizalama
        zIndex: 1, // Ön sıralama ayarı
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#ffffff', // Metin rengi
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50, // Daire şeklinde göstermek için kenar yarıçapını kullanın
    },
});

export default PersonScreen;
