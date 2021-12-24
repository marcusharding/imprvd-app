// React
import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {typography, baseStyles, form, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

// Scripts
import {userLogin} from '../../scripts/account';

const Login = ({navigation}) => {
	const [isLoading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const _userLogin = async () => {
		setLoading(true);
		const response = await userLogin(email, password);

		if (response) {
			setLoading(false);
			setEmail('');
			setPassword('');
			if (response === 'verified') {
				CommonActions.reset({
					index: 1,
					routes: [{name: 'DashboardScreen'}],
				});
				navigation.dispatch(
					CommonActions.navigate({
						name: 'DashboardScreen',
					}),
				);
			} else {
				navigation.dispatch(
					CommonActions.navigate({
						name: 'EmailVerificationScreen',
					}),
				);
			}
		} else {
			setLoading(false);
		}
	};

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<View style={baseStyles.flexContainer}>
			<Text style={typography.pageHeading}>Welcome back</Text>

			<Text style={[typography.subHeading, spacing.marginBottom20]}>
				Log in to your account using your email or social networks.
			</Text>

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
				onPress={() => _userLogin()}
				style={baseStyles.buttonContainer}>
				<Text style={typography.buttonText}>Log In</Text>
			</TouchableOpacity>

			<Text
				style={form.inputText}
				onPress={() =>
					navigation.dispatch(
						CommonActions.navigate({
							name: 'SignupScreen',
						}),
					)
				}>
				Don't have account?
				<Text style={form.inputTextSpan}> Click here to signup</Text>
			</Text>
		</View>
	);
};

export default Login;
