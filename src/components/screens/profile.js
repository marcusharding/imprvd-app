// React
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';

// Styles
import {typography, baseStyles} from '../../styles/main';

// Firebase
import storage from '@react-native-firebase/storage';

// Partials
import PreLoader from '../partials/preLoader';

class Profile extends Component {
	constructor(props) {
		super();

		this.state = {
			imagePath: null,
			isLoading: false,
			status: '',
			fileName: 'profile_image',
		};
	}

	chooseFile() {
		this.setState({status: ''});

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
				const fileName = this.state.fileName;
				this.setState({imagePath: path});
				this.uploadImageToStorage(path, fileName);
			}
		});
	}

	getFileName(name, path) {
		if (name !== null) {
			return name;
		}

		if (Platform.OS === 'ios') {
			path = '~' + path.substring(path.indexOf('/Documents'));
		}

		return path.split('/').pop();
	}

	uploadImageToStorage(path, name) {
		this.setState({isLoading: true});

		const reference = storage().ref(name);
		const task = reference.putFile(path);

		task
			.then(() => {
				console.log('image uploaded to firebase');
				this.setState({
					isLoading: false,
					status: 'Image uploaded successfully',
				});
			})
			.catch(error => {
				console.log('Uploading image error => ', error);
				this.setState({isLoading: false, status: 'Something went wrong'});
			});
	}

	getPlatformPath({path, uri}) {
		return Platform.select({
			android: {value: path},
			ios: {value: uri},
		});
	}

	getPlatformURI(imagePath) {
		if (imagePath) {
			let imgSource = imagePath;

			if (isNaN(imagePath)) {
				imgSource = {uri: this.state.imagePath};
				if (Platform.OS === 'android') {
					imgSource.uri = 'file:///' + imgSource.uri;
				}
			}
			return imgSource;
		}

		return imagePath;
	}

	// To Do - Write function to delete image
	removeImage() {
		console.log('ImageRemoved');
	}

	// To Do - Write function to fetch image on mount

	render() {
		const {imagePath, isLoading} = this.state;
		const imgSource = this.getPlatformURI(imagePath);

		console.log(imagePath);

		if (isLoading) {
			return <PreLoader />;
		}

		return (
			<View>
				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Profile
				</Text>

				{!imgSource && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => this.chooseFile()}>
						<MaterialCommunityIcons
							name={'camera-plus'}
							color={'#34FFC8'}
							size={35}
						/>
					</TouchableOpacity>
				)}

				{imgSource && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => this.removeImage()}>
						<MaterialCommunityIcons
							name={'camera-off'}
							color={'#34FFC8'}
							size={35}
						/>
					</TouchableOpacity>
				)}

				{imgSource && <Image source={imagePath} />}
			</View>
		);
	}
}

export default Profile;
