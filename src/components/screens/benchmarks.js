// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

// Styles
import {typography, baseStyles, spacing} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';
import AddNewBenchmarkIcon from '../partials/addNewBenchmarkIcon';
import PreLoader from '../partials/preLoader';
import ImprvdCarousel from '../partials/imprvdCarousel';

class Benchmarks extends Component {
	constructor() {
		super();

		this.state = {
			benchmarksList: [],
			isLoading: true,
			index: 0,
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

	componentDidMount() {
		this.fetchBenchmarksList();
	}

	render() {
		const {navigation, profileImagePath} = this.props;
		const {isLoading, benchmarksList} = this.state;
		let sections = null;

		sections = benchmarksList.map(item => {
			return (
				<ImprvdCarousel
					key={item.label}
					label={item.label}
					navigation={navigation}
					category={item.slug}
				/>
			);
		});

		return (
			<View style={spacing.flex1}>
				<View style={spacing.flex1}>
					<ProfileIcon navigation={navigation} imagePath={profileImagePath} />

					<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
						Benchmarks
					</Text>

					{isLoading && <PreLoader />}

					<ScrollView
						showsVerticalScrollIndicator={false}
						style={spacing.flex1}>
						{!isLoading && sections}
					</ScrollView>

					{!isLoading && <AddNewBenchmarkIcon navigation={navigation} />}
				</View>
			</View>
		);
	}
}

export default Benchmarks;
