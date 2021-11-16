// React
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';

// Firebase
import auth from '@react-native-firebase/auth';

const LogoutButton = ({navigation}) => {
	const logout = () => {
		auth()
			.signOut()
			.then(() => {
				console.log('User signed out');
				CommonActions.reset({
					index: 0,
					routes: [{name: 'LoginScreen'}],
				});
				navigation.dispatch(
					CommonActions.navigate({
						name: 'LoginScreen',
					}),
				);
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
