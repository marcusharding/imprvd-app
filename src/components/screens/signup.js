// React
import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {baseStyles, typography, form, spacing} from '../../styles/main';

// Firebase
import auth from '@react-native-firebase/auth';

// Partials
import PreLoader from '../partials/preLoader';

const SignUp = ({navigation}) => {
	const [isLoading, setLoading] = useState(false);
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const registerNewUser = () => {
		if (email === '' && password === '') {
			Alert.alert('Please enter an email and password');
		} else {
			setLoading(true);

			auth()
				.createUserWithEmailAndPassword(email, password)
				.then(response => {
					response.user.updateProfile({
						displayName: displayName,
					});
					console.log('User registered successfully!');
					setLoading(false);
					setDisplayName(false);
					setEmail(false);
					setPassword(false);

					auth()
						.currentUser.sendEmailVerification()
						.then(() => {
							console.log('Verification email sent');
							navigation.dispatch(
								CommonActions.navigate({
									name: 'EmailVerificationScreen',
								}),
							);
						});
				})
				.catch(error => {
					console.log(error);
					Alert.alert('Error:', error.message);
					setLoading(false);
				});
		}
	};

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<View style={baseStyles.flexContainer}>
			<Text style={typography.pageHeading}>Sign Up</Text>

			<Text style={[typography.subHeading, spacing.marginBottom20]}>
				Create your account.
			</Text>

			<TextInput
				style={form.input}
				placeholder="Name"
				value={displayName}
				onChangeText={value => setDisplayName(value)}
				placeholderTextColor="#EFEFEF"
			/>

			<TextInput
				style={form.input}
				placeholder="Email"
				value={email}
				onChangeText={value => setEmail(value)}
				placeholderTextColor="#EFEFEF"
			/>

			<TextInput
				style={form.input}
				placeholder="Password"
				value={password}
				onChangeText={value => setPassword(value)}
				maxLength={15}
				secureTextEntry={true}
				placeholderTextColor="#EFEFEF"
			/>

			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => registerNewUser()}
				style={baseStyles.buttonContainer}>
				<Text style={typography.buttonText}>Continue</Text>
			</TouchableOpacity>

			<Text
				style={form.inputText}
				onPress={() =>
					navigation.dispatch(
						CommonActions.navigate({
							name: 'LoginScreen',
						}),
					)
				}>
				Already Registered?
				<Text style={form.inputTextSpan}> Click here to login</Text>
			</Text>
		</View>
	);
};

export default SignUp;
