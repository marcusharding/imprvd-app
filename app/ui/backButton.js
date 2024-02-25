// Modules
import { Ionicons } from '@expo/vector-icons'; 
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

const BackButton = ({ href }) => {
    
    return <Link href={href} style={styles.icon}><Ionicons name="arrow-back" size={30} color="white" /></Link>
}

export default BackButton;

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        left: 20,
        top: 60
    }
});