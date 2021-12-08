// React
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import {CommonActions} from '@react-navigation/native';

// Styles
import {
	colors,
	typography,
	baseStyles,
	settings,
	spacing,
	profile,
} from '../../styles/main';

// Firebase
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

// Partials
import PreLoader from '../partials/preLoader';
import GoBackIcon from '../partials/goBackIcon';
import LogoutButton from '../partials/logoutButton';

class Profile extends Component {
	constructor(props) {
		super();

		this.state = {
			imagePath: props.profileImagePath,
			isLoading: false,
			status: '',
			fileName: auth().currentUser.uid + '_' + 'profile_image',
		};
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
				Alert.alert('Error:', error.message);
				this.setState({isLoading: false, status: 'Something went wrong'});
			});
	}

	removeImage() {
		const {fileName} = this.state;
		const {setProfileImagePath} = this.props;
		const reference = storage().ref(fileName);

		reference
			.delete()
			.then(() => {
				console.log('File deleted succesfully');
				this.setState({imagePath: null});
				setProfileImagePath(null);
			})
			.catch(error => {
				console.log('There was an error deleting the file => ', error);
				Alert.alert('Error:', error.message);
			});
	}

	fetchImageDownloadUrl(fileName) {
		const {setProfileImagePath} = this.props;
		this.setState({isLoading: true});
		storage()
			.ref(fileName)
			.getDownloadURL()
			.then(response => {
				this.setState({imagePath: response, isLoading: false});
				setProfileImagePath(response);
			})
			.catch(error => {
				console.log('Fetching download URL error => ', error);
				this.setState({isLoading: false});
			});
	}

	componentDidMount() {
		const {fileName} = this.state;
		this.fetchImageDownloadUrl(fileName);
	}

	render() {
		const {imagePath, isLoading} = this.state;
		const {navigation} = this.props;
		const {email, displayName} = auth().currentUser;

		if (isLoading) {
			return <PreLoader />;
		}

		return (
			<View>
				<View style={profile.header}>
					<GoBackIcon navigation={navigation} />
					<TouchableOpacity
						style={spacing.marginTop10}
						activeOpacity={0.8}
						onPress={() =>
							navigation.dispatch(
								CommonActions.navigate({
									name: 'EditProfileScreen',
								}),
							)
						}>
						<Text style={typography.subHeading}>Edit Profile</Text>
					</TouchableOpacity>
				</View>

				<View style={[baseStyles.flexContainerColumn, spacing.marginBottom20]}>
					{!imagePath && (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => this.chooseFile()}>
							<MaterialCommunityIcons
								name={'account-circle'}
								color={'#808080'}
								size={80}
							/>
						</TouchableOpacity>
					)}

					{!imagePath && (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => this.chooseFile()}>
							<Text style={colors.lightBlue}>Update Picture</Text>
						</TouchableOpacity>
					)}

					{imagePath && (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => this.removeImage()}>
							<Image
								style={baseStyles.profileImage}
								source={{uri: imagePath}}
							/>
						</TouchableOpacity>
					)}

					{imagePath && (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => this.removeImage()}>
							<Text style={colors.red}>Remove Picture</Text>
						</TouchableOpacity>
					)}
				</View>

				<View style={baseStyles.flexContainerRow}>
					<Text style={typography.pageHeading}>{displayName}</Text>
				</View>

				<View
					style={[
						settings.sectionBottomBorder,
						spacing.marginBottom20,
						spacing.paddingBottom20,
					]}>
					<Text style={spacing.marginBottom10}>Email</Text>
					<Text style={colors.white}>{email}</Text>
				</View>

				{/* To do - Move the settings headings into a cms and loop over */}
				<View
					style={[
						settings.sectionBottomBorder,
						spacing.marginBottom20,
						spacing.paddingBottom20,
					]}>
					<Text>Account</Text>
				</View>

				<View
					style={[
						settings.sectionBottomBorder,
						spacing.marginBottom20,
						spacing.paddingBottom20,
					]}>
					<Text>Help & Support</Text>
				</View>

				<LogoutButton navigation={navigation} />
			</View>
		);
	}
}

export default Profile;
