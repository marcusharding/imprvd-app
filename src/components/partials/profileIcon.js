// React
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';

// Styles
import {baseStyles} from '../../styles/main';

// Firebase
import auth from '@react-native-firebase/auth';

const ProfileIcon = ({navigation}) => {
	const {photoURL} = auth().currentUser;
	return (
		<View>
			{!photoURL && (
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() =>
						navigation.dispatch(
							CommonActions.navigate({
								name: 'ProfileScreen',
							}),
						)
					}>
					<MaterialCommunityIcons
						name={'account-circle'}
						color={'#808080'}
						size={35}
						style={baseStyles.profileIcon}
					/>
				</TouchableOpacity>
			)}

			{photoURL && (
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() =>
						navigation.dispatch(
							CommonActions.navigate({
								name: 'ProfileScreen',
							}),
						)
					}>
					<Image style={baseStyles.profileIcon} source={{uri: photoURL}} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default ProfileIcon;
