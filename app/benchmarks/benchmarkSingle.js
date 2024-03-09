// FIREBASE
import { auth, setDoc } from '../../services/firebase';

// MODULES
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

// CONTEXT
import { useGlobalContext } from '../../context/Global';

// COMPONENTS
import BackButton from '../ui/backButton';

// UTILS
import { deleteBenchmark, fetchUserDoc, updateBenchmark } from '../../assets/js/user-database';

const BenchmarkSingle = () => {

    const { benchmarkSingle } = useGlobalContext();
    const { category, benchmark, value } = benchmarkSingle;

    const [newValue, setNewValue] = useState(null);

    const _delete = async () => {

        const userRef = await fetchUserDoc(auth.currentUser.uid);

        if ( userRef ) {

            const categories = await deleteBenchmark(category, benchmark, auth.currentUser.uid);
            
            await setDoc(userRef, { categories: categories }, { merge: true });

            router.replace('/');
        }
    }

    const _update = async () => {

        const userRef = await fetchUserDoc(auth.currentUser.uid);

        if ( userRef ) {

            const categories = await updateBenchmark(category, benchmark, auth.currentUser.uid, newValue);
            
            await setDoc(userRef, { categories: categories }, { merge: true });

            router.replace('/');
        }
    }

    return (

        <View style={styles.container}>

            <BackButton href="/" />

            <Text style={styles.heading}>{ benchmark }</Text>
            <Text style={styles.text}>{ value }</Text>

            <Text style={styles.heading}>Update benchmark</Text>

            {/* // TO DO - Field validation for being a number */}
                        
            <TextInput
                style={styles.input}
                onChangeText={setNewValue}
                value={newValue}
                placeholder={value}
                placeholderTextColor="#d3d3d3"
            />

            {newValue ?

                <Pressable onPress={_update}>
                    <Text style={styles.update}>Update</Text>
                </Pressable>

            : null }

            <Pressable onPress={_delete}>
                <Text style={styles.delete}>Delete benchmark</Text>
            </Pressable>

        </View>
    )
}

export default BenchmarkSingle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingLeft: 20,
        paddingRight: 20
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
        paddingTop: 130
    },
    heading: {
        color: '#fff',
        fontSize: 30,
        paddingTop: 130,
        marginBottom: 50,
        textAlign: 'center'
    },
    delete: {
        color: '#F00',
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 25,
        paddingTop: 50
    },
    update: {
        color: '#F09',
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 25,
        paddingTop: 50
    }
});