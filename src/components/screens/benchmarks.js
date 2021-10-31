// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Styles
import {typography, baseStyles, spacing} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';
import AddNewBenchmarkIcon from '../partials/addNewBenchmarkIcon';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class Benchmarks extends Component {
	constructor() {
		super();

		this.state = {};
	}

	fetchBenchmarks() {
		const {uid} = auth().currentUser;
		const collection = `user-${uid}`;

		firestore()
			.collection(collection)
			.get()
			.then(querySnapshot => {
				console.log(querySnapshot);
				querySnapshot.forEach(documentSnapshot => {
					console.log('Benchmark => ', documentSnapshot.data());
					console.log('BREAK -----------------');
				});
			});
	}

	componentDidMount() {
		this.fetchBenchmarks();
	}

	render() {
		const {navigation, profileImagePath} = this.props;
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
