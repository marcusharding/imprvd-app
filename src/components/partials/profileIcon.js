// React
import React, {useEffect, useState} from 'react';
import {View, TouchableHighlight} from 'react-native';

// Styles
import {baseStyles} from '../../styles/main';

// Firebase
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const ProfileIcon = props => {
	const [profileImage, setProfileImage] = useState(null);
	const {navigation} = props;

	let imageTag = <View style={baseStyles.profileIconPlaceholder} />;

	useEffect(() => {
		// To do - Fetch the image once the ref has been created following docs since im overcomplicating following old file

		// const imageName = 'profile' + auth().currentUser.displayName;
		// const imageRef = storage().ref(imageName);

		// imageRef
		// 	.getDownloadUrl()
		// 	.then(response => {
		// 		console.log(response);
		// 	})
		// 	.catch(error => {
		// 		console.log('getting downloadUrl of image error => ', error);
		// 	});
	});

	return (
		<View />
		// <TouchableHighlight
		// 	onPress={() => {
		// 		navigation.navigate('Profile', {});
		// 	}}>
		// 	{imageTag}
		// </TouchableHighlight>
	);
};

export default ProfileIcon;
