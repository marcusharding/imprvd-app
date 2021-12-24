// React
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {spacing, typography, form, profile, colors} from '../../styles/main';

// Partials
import GoBackIcon from '../partials/goBackIcon';
import PreLoader from '../partials/preLoader';

// Firebase
import auth from '@react-native-firebase/auth';

// Scripts
import {updateProfilData} from '../../scripts/profileData';

const EditProfile = ({navigation}) => {
	const {displayName} = auth().currentUser;
	const [name, setName] = useState(displayName);
	const [isLoading, setLoading] = useState(false);

	const _updateProfilData = async () => {
		setLoading(true);
		const response = await updateProfilData(name);

		if (response) {
			setLoading(false);
			navigation.dispatch(
				CommonActions.navigate({
					name: 'ProfileScreen',
				}),
			);
		}
	};

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<View>
			<View style={profile.header}>
				<GoBackIcon navigation={navigation} />
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => _updateProfilData()}>
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
