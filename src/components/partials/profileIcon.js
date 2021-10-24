// React
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import {baseStyles} from '../../styles/main';

const ProfileIcon = ({navigation, imagePath}) => {
	return (
		<View>
			{!imagePath && (
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation.navigate('ProfileScreen')}>
					<MaterialCommunityIcons
						name={'account-circle'}
						color={'#808080'}
						size={35}
						style={baseStyles.profileIcon}
					/>
				</TouchableOpacity>
			)}

			{imagePath && (
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation.navigate('ProfileScreen')}>
					<Image style={baseStyles.profileIcon} source={{uri: imagePath}} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default ProfileIcon;
