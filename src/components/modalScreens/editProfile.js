// React
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, TextInput} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {spacing, typography, form, profile, colors} from '../../styles/main';

// Partials
import GoBackIcon from '../partials/goBackIcon';
import PreLoader from '../partials/preLoader';

// Firebase
import auth from '@react-native-firebase/auth';

const EditProfile = ({route, navigation}) => {
	const {displayName} = auth().currentUser;
	const [name, setName] = useState(displayName);
	const [isLoading, IsLoading] = useState(false);

	const saveUpdates = async () => {
		IsLoading(true);

		const update = {
			displayName: name,
		};

		const promise = await auth()
			.currentUser.updateProfile(update)
			.then(response => {
				console.log('Profile data set');
				IsLoading(false);
				navigation.dispatch(
					CommonActions.navigate({
						name: 'ProfileScreen',
					}),
				);
			})
			.catch(error => {
				console.log('Updating profile data failed error => ', error);
				Alert.alert('Error:', error.message);
				IsLoading(false);
			});
	};

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<View>
			<View style={profile.header}>
				<GoBackIcon navigation={navigation} />
				<TouchableOpacity activeOpacity={0.8} onPress={() => saveUpdates()}>
					<Text style={[typography.subHeading, colors.lightBlue]}>
						Save updates
					</Text>
				</TouchableOpacity>
			</View>
			<Text style={spacing.marginTop50}>Update display name</Text>
			<TextInput
				style={[form.input, spacing.marginTop20]}
				placeholder="Display name"
				value={name}
				onChangeText={value => setName(value)}
				placeholderTextColor="#EFEFEF"
			/>
		</View>
	);
};

export default EditProfile;
