// dashboard.js

// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Partials
import ProfileIcon from '../partials/profileIcon';

// Styles
import {baseStyles, typography} from '../../styles/main';

class Dashboard extends Component {
	render() {
		return (
			<View>
				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Dashboard
				</Text>

				<ProfileIcon navigation={this.props.navigation} />
			</View>
		);
	}
}

export default Dashboard;
