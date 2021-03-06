// React
import React, {useEffect, useState} from 'react';
import {
	Text,
	View,
	AppState,
	Image,
	TouchableOpacity,
	Alert,
} from 'react-native';
import {openInbox} from 'react-native-email-link';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Firebase
import auth from '@react-native-firebase/auth';

// Partials
import PreLoader from '../partials/preLoader';

// Styles
import {baseStyles, typography, form, spacing} from '../../styles/main';

const EmailVerification = () => {
	let user = auth().currentUser;
	const [appState, setAppstate] = useState(AppState.currentState);
	const [isLoading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');
	const [headerIcon, setHeaderIcon] = useState(null);
	const [resendVerification, setResendVerification] = useState(false);
	const navigation = useNavigation();

	const fetchScreenData = () => {
		fetch(
			'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_screens?slug=email-verification',
		)
			.then(response => response.json())
			.then(json => {
				const data = json[0].acf;

				setTitle(data.screen_title);
				setSubTitle(data.screen_subtitle);
				setHeaderIcon(data.screen_header_icon);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
				Alert.alert('Error:', error.message);
				setLoading(false);
			});
	};

	const checkEmailVerified = async () => {
		await user.reload();
		user = await auth().currentUser;
		if (user.emailVerified === true) {
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
			console.log('Email hasnt been verified');
		}
	};

	const reSendVerificationEmail = () => {
		auth()
			.currentUser.sendEmailVerification()
			.then(() => {
				console.log('Verification email sent');
				setResendVerification(true);
			})
			.catch(error => {
				console.log(error.message);
				Alert.alert('Error:', error.message);
			});
	};

	const handleAppStateChange = state => {
		setAppstate(state);
	};

	useEffect(() => {
		const unsubscribe = AppState.addEventListener(
			'change',
			handleAppStateChange,
		);
		return () => unsubscribe;
	}, []);

	useEffect(() => {
		fetchScreenData();
		checkEmailVerified();
	});

	if (isLoading) {
		return <PreLoader />;
	}

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

			<Text style={form.inputText} onPress={() => reSendVerificationEmail()}>
				Not received an email?
				<Text style={form.inputTextSpan}> Click here to re-send</Text>
			</Text>
		</View>
	);
};

export default EmailVerification;
