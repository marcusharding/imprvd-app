// React
import React, {useState} from 'react';
import {Text, View, TextInput, Alert, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Firebase
import auth from '@react-native-firebase/auth';

// Styles
import {typography, baseStyles, form, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

const Login = ({navigation}) => {
	const [isLoading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const userLogin = () => {
		if (email === '' && password === '') {
			Alert.alert('Please enter both email and password');
		} else {
			setLoading(true);

			auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					console.log('User logged in successfully');
					setLoading(false);
					setEmail('');
					setPassword('');
					const isEmailVerified = auth().currentUser.emailVerified;

					if (isEmailVerified) {
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
				})
				.catch(error => {
					console.log(error);
					Alert.alert('Error:', error.message);
					setLoading(false);
					setEmail('');
					setPassword('');
				});
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
				onPress={() => userLogin()}
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
