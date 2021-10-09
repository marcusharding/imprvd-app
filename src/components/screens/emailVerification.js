// emailVerification.js

// React
import React, {Component} from 'react';
import {Text, View, Button, Alert, AppState} from 'react-native';
import {openInbox} from 'react-native-email-link';

// Firebase
import auth from '@react-native-firebase/auth';

// Styles
import {baseStyles, typography} from '../../styles/main';

class EmailVerification extends Component {
	constructor() {
		super();

		this.state = {
			verificationText:
				'Please verify your email address with the email sent to your inbox',
			isLoading: false,
			resendVerificationEmail: false,
			appState: AppState.currentState,
		};
	}

	// TO DO - Continue using app state for listen when app state changes to trigger check on wether user is now verified and
	// pull in the rest of the code with this refactored better implementation rather than using an interval
	componentDidMount() {
		const user = auth().currentUser;
		console.log(user.emailVerified);
		this.appStateSubscription = AppState.addEventListener(
			'change',
			nextAppState => {
				if (
					this.state.appState.match(/inactive|background/) &&
					nextAppState === 'active'
				) {
					console.log('App has come to the foreground!');
				}
				this.setState({appState: nextAppState});
			},
		);
	}

	componentWillUnmount() {
		this.appStateSubscription.remove();
	}

	updateEmailVerified = () => {
		const {navigation} = this.props;
		const user = auth().currentUser;
	};

	render() {
		const {emailVerificationText} = this.state;

		return (
			<View style={baseStyles.flexContainer}>
				<Text style={typography.pageHeading}>Thanks for registering!</Text>

				<Text style={typography.subHeading}>{emailVerificationText}</Text>

				{/* {this.buttonRender()} */}
			</View>
		);
	}
}

export default EmailVerification;
