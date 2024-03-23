// FIREBASE
import { auth } from '../services/firebase';

// MODULES
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons'; 

// DATABASE
import { userExists, fetchCategories } from '../assets/js/user-database';

// COMPONENTS
import Teaser from './benchmarks/teaser';
import Loading from './ui/loading';

const Home = () => {

    const [loaded, setLoaded] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => { 

        const setup = async () => {

            await userExists(auth.currentUser);

            const fetchedCategories = await fetchCategories(auth.currentUser.uid);

            if ( fetchedCategories ) setCategories(fetchedCategories);

            setLoaded(true);
        }

        setup();
        
    }, []);

    return (

        <View style={styles.container}>

            <Link 
                href="/account/account" 
                style={styles.icon}
            >
                <FontAwesome5 name="user-circle" size={25} color="white" />
            </Link>

            <Text style={styles.heading}>Home</Text>

            <Link
                href="/benchmarks/addnew"
                style={styles.plus}
            >
                <FontAwesome5 name="plus-circle" size={50} color="#f09" />
            </Link>

            { categories.length && loaded > 0 ?  

                categories.map(({category, benchmarks}) => {

                    return (

                        <View key={category} style={styles.categories}>

                            <Text style={styles.category}>{ category }</Text>

                            {benchmarks.length > 0 ?
                                <>

                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        { benchmarks.map(({benchmark, value}) => <Teaser key={benchmark} category={category} benchmark={benchmark} value={value} /> )}
                                    </ScrollView>
                                </>
                            : null}
                        </View>
                    )
                })
            : null }

            {!loaded ? <Loading spinner={true} /> : null}
            
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({

    // TO DO - Probably dont need all these background colours set on all the different views.
  
    container: {
        flex: 1,
        backgroundColor: '#212553',
        paddingLeft: 20,
        paddingRight: 20
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 60,
        zIndex: 10
    },
    heading: {
        color: '#fff',
        fontSize: 30,
        paddingTop: 130,
        marginBottom: 50,
        textAlign: 'center'
    },
    category: {
        color: '#fff',
        fontSize: 30,
        marginBottom: 20
    },
    categories: {
        marginBottom: 30
    },  
    plus: {
        position: 'absolute',
        right: 20,
        bottom: 20
    }
});