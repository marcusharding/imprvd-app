// MODULES
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';

// FIREBASE
import { auth, setDoc } from '../../services/firebase';

// DATA
import { categories } from '../../assets/json/benchmarks.json';

// COMPONENTS
import BackButton from '../ui/backButton';
import Loading from '../ui/loading';

// UTILS
import { fetchUserDoc, addBenchmark, benchmarkExists } from '../../assets/js/user-database';

const AddNew = () => {

    // STATIC DATA

    const STATES = {
        SELECT_CATEGORY: 0,
        SELECT_BENCHMARK: 1,
        ENTER_BENCHMARK: 2
    };

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [benchmarkOpen, setBenchmarkOpen] = useState(false);
    const [selectedBenchmark, setSelectedBenchmark] = useState('');
    const [benchmarksList, setBenchmarksList] = useState([]);
    const [value, setValue] = useState('');
    const [loaded, setLoaded] = useState(null);
    const [state, setState] = useState(STATES.SELECT_CATEGORY);

    const createCategories = () => {

        const array = [];

        setCategoriesList(array);
        categories.map(({category}) => { array.push({ label: category, value: category }); });
        setCategoriesList(array);
    };

    const createBenchmarks = async () => {

        const array = [];
        setBenchmarksList(array);
        const category = categories.filter(({category}) => category === selectedCategory);
        
        if ( category.length > 0 ) {

            const benchmarks = category[0].benchmarks;

            setLoaded(false);

            for ( let i = 0; i < benchmarks.length; i++ ) {

                const exists = await benchmarkExists(category[0].category, benchmarks[i].benchmark, auth.currentUser.uid);
                
                if ( !exists ) array.push({ label: benchmarks[i].benchmark, value: benchmarks[i].benchmark });

                if ( i + 1 === benchmarks.length ) {

                    setBenchmarksList(array);
                    setState(STATES.SELECT_BENCHMARK);
                    setLoaded(true);
                }
            }
        }
    }

    const submit = async () => {

        const userRef = await fetchUserDoc(auth.currentUser.uid);

        if ( userRef ) {

            const categories = await addBenchmark(selectedCategory, selectedBenchmark, value, auth.currentUser.uid);
            
            await setDoc(userRef, { categories: categories }, { merge: true });

            router.replace('/');
        }
    }

    const previous = () => {

        switch( state ) {

            case 1:
                setState(STATES.SELECT_CATEGORY);
                setSelectedCategory('');
                setSelectedBenchmark('');
                break;

            case 2:
                setState(STATES.SELECT_BENCHMARK);
                setSelectedBenchmark('');
                break;
        }
    };

    const next = () => {
        
        switch( state ) {

            case 1:
                setState(STATES.ENTER_BENCHMARK);
                break;
        }
    };

    useEffect(() => { if ( categoriesList.length === 0 ) createCategories(); }, []);
    useEffect(() => { createBenchmarks(); }, [selectedCategory]);

    return (

        <View style={styles.container}>

            <BackButton href="/" />

            <Text style={styles.text}>New benchmark</Text>

            <View style={styles.content}>

                {state === 0 && loaded !== false  ?
                    <>
                        <Text style={styles.heading}>Select a category</Text>

                        <DropDownPicker
                            style={styles.picker}
                            open={categoryOpen}
                            value={selectedCategory}
                            items={categoriesList}
                            setOpen={setCategoryOpen}
                            setValue={setSelectedCategory}
                            setItems={setCategoriesList}
                        />
                    </>
                : null }

                {state === 1 && loaded !== false  ?
                    <>
                        <Text style={styles.heading}>Select a benchmark</Text>

                        <DropDownPicker
                            style={styles.picker}
                            open={benchmarkOpen}
                            value={selectedBenchmark}
                            items={benchmarksList}
                            setOpen={setBenchmarkOpen}
                            setValue={setSelectedBenchmark}
                            setItems={setBenchmarksList}
                        />
                    </>
                : null }

                {state === 2 && loaded !== false ?
                    <>
                        <Text style={styles.heading}>Enter rep max</Text>

                        {/* // TO DO - Field validation for being a number */}
                        
                        <TextInput
                            style={styles.input}
                            onChangeText={setValue}
                            value={value}
                            placeholder="200"
                            placeholderTextColor="#d3d3d3"
                        />
                    </>
                : null }

                {value.length > 0 ? 
                    <Pressable
                        onPress={submit}
                        style={styles.submit}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </Pressable>
                : null }

                {loaded === false ? 
                    <View style={styles.spinner}><Loading spinner={true} style={styles.spinner} /></View> 
                : null}

            </View>

            {state !== 0 ? 
                <View style={styles.navigation}>
                    <Pressable
                        onPress={previous}
                        style={styles.previous}
                    >
                        <Text style={styles.submitText}>Previous</Text>
                    </Pressable>
                    
                    {state !== 2 ? 
                        <Pressable
                            onPress={next}
                            style={styles.next}
                        >
                            <Text style={[styles.submitText, selectedBenchmark ? null : styles.inActive]}>Next</Text>
                        </Pressable>
                    : null}

                </View>
            : null}
        </View>
    );
}

export default AddNew;

const styles = StyleSheet.create({
  
    avoidingView: {
        height: '100%',
        backgroundColor: '#212553'
    },
    container: {
        flex: 1,
        backgroundColor: '#212553',
        alignItems: 'center',
    },
    picker: {
        marginBottom: 30
    },
    content: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '50%'
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        borderColor: '#fff',
        color: '#fff'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        paddingTop: 130,
        marginBottom: 30
    },
    heading: {
        color: '#D3D3D3',
        fontSize: 16,
        marginBottom: 20
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
    navigation: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 50
    },
    inActive: {
        opacity: 0.2
    }
});