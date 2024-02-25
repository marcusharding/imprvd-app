// FIREBASE
import { auth, setDoc } from '../../services/firebase';

// MODULES
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

// CONTEXT
import { useGlobalContext } from '../../context/Global';

// Utils
import { deleteBenchmark, fetchUserDoc } from '../../assets/js/user-database';

const BenchmarkSingle = () => {

    const { benchmarkSingle } = useGlobalContext();
    const { category, benchmark, value } = benchmarkSingle;

    const _delete = async () => {

        const userRef = await fetchUserDoc(auth.currentUser.uid);

        if ( userRef ) {

            const categories = await deleteBenchmark(category, benchmark, auth.currentUser.uid);
            
            await setDoc(userRef, { categories: categories }, { merge: true });

            router.replace('/');
        }
    }

    return (

        <View style={styles.container}>

            <Text style={styles.heading}>{ benchmark }</Text>
            <Text style={styles.text}>{ value }</Text>

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
        paddingTop: 100
    }
});