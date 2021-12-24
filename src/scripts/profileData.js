// React
import * as ImagePicker from 'react-native-image-picker';
import {Alert} from 'react-native';

// Firebase
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

// Global variables
const fileName = auth().currentUser.uid + '_' + 'profile_image';
const reference = storage().ref(fileName);

const fetchImageDownloadUrl = async () => {
	const update = await storage()
		.ref(fileName)
		.getDownloadURL()
		.then(response => {
			return {photoURL: response};
		})
		.catch(error => {
			console.log('Fetching display image download URL error => ', error);
		});

	if (update) {
		const promise = await auth()
			.currentUser.updateProfile(update)
			.then(() => {
				console.log('photoURL set');
			})
			.catch(error => {
				console.log('Setting photoURL failed error => ', error);
				Alert.alert('Error:', error.message);
			});
	}
};

const uploadImageToStorage = path => {
	const task = reference.putFile(path);

	task
		.then(() => {
			console.log('image uploaded to firebase');
			fetchImageDownloadUrl();
		})
		.catch(error => {
			console.log('Uploading image to firebase error => ', error);
			Alert.alert('Error:', error.message);
		});
};

export const chooseDisplayImage = () => {
	const options = {
		title: 'Select Image',
		customButtons: [
			{name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
		],
		storageOptions: {
			skipBackup: true,
			path: 'images',
		},
	};

	ImagePicker.launchImageLibrary(options, response => {
		if (response.didCancel) {
			console.log('User cancelled image picker', storage());
		} else if (response.errorMessage) {
			console.log('ImagePicker Error: ', response.errorMessage);
		} else {
			const path = response.assets[0].uri;
			uploadImageToStorage(path, fileName);
		}
	});
};

export const removeDisplayImage = async () => {
	const update = await reference
		.delete()
		.then(() => {
			console.log('File deleted succesfully');
			return {photoURL: null};
		})
		.catch(error => {
			console.log('There was an error deleting the file => ', error);
			Alert.alert('Error:', error.message);
		});

	if (update) {
		const promise = await auth()
			.currentUser.updateProfile(update)
			.then(() => {
				console.log('photoURL set to NULL');
			})
			.catch(error => {
				console.log('Setting photoURL to NULL failed error => ', error);
				Alert.alert('Error:', error.message);
			});
	}
};

export const updateProfilData = async name => {
	const update = {
		displayName: name,
	};

	const promise = await auth()
		.currentUser.updateProfile(update)
		.then(response => {
			console.log('Profile data set');
			return true;
		})
		.catch(error => {
			console.log('Updating profile data failed => ', error);
			Alert.alert('Error:', error.message);
		});

	if (promise) {
		return true;
	}
};
