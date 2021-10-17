// dashboard.js

// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Partials

// Styles
import {baseStyles, typography} from '../../styles/main';

class Dashboard extends Component {
	render() {
		return (
			<View>
				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Dashboard
				</Text>
			</View>
		);
	}
}

export default Dashboard;
