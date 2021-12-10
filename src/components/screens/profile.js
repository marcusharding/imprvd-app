// React
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import auth from '@react-native-firebase/auth';

// Partials
import PreLoader from '../partials/preLoader';
import GoBackIcon from '../partials/goBackIcon';
import LogoutButton from '../partials/logoutButton';

// Scripts
import {
	chooseDisplayImage,
	removeDisplayImage,
} from '../../scripts/profileData';

const Profile = ({navigation}) => {
	const {email, displayName, photoURL} = auth().currentUser;

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
				{!photoURL && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => chooseDisplayImage()}>
						<MaterialCommunityIcons
							name={'account-circle'}
							color={'#808080'}
							size={80}
						/>
					</TouchableOpacity>
				)}

				{!photoURL && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => chooseDisplayImage()}>
						<Text style={colors.lightBlue}>Update Picture</Text>
					</TouchableOpacity>
				)}

				{photoURL && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => removeDisplayImage()}>
						<Image style={baseStyles.profileImage} source={{uri: photoURL}} />
					</TouchableOpacity>
				)}

				{photoURL && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => removeDisplayImage()}>
						<Text style={colors.red}>Remove Picture</Text>
					</TouchableOpacity>
				)}
			</View>

			<View style={[baseStyles.flexContainerRow, spacing.marginBottom50]}>
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
};

export default Profile;
