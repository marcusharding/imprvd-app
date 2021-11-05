// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Styles
import {typography, baseStyles, spacing} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';
import AddNewBenchmarkIcon from '../partials/addNewBenchmarkIcon';
import PreLoader from '../partials/preLoader';
import ImprvdCarousel from '../partials/imprvdCarousel';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

class Benchmarks extends Component {
	constructor() {
		super();

		this.state = {
			benchmarksList: [],
			isLoading: true,
			index: 0,
			fakeData: [{title: 'poo'}, {title: 'yooooo'}],
		};
	}

	fetchBenchmarksList = async () => {
		const {benchmarksList} = this.state;
		let counter = 0;

		const response = await fetch(
			'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_benchmarks',
		);
		const json = await response.json();
		const count = json.length;
		json.map(benchmark => {
			benchmarksList.push({
				slug: benchmark.slug,
				label: benchmark.title.rendered,
			});
			counter = counter + 1;
			if (counter === count) {
				this.setState({
					benchmarksList: benchmarksList,
					isLoading: false,
				});
			}
		});
	};

	// TO DO - Refactor this fetch so its called by the benchmarkLists map down below
	// It should be a query for the current benchmark category thats within the loop and then massage the data
	// As ive currently started to do
	fetchBenchmarksData() {
		const {uid} = auth().currentUser;
		const collection = `user-${uid}`;

		firestore()
			.collection(collection)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(documentSnapshot => {
					const data = Object.entries(documentSnapshot.data());
					data.map(item => {
						console.log(item[1].category);
						console.log('BREAK -----------------');
					});
				});
			});
	}

	componentDidMount() {
		this.fetchBenchmarksList();
		this.fetchBenchmarksData();
	}

	render() {
		const {navigation, profileImagePath} = this.props;
		const {isLoading, benchmarksList, fakeData} = this.state;
		let sections = null;

		sections = benchmarksList.map(item => {
			return (
				<View key={item.label}>
					<Text style={typography.benchmarkHeading}>{item.label}</Text>
					<ImprvdCarousel fakeData={fakeData} />
				</View>
			);
		});

		return (
			<View style={spacing.flex1}>
				<View style={spacing.flex1}>
					<ProfileIcon navigation={navigation} imagePath={profileImagePath} />

					<ScrollView style={spacing.flex1}>
						<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
							Benchmarks
						</Text>

						{isLoading && <PreLoader />}

						{!isLoading && sections}

						{!isLoading && <AddNewBenchmarkIcon navigation={navigation} />}
					</ScrollView>
				</View>
			</View>
		);
	}
}

export default Benchmarks;
