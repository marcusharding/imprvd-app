// dashboard.js

// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Partials
import ProfileIcon from '../partials/profileIcon';

// Styles
import {baseStyles, typography} from '../../styles/main';

class Dashboard extends Component {
	constructor(props) {
		super();

		this.state = {};
	}

	render() {
		const {navigation} = this.props;
		return (
			<View>
				<ProfileIcon navigation={navigation} />

				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Dashboard
				</Text>
			</View>
		);
	}
}

export default Dashboard;
