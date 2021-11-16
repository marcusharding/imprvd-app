// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Styles
import {typography, baseStyles} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';

class Workouts extends Component {
	constructor(props) {
		super();

		this.state = {};
	}

	render() {
		const {navigation, profileImagePath} = this.props;
		return (
			<View>
				<ProfileIcon navigation={navigation} imagePath={profileImagePath} />

				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Workouts
				</Text>
			</View>
		);
	}
}

export default Workouts;
