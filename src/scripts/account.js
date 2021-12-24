// React
import * as ImagePicker from 'react-native-image-picker';
import {Alert} from 'react-native';

// Firebase
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

// Constants
import {
	PROFILE_IMAGE_FILENAME,
	PROFILE_IMAGE_REFERENCE,
	EMAIL_VERIFICATION,
} from '../constants/constants';

const fetchImageDownloadUrl = async () => {
	const update = await storage()
		.ref(PROFILE_IMAGE_FILENAME)
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
	const task = PROFILE_IMAGE_REFERENCE.putFile(path);

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
			uploadImageToStorage(path, PROFILE_IMAGE_FILENAME);
		}
	});
};

export const removeDisplayImage = async () => {
	const update = await PROFILE_IMAGE_REFERENCE.delete()
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

export const logoutUser = async () => {
	const promise = await auth()
		.signOut()
		.then(() => {
			console.log('User signed out');
			return true;
		})
		.catch(error => {
			console.log('Error logging out => ', error);
			Alert.alert('Error:', error.message);
		});

	if (promise) {
		return true;
	}
};

export const isEmailVerified = async () => {
	if (EMAIL_VERIFICATION) {
		return true;
	}

	return false;
};

export const userLogin = async (email, password) => {
	if (email === '' && password === '') {
		Alert.alert('Please enter both email and password');
		return null;
	}

	const response = await auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			console.log('User logged in successfully');
			if (isEmailVerified()) {
				return 'verified';
			} else {
				return 'unverified';
			}
		})
		.catch(error => {
			console.log(error);
			Alert.alert('Error logging in:', error.message);
		});

	if (response) {
		return response;
	}
};

export const registerNewUser = async (email, password, displayName) => {
	if (email === '' && password === '') {
		Alert.alert('Please enter an email and password');
		return null;
	}

	const response = await auth()
		.createUserWithEmailAndPassword(email, password)
		.then(res => {
			res.user.updateProfile({
				displayName: displayName,
			});
			auth().currentUser.sendEmailVerification();
			console.log('User registered successfully!');
			console.log('Verification email sent');
			return true;
		})
		.catch(error => {
			console.log(error);
			Alert.alert('Error registering new user:', error.message);
		});

	if (response) {
		return true;
	}
};
