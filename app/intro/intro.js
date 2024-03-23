// FIREBASE
import { auth, db, doc, updateDoc } from '../../services/firebase';

// MODULES
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { router } from 'expo-router';

// COMPONENTS
import Pagination from '../ui/pagination';

// DATABASE
import { userExists } from '../../assets/js/user-database';

const Intro = () => {

    // TO DO - Add gsap to fade out and in and onComplete update state

    const [step, setStep] = useState(0);

    const steps = [
        {
            color: '#FFF',
            theme: '#212553',
            heading: 'Chase Your Dreams',
            copy: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            image: require('../../assets/images/intro/intro-hero-blue.png')
        },
        {
            color: '#212553',
            theme: '#B5D0DF',
            heading: 'Build Upon Your Goals',
            copy: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            image: require('../../assets/images/intro/intro-hero-light-blue.png')
        },
        {
            color: '#000',
            theme: '#F8BFB3',
            heading: 'One Day At A Time',
            copy: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            image: require('../../assets/images/intro/intro-hero-orange.png')
        },
        {
            color: '#212553',
            theme: '#D1C8D0',
            heading: 'Lets Get Imprvd',
            copy: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            image: require('../../assets/images/intro/intro-hero-grey.png')
        }
    ];

    const next = () => { setStep(step + 1) };
    const start = async () => {

        const ref = doc(db, "users", auth.currentUser.uid);
        await updateDoc(ref, { intro_played: true });
        router.replace('/home');
    };

    useEffect(() => { 

        const setup = async () => { await userExists(auth.currentUser); }

        setup();
        
    }, []);

    return (

        steps.map(({color, theme, heading, copy, image}, index) => {

            if ( index === step ) {

                return (

                    <View style={[styles.container, {backgroundColor: theme}]} key={index}>
                        <Image source={image} style={styles.hero}  />

                        <View style={styles.paginationContainer}><Pagination steps={steps} active={step} /></View>
                        <Text style={[styles.heading, {color: color}]}>{ heading }</Text>
                        <Text style={[styles.text, {color: color}]}>{ copy }</Text>
            
                        {
                            step + 1 !== steps.length ?

                                <Pressable
                                    onPress={next}
                                    style={styles.submit}
                                >
                                    <Text style={styles.submitText}>Next</Text>
                                </Pressable>
                            :   
                                <Pressable
                                    onPress={start}
                                    style={styles.submit}
                                >
                                    <Text style={styles.submitText}>Get Started</Text>
                                </Pressable>
                        }
                    </View>
                )
            }
        })
    )
}

export default Intro;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    paginationContainer: {
        paddingTop: 350,
        marginBottom: 40
    },
    heading: {
        fontSize: 55,
        fontWeight: '700',
        width: '85%',
        marginBottom: 20,
    },
    text: {
        fontSize: 25,
        fontWeight: '200',
        marginBottom: 50,
    },
    submit: {
        width: '100%',
        marginTop: 30,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        color: '#212553',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    hero: {
        position: 'absolute',
        top: 50,
        
    }
});