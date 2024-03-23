// MODULES
import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Link, router } from 'expo-router';

// FIREBASE
import { auth, deleteUser } from '../../services/firebase';

// COMPONENTS
import BackButton from '../ui/backButton';

const ManageAccount = () => {

    const updateProfile = [
        {
            label: 'Display Name',
            route: '/account/updateName'
        },
        {
            label: 'Email',
            route: '/account/updateEmail'
        },
        {
            label: 'Password',
            route: '/account/updatePassword'
        }
    ]

    const [error, setError] = useState('');

    const deleteAccount = () => {

        deleteUser(auth.currentUser)
        .then(() => {

            router.replace('/');

        }).catch(error => {
        
            const errorMessage = error.message;
            const code = error.code;
                   
            setError(errorMessage);
        });
    };

    return (

        <View style={styles.container}>

            <BackButton href="/account/account" />

            <Text style={styles.heading}>Manage your account</Text>
            <Text style={styles.subHeading}>Here you can review and manage your account details.</Text>

            {/* // TO DO - CAN THE BORDERED SECTIONS BE BROKEN INTO A COMPOSABLE WITH A SLOT THEN PASS THE CONTENT */}

            <View style={[styles.section, styles.firstSection]}>

                <Text style={styles.account}>Update user profile</Text>

                {updateProfile.map((link, index) => (

                    <Link
                        href={link.route}
                        style={styles.link}
                        key={index}
                    >
                        <Text style={[styles.manageAccount, styles.marginBottom20]}>{ link.label }</Text>
                    </Link>
                ))}

                <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, marginTop: 30}}/>

            </View>

            <View>

                <Pressable
                    onPress={deleteAccount}
                    style={styles.delete}
                >
                    <Text style={styles.deleteText}>Delete account</Text>
                </Pressable>

            </View>

            {error && <Text style={styles.error}>{ error }</Text> }

        </View>
    )
}

export default ManageAccount;

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#212553',
        alignItems: 'center',
        paddingTop: 150
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
    section: {
        marginBottom: 50,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    firstSection: {
        marginTop: 50
    },
    account: {
        color: '#FFF',
        marginBottom: 30
    },
    manageAccount: {
        color: '#FFF',
        fontSize: 20
    },
    marginBottom20: {
        marginBottom: 30
    },
    deleteText: {
        color: '#FF0000',
        textTransform: 'uppercase',
        fontSize: 20
    },
    error: {
        fontSize: 20,
        color: '#F09',
        marginTop: 50,
    }
});