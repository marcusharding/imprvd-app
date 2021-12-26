// React
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Firebase
import {spacing, baseStyles} from '../../styles/main';

// Scripts
import {logoutUser} from '../../scripts/account';

const LogoutButton = () => {
	const navigation = useNavigation();
	const _logoutUser = async () => {
		const response = await logoutUser();

		if (response) {
			CommonActions.reset({
				index: 1,
				routes: [{name: 'LoginScreen'}],
			});
			navigation.dispatch(
				CommonActions.navigate({
					name: 'LoginScreen',
				}),
			);
		}
	};

	return (
		<TouchableOpacity
			style={baseStyles.logoutButton}
			activeOpacity={0.8}
			onPress={() => _logoutUser()}>
			<MaterialCommunityIcons
				style={spacing.marginRight5}
				name={'logout-variant'}
				size={35}
				color={'#FF0000'}
			/>
			<Text style={{color: '#FF0000'}}>Logout</Text>
		</TouchableOpacity>
	);
};

export default LogoutButton;
