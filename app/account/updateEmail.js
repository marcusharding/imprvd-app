// MODULES
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

// FIREBASE
import { auth, verifyBeforeUpdateEmail } from '../../services/firebase';

// COMPONENTS
import BackButton from '../ui/backButton';

const UpdateEmail = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [displayMessage, setDisplayMessage] = useState(false);

    const submit = () => {

        verifyBeforeUpdateEmail(auth.currentUser, email)
        .then(() => {

            setDisplayMessage(true);
            
        }).catch(error => {
        
            const errorMessage = error.message;
            const code = error.code;
                   
            setError(errorMessage);
        });
    }

    return (

        <View style={styles.container}>

            <BackButton href="/account/account" />

            <Text style={styles.text}>Update Email</Text>

            <View style={styles.inputContainer}>

                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="New email"
                    placeholderTextColor="#d3d3d3"
                />

                <Pressable
                    onPress={submit}
                    style={styles.submit}
                >
                    <Text style={styles.submitText}>Submit</Text>
                </Pressable>

                {error ? <Text style={styles.error}>{ error }</Text> : null }

                {displayMessage ? <Text style={styles.error}>
                    A new verification email has been sent to your new email address, upon verification your account will be updated to the new address.
                </Text> : null }

            </View>
        </View>
    )
}

export default UpdateEmail;

const styles = StyleSheet.create({

    container: {
        flex: 1,
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