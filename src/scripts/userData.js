// React
import {Alert} from 'react-native';

// Firebase
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const fetchImageDownloadUrl = async user => {
	const fileName = auth().currentUser.uid + '_' + 'profile_image';
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
