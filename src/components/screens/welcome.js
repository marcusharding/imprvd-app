// React
import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {baseStyles, typography, form, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

class Welcome extends Component {
	constructor() {
		super();

		this.state = {
			title: '',
			subTitle: '',
			isLoading: true,
		};
	}

	fetchData = () => {
		fetch(
			'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_screens?slug=welcome',
		)
			.then(response => response.json())
			.then(json => {
				const data = json[0].acf;

				this.setState({
					title: data.screen_title,
					subTitle: data.screen_subtitle,
					isLoading: false,
				});
			})
			.catch(error => console.log(error));
	};

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const {isLoading, title, subTitle} = this.state;
		const {navigation} = this.props;

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
	}
}

export default Welcome;
