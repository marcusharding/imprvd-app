// React
import {Alert} from 'react-native';

// Firebase
import storage from '@react-native-firebase/storage';

export const fetchImageDownloadUrl = async user => {
	const fileName = 'profile_image';
	const imageRef = storage().ref(fileName);

	if (user) {
		const promise = await imageRef
			.getDownloadURL()
			.then(response => {
				return response;
			})
			.catch(error => {
				console.log('Fetching download URL error => ', error);
				Alert.alert('Error:', error.message);
			});

		if (promise) {
			return promise;
		}
	}
};
