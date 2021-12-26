// React
import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Styles
import {baseStyles, typography, form, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

// Scripts
import {registerNewUser} from '../../scripts/account';

const SignUp = () => {
	const [isLoading, setLoading] = useState(false);
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation();

	const _registerNewUser = async () => {
		setLoading(true);
		const response = await registerNewUser(email, password, displayName);

		if (response) {
			console.log('Hey big poo');
			setLoading(false);
			setDisplayName('');
			setEmail('');
			setPassword('');
			CommonActions.reset({
				index: 1,
				routes: [{name: 'EmailVerificationScreen'}],
			});
			navigation.dispatch(
				CommonActions.navigate({
					name: 'EmailVerificationScreen',
				}),
			);
		} else {
			setLoading(false);
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
				onPress={() => _registerNewUser()}
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
