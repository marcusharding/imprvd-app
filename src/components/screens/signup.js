// React
import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {baseStyles, typography, form, spacing} from '../../styles/main';

// Firebase
import auth from '@react-native-firebase/auth';

// Partials
import PreLoader from '../partials/preLoader';

class SignUp extends Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			isLoading: false,
		};
	}

	updateInputValue = (value, prop) => {
		const state = this.state;
		state[prop] = value;
		this.setState(state);
	};

	registerNewUser = () => {
		const {displayName, email, password} = this.state;
		const {navigation} = this.props;

		if (email === '' && password === '') {
			Alert.alert('Please enter an email and password');
		} else {
			this.setState({isLoading: true});

			auth()
				.createUserWithEmailAndPassword(email, password)
				.then(response => {
					response.user.updateProfile({
						displayName: displayName,
					});

					console.log('User registered successfully!');

					this.setState({
						isLoading: false,
						displayName: '',
						email: '',
						password: '',
					});

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
					this.setState({
						isLoading: false,
					});
				});
		}
	};

	render() {
		const {isLoading, displayName, email, password} = this.state;
		const {navigation} = this.props;

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
					onChangeText={value => this.updateInputValue(value, 'displayName')}
					placeholderTextColor="#EFEFEF"
				/>

				<TextInput
					style={form.input}
					placeholder="Email"
					value={email}
					onChangeText={value => this.updateInputValue(value, 'email')}
					placeholderTextColor="#EFEFEF"
				/>

				<TextInput
					style={form.input}
					placeholder="Password"
					value={password}
					onChangeText={value => this.updateInputValue(value, 'password')}
					maxLength={15}
					secureTextEntry={true}
					placeholderTextColor="#EFEFEF"
				/>

				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => this.registerNewUser()}
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
	}
}

export default SignUp;
