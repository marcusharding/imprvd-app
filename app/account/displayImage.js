
// FIREBASE
import { auth } from '../../services/firebase';

// MODULES
import { View, StyleSheet, Text } from 'react-native';

// UTILS
import { getUserInitials } from '../../assets/js/utils';

const DisplayImage = () => {

    return (

        <View style={styles.container}>
            <Text style={styles.initials}>{ getUserInitials(auth.currentUser.displayName) }</Text>
        </View> 
    );
}

export default DisplayImage;

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        width: 60,
        height: 60,
        backgroundColor: '#D3D3D3',
        borderRadius: 60
    },
    initials: {
        color: '#FFF',
        fontSize: 27
    }
});