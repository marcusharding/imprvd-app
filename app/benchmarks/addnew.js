// Modules
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';

// Firebase
import { auth, setDoc } from '../../services/firebase';

// Data
import { categories } from '../../assets/json/benchmarks.json';

// Components
import BackButton from '../ui/backButton';
import Loading from '../ui/loading';

// Utils
import { fetchUserDoc, addBenchmark, benchmarkExists } from '../../assets/js/user-database';

const AddNew = () => {

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [benchmarkOpen, setBenchmarkOpen] = useState(false);
    const [selectedBenchmark, setSelectedBenchmark] = useState('');
    const [benchmarksList, setBenchmarksList] = useState([]);
    const [displayBenchmarksList, setDisplayBenchmarksList] = useState(false);
    const [value, setValue] = useState('');
    const [loaded, setLoaded] = useState(null);

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
                    setDisplayBenchmarksList(true);
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

    useEffect(() => { if ( categoriesList.length === 0 ) createCategories(); }, []);
    useEffect(() => { createBenchmarks(); }, [selectedCategory]);
    useEffect(() => { console.log(benchmarksList) }, [benchmarksList]);

    return (

        <View style={styles.container}>

            <BackButton href="/" />

            <Text style={styles.text}>New benchmark</Text>

            <View style={styles.content}>

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

                {displayBenchmarksList && loaded === true  ?
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

                {selectedBenchmark.length > 0 ?
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
                
                    <View style={styles.spinner}> 
                        <Loading spinner={true} style={styles.spinner} />
                    </View> 
                    
                : null}

            </View>
        </View>
    );
}

export default AddNew;

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
    picker: {
        marginBottom: 30
    },
    content: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'
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
    spinner: {
        paddingTop: 130
    }
});