
// MODULES
import { StyleSheet, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

// CONTEXT
import { useGlobalContext } from '../../context/Global';

const Teaser = ( benchmark ) => {

    const { setBenchmarkSingle } = useGlobalContext();

    const onPress = () => {

        setBenchmarkSingle(benchmark);
        router.replace('/benchmarks/benchmarkSingle');
    }

    return (

        <Pressable style={styles.teaser} onPress={onPress}>

            <Text style={styles.text}>{ benchmark.benchmark }</Text>
            <Text style={styles.text}>{ benchmark.value }</Text>
            
        </Pressable>
    )
};

export default Teaser;

const styles = StyleSheet.create({
    teaser: {
        width: 200,
        height: 120,
        backgroundColor: '#71797E',
        borderRadius: 10,
        padding: 10,
        marginRight: 20
    },
    text: {
        color: '#fff'
    }
});