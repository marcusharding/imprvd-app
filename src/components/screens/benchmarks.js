// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Styles
import {typography, baseStyles} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';

class Benchmarks extends Component {
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
					Benchmarks
				</Text>
			</View>
		);
	}
}

export default Benchmarks;
