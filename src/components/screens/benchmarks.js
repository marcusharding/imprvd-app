// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Styles
import {typography, baseStyles, spacing} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';
import AddNewBenchmarkIcon from '../partials/addNewBenchmarkIcon';

class Benchmarks extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const {navigation, profileImagePath} = this.props;
		const {benchmarksList} = this.state;

		console.log(benchmarksList);
		return (
			<View style={spacing.flex1}>
				<View style={spacing.flex1}>
					<ProfileIcon navigation={navigation} imagePath={profileImagePath} />

					<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
						Benchmarks
					</Text>
				</View>

				<AddNewBenchmarkIcon navigation={navigation} />
			</View>
		);
	}
}

export default Benchmarks;
