// MODULES
import { StyleSheet, View, Image } from 'react-native';

const loading = ({ spinner }) => {

    return <View style={styles.container}>{spinner ? <Image source={require('../../assets/images/spinner.gif')} style={styles.spinner}  /> : null}</View>;
}

export default loading;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    spinner: {
        width: 80,
        height: 80
    }
});