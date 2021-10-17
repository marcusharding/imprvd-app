// emailVerification.js

// React
import React, {Component} from 'react';
import {Text, View, AppState, Image, TouchableOpacity} from 'react-native';
import {openInbox} from 'react-native-email-link';

// Firebase
import auth from '@react-native-firebase/auth';

// Styles
import {baseStyles, typography, form, spacing} from '../../styles/main';

class EmailVerification extends Component {
	constructor() {
		super();

		this.state = {
			appState: AppState.currentState,
			title: '',
			subTitle: '',
			headerIcon: null,
			isLoading: true,
		};
	}

	componentDidMount() {
		this.checkAppState();
		this.checkEmailVerified();
		this.fetchData();
	}

	fetchData() {
		fetch(
			'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_screens?slug=email-verification',
		)
			.then(response => response.json())
			.then(json => {
				const data = json[0].acf;

				console.log(data);

				this.setState({
					title: data.screen_title,
					subTitle: data.screen_subtitle,
					headerIcon: data.screen_header_icon,
					isLoading: false,
				});
			})
			.catch(error => console.log(error));
	}

	checkAppState() {
		this.appStateSubscription = AppState.addEventListener(
			'change',
			nextAppState => {
				if (
					this.state.appState.match(/inactive|background/) &&
					nextAppState === 'active'
				) {
					console.log('App has come to the foreground!');
					this.checkEmailVerified();
				}
				this.setState({appState: nextAppState});
			},
		);
	}

	componentWillUnmount() {
		this.appStateSubscription.remove();
	}

	checkEmailVerified() {
		const user = auth().currentUser;
		const {navigation} = this.props;
		let emailVerified = user.emailVerified;

		if (user) {
			user.reload().then(() => {
				emailVerified = user.emailVerified;
				console.log(user.emailVerified);

				if (emailVerified) {
					navigation.navigate('DashboardScreen');
				} else {
					console.log('Email hasnt been verified');
				}
			});
		}
	}

	reSendVerificationEmail() {
		auth()
			.currentUser.sendEmailVerification()
			.then(() => {
				console.log('Verification email sent');
				this.setState({reSendVerificationEmail: true});
			})
			.catch(error => console.log(error.message));
	}

	render() {
		const {title, subTitle, headerIcon} = this.state;
		const user = auth().currentUser;

		return (
			<View style={baseStyles.flexContainer}>
				<Text style={[typography.pageHeading, spacing.marginBottom20]}>
					{title}
				</Text>

				<Image
					source={{uri: headerIcon}}
					style={[baseStyles.headerIcon, spacing.marginBottom20]}
				/>

				<Text style={[typography.subHeading, spacing.marginBottom20]}>
					Hey {user.displayName}.
				</Text>

				<Text style={[typography.subHeading, spacing.marginBottom20]}>
					{subTitle}
				</Text>

				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => openInbox()}
					style={baseStyles.buttonContainer}>
					<Text style={typography.buttonText}>Verify Email</Text>
				</TouchableOpacity>

				<Text
					style={form.inputText}
					onPress={() => this.reSendVerificationEmail()}>
					Not received an email?
					<Text style={form.inputTextSpan}> Click here to re-send</Text>
				</Text>
			</View>
		);
	}
}

export default EmailVerification;
