// MODULES
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    Pressable, 
    KeyboardAvoidingView, 
    ScrollView
} from 'react-native';

// FIREBASE
import { 
    createUserWithEmailAndPassword,
    auth, 
    updateProfile, 
    provider,
    signInWithPopup,
    GoogleAuthProvider,
    sendEmailVerification
} from '../services/firebase';

// ASSETS 
import GoogleIcon from '../assets/images/svg/GoogleIcon.js';

// Utils
import { validEmail } from '../assets/js/utils';

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = () => {

        if ( name && email && password ) {

            if ( validEmail(email) ) {

                createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
    
                    updateProfile(auth.currentUser, { displayName: name })
                        .then(() => {
    
                            sendEmailVerification(auth.currentUser)
                                .then(() => {
                                    
                                    router.replace('/verifyEmail');
                                });
    
                        })
                        .catch(error => {
            
                            const errorMessage = error.message;
                            const code = error.code;
            
                            setError(errorMessage);
                        });
                })
                .catch(error => {
    
                    const errorMessage = error.message;
                    const code = error.code;
    
                    setError(errorMessage);
                });
    
            } else setError('Please enter a valid email address');

        } else setError('Please enter information for all three fields');
    };

    // TO DO - Why is this giving an error?

    const googleSignIn = () => {

        signInWithPopup(auth, provider)
            .then(result => {

                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                router.replace('/home');

            }).catch(error => {

                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

                const errorMessage = error.message;
                const code = error.code;

                setError(errorMessage);
            });
    }

    return (

        <KeyboardAvoidingView style={styles.avoidingView}>

            <ScrollView keyboardShouldPersistTaps='handled'>

                <View style={styles.container}>

                    <Text style={styles.text}>Sign up</Text>
                    <StatusBar style="auto" />

                    <View style={styles.inputContainer}>

                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                            placeholder="Full Name"
                            placeholderTextColor="#d3d3d3"
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email"
                            placeholderTextColor="#d3d3d3" 
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Password"
                            placeholderTextColor="#d3d3d3" 
                        />

                        <Pressable
                            onPress={submit}
                            style={styles.submit}
                        >
                            <Text style={styles.submitText}>Submit</Text>
                        </Pressable>

                        <Pressable
                            onPress={googleSignIn}
                            style={styles.google}
                        >
                            <GoogleIcon width={30} height={30} style={styles.googleIcon} />
                            <Text style={styles.googleText}>Sign in with Google</Text>
                        </Pressable>

                        <Link 
                            href="/login" 
                            style={styles.link}
                        >
                            Already have an account? Login here.
                        </Link>

                        {error && <Text style={styles.error}>{ error }</Text> }

                    </View> 
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Signup;

const styles = StyleSheet.create({

    avoidingView: {
        height: '100%',
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        paddingTop: 130,
    },
    inputContainer: {
        height: '100%',
        width: '90%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        margin: 12,
        width: '100%',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        borderColor: '#fff',
        color: '#fff'
    },
    submit: {
        width: '100%',
        marginTop: 30,
        height: 50,
        backgroundColor: '#F09',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    google: {
        width: '100%',
        marginTop: 30,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    googleText: {
        color: '#757575',
        textTransform: 'uppercase',
        fontSize: 20
    },
    googleIcon: {
        marginRight: 10
    },
    link: {
        color: '#F09',
        marginTop: 50,
        fontSize: 20,
    },
    error: {
        fontSize: 20,
        color: '#F09',
        marginTop: 50,
    }
});