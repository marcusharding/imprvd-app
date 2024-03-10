// FIREBASE
import { auth } from '../../services/firebase';
import { EvilIcons } from '@expo/vector-icons'; 

// MODULES
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Link } from 'expo-router';

// COMPONENTS
import DisplayImage from './displayImage';

const Account = () => {

    // TO DO - More standardized styling

    const logout = () => { 

        auth.signOut();
        router.replace('/');
    }

    return (

        <View style={styles.container}>

            <DisplayImage />

            <Link 
                href="/" 
                style={styles.icon}
            >
                <EvilIcons name="close" size={35} color="white" />
            </Link>
            
            <Text style={styles.text}>{ auth.currentUser.displayName }</Text>

            <View style={[styles.section, styles.firstSection]}>

                <Text style={styles.subHeadingText}>Email</Text>
                <Text style={styles.subText}>{ auth.currentUser.email }</Text>
                <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, marginTop: 30}}/>

            </View>

            <View style={styles.section}>

                <Text style={styles.account}>Account</Text>
                <Link
                    href="/account/manageAccount" 
                    style={styles.link}
                >
                    <Text style={styles.manageAccount}>Manage your account</Text>
                </Link>

                <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, marginTop: 30}}/>

            </View>

            <View>

                <Pressable
                    onPress={logout}
                    style={styles.logout}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>

            </View>
        </View>
    )
}

export default Account;

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: 150
    },
    icon: {
        position: 'absolute',
        left: 20,
        top: 60
    },
    firstSection: {
        marginTop: 50
    },
    section: {
        marginBottom: 50,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        color: '#fff',
        fontSize: 30,
    },
    account: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 30
    },  
    manageAccount: {
        color: '#fff',
        fontSize: 20, 
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
    logoutText: {
        color: '#FF0000',
        textTransform: 'uppercase',
        fontSize: 20
    },
    subHeadingText: {
        color: '#D3D3D3',
        fontSize: 16,
        marginBottom: 5
    },
    subText: {
        color: '#FFF',
        fontSize: 16
    }
});