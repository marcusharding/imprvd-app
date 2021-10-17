// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Styles
import {typography, baseStyles} from '../../styles/main';

class Profile extends Component {
	constructor(props) {
		super();

		this.state = {};
	}

	render() {
		return (
			<View>
				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Profile
				</Text>
			</View>
		);
	}
}

export default Profile;
