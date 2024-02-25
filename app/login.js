// Modules
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    Pressable,
    KeyboardAvoidingView, 
    ScrollView
} from 'react-native';

// Firebase
import { signInWithEmailAndPassword, auth } from '../services/firebase';

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const submit = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => { router.replace('/') })
            .catch(error => {

                const errorMessage = error.message;
                const code = error.code;

                setError(errorMessage);
            });
    };

    return (

        <KeyboardAvoidingView style={styles.avoidingView}>

            <ScrollView keyboardShouldPersistTaps='handled'>

                <View style={styles.container}>

                    <Text style={styles.text}>Login</Text>
                    <StatusBar style="auto" />

                    <View style={styles.inputContainer}>

                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Enter Email"
                            placeholderTextColor="#d3d3d3"
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Enter Password"
                            placeholderTextColor="#d3d3d3"
                        />

                        <Pressable
                            onPress={submit}
                            style={styles.submit}
                        >
                            <Text style={styles.submitText}>Submit</Text>
                        </Pressable>
                        
                        {error && <Text style={styles.error}>{ error }</Text> }

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login;

const styles = StyleSheet.create({

    avoidingView: {
        height: '100%',
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        paddingTop: 130
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
        color: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    error: {
        fontSize: 20,
        color: '#F09',
        marginTop: 50,
    }
});