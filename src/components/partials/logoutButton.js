// React
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Firebase
import auth from '@react-native-firebase/auth';

const LogoutButton = ({navigation}) => {
	const logout = () => {
		navigation.navigate('LoginScreen');
		auth()
			.signOut()
			.then(() => {
				console.log('User signed out');
			})
			.catch(error => console.log('Error logging out => ', error));
	};

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={() => logout()}>
			<MaterialCommunityIcons
				name={'logout-variant'}
				size={35}
				color={'#FF0000'}
			/>
			<Text style={{color: '#FF0000'}}>Logout</Text>
		</TouchableOpacity>
	);
};

export default LogoutButton;
