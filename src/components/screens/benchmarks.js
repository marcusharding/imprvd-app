// React
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

// Styles
import {typography, baseStyles, spacing} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';
import AddNewBenchmarkIcon from '../partials/addNewBenchmarkIcon';
import PreLoader from '../partials/preLoader';
import ImprvdCarousel from '../partials/imprvdCarousel';

const Benchmarks = ({navigation}) => {
	const [isLoading, setLoading] = useState(false);
	const [benchmarksList, setBenchmarksList] = useState([]);
	let sections = null;

	const fetchBenchmarksList = useCallback(async () => {
		setLoading(true);
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
				setBenchmarksList(benchmarksList);
				setLoading(false);
			}
		});
	}, [benchmarksList]);

	useEffect(() => {
		fetchBenchmarksList();
	}, [fetchBenchmarksList]);

	if (benchmarksList.length > 0) {
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
	}

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<View style={spacing.flex1}>
			<View style={spacing.flex1}>
				<ProfileIcon navigation={navigation} />

				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Benchmarks
				</Text>

				<ScrollView showsVerticalScrollIndicator={false} style={spacing.flex1}>
					{!isLoading && sections}
				</ScrollView>

				{!isLoading && <AddNewBenchmarkIcon navigation={navigation} />}
			</View>
		</View>
	);
};

export default Benchmarks;
