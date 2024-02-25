import { Text, View, StyleSheet } from 'react-native';

// CONTEXT
import { useGlobalContext } from '../../context/Global';

const BenchmarkSingle = () => {

    const { benchmarkSingle } = useGlobalContext();

    return (

        <View style={styles.container}>

            <Text style={styles.heading}>{ benchmarkSingle.benchmark }</Text>
            <Text style={styles.text}>{ benchmarkSingle.value }</Text>
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
    }
});