// dashboard.js

// React
import {Component} from 'react';
import {View, Text} from 'react-native';
import * as React from 'react';

// Partials

// Styles
import {typography} from '../../styles/main';

class Dashboard extends Component {
	render() {
		return (
			<View>
				<Text style={typography.pageHeading}>Dashboard</Text>
			</View>
		);
	}
}

export default Dashboard;
