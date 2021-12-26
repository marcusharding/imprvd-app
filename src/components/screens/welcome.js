// React
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Styles
import {baseStyles, typography, form, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

const Welcome = () => {
	const [isLoading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');
	const navigation = useNavigation();

	const fetchScreenData = () => {
		setLoading(true);
		fetch(
			'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_screens?slug=welcome',
		)
			.then(response => response.json())
			.then(json => {
				const data = json[0].acf;

				setTitle(data.screen_title);
				setSubTitle(data.screen_subtitle);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
				Alert.alert('Error:', error.message);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchScreenData();
	}, []);

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<View style={baseStyles.flexContainer}>
			<Text style={[typography.pageHeading, spacing.marginBottom20]}>
				{title}
			</Text>

			<Text style={[typography.subHeading, spacing.marginBottom20]}>
				{subTitle}
			</Text>

			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() =>
					navigation.dispatch(
						CommonActions.navigate({
							name: 'SignupScreen',
						}),
					)
				}
				style={baseStyles.buttonContainer}>
				<Text style={typography.buttonText}>Sign Up</Text>
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

export default Welcome;
