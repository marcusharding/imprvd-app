// Firebase
import { auth, sendEmailVerification } from '../services/firebase';

// Modules
import React, { useState, useRef, useEffect } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Pressable, AppState } from 'react-native';


const verifyEmail = () => {

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const resendVerification = () => { sendEmailVerification(auth.currentUser); }

    useEffect(() => {

        const subscription = AppState.addEventListener('change', nextAppState => {
      
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        });
      
        return () => { subscription.remove(); };
    }), [];

    useEffect(() => { 

        auth.currentUser.reload();

        setTimeout(() => { if ( auth.currentUser.emailVerified ) router.replace('/home'); }, 1000);
    
    }, [appStateVisible]);

    return (

        <View style={styles.container}>

            <Text style={styles.heading}>Check your email!</Text>
            <Text style={styles.subHeading}>To confirm your email address, tap the button in the email we sent to { auth.currentUser.email }</Text>

            <View style={styles.inputContainer}>

                <Pressable
                    onPress={resendVerification}
                    style={styles.submit}
                >
                    <Text style={styles.submitText}>Resend verification email</Text>
                </Pressable>

            </View>

        </View>
    )
}

export default verifyEmail;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: 300
    },
    inputContainer: {
        width: '90%',
        flex: 1,
    },
    heading: {
        color: '#FFF',
        fontSize: 25,
        marginBottom: 30
    },
    subHeading: {
        color: '#D3D3D3',
        fontSize: 16,
        maxWidth: 320,
        textAlign: 'center'
    },
    submit: {
        width: '100%',
        marginTop: 30,
        height: 50,
        backgroundColor: '#F09',
        borderRadius: 5,
        color: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 20,
    }
})