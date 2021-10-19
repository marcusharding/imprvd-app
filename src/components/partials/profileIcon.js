// React
import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import {baseStyles} from '../../styles/main';

// Firebase
import storage from '@react-native-firebase/storage';

const ProfileIcon = ({navigation}) => {
	const [imagePath, setImagePath] = useState(null);
	const fileName = 'profile_image';

	useEffect(() => {
		fetchImageDownloadUrl(fileName);
	});

	const fetchImageDownloadUrl = () => {
		storage()
			.ref(fileName)
			.getDownloadURL()
			.then(response => {
				setImagePath(response);
			})
			.catch(error => {
				console.log('Fetching download URL error => ', error);
			});
	};

	return (
		<View>
			{!imagePath && (
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation.navigate('ProfileScreen')}>
					<MaterialCommunityIcons
						name={'account-circle'}
						color={'#808080'}
						size={40}
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
