// Login.js

// React
import React, {Component} from 'react';
import {Text, View, TextInput, Alert, TouchableOpacity} from 'react-native';

// Firebase
import auth from '@react-native-firebase/auth';

// Styles
import {typography, baseStyles, form, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

class Login extends Component {
	constructor() {
		super();

		this.state = {
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

	userLogin = () => {
		const {navigation} = this.props;
		const {email, password} = this.state;

		if (email === '' && password === '') {
			Alert.alert('Please enter both email and password');
		} else {
			this.setState({isLoading: true});

			auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					console.log('User logged in successfully');

					this.setState({
						isLoading: false,
						email: '',
						password: '',
					});

					const isEmailVerified = auth().currentUser.emailVerified;

					if (isEmailVerified) {
						navigation.navigate('DashboardScreen');
					} else {
						navigation.navigate('EmailVerificationScreen');
					}
				})
				.catch(error => console.log(error));
		}
	};

	render() {
		const {isLoading, password, email} = this.state;
		const {navigation} = this.props;

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
					onPress={() => this.userLogin()}
					style={baseStyles.buttonContainer}>
					<Text style={typography.buttonText}>Log In</Text>
				</TouchableOpacity>

				<Text
					style={form.inputText}
					onPress={() => navigation.navigate('SignupScreen')}>
					Don't have account?
					<Text style={form.inputTextSpan}> Click here to signup</Text>
				</Text>
			</View>
		);
	}
}

export default Login;
