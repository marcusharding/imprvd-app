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
			isLoading: true,
			status: '',
			fileName: 'profile_image',
		};
	}

	componentDidMount() {
		const {fileName} = this.state;
		this.fetchImageDownloadUrl(fileName);
	}

	chooseFile() {
		this.setState({status: ''});
		const {fileName} = this.state;

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
				this.uploadImageToStorage(path, fileName);
			}
		});
	}

	uploadImageToStorage(path, name) {
		this.setState({isLoading: true});

		const reference = storage().ref(name);
		const task = reference.putFile(path);

		task
			.then(() => {
				console.log('image uploaded to firebase');
				this.fetchImageDownloadUrl(name);
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

	// To Do - Write function to delete image
	removeImage() {
		const {fileName} = this.state;
		const reference = storage().ref(fileName);

		reference
			.delete()
			.then(() => {
				console.log('File deleted succesfully');
				this.setState({imagePath: null});
			})
			.catch(error => {
				console.log('There was an error deleting the file => ', error);
			});
	}

	// To Do - Write function to fetch image on mount
	fetchImageDownloadUrl(fileName) {
		storage()
			.ref(fileName)
			.getDownloadURL()
			.then(response => {
				this.setState({imagePath: response, isLoading: false});
			})
			.catch(error => {
				console.log('Fetching download URL error => ', error);
				this.setState({isLoading: false, status: 'Something went wrong'});
			});
	}

	render() {
		const {imagePath, isLoading} = this.state;

		if (isLoading) {
			return <PreLoader />;
		}

		return (
			<View>
				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Profile
				</Text>

				<View style={baseStyles.flexContainerRow}>
					{!imagePath && (
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

					{imagePath && (
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

					{!imagePath && (
						<MaterialCommunityIcons
							name={'account-circle'}
							color={'#808080'}
							size={120}
						/>
					)}

					{imagePath && (
						<Image style={baseStyles.profileImage} source={{uri: imagePath}} />
					)}

					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => this.removeImage()}>
						<Text>Edit Profile</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Profile;
