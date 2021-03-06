// React
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

// Styles
import {typography, baseStyles, spacing} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';
import AddNewBenchmarkIcon from '../partials/addNewBenchmarkIcon';
import PreLoader from '../partials/preLoader';
import ImprvdCarousel from '../partials/imprvdCarousel';

// Scripts
import {fetchBenchmarksList} from '../../scripts/benchmarks';

const Benchmarks = ({route}) => {
	const [isLoading, setLoading] = useState(false);
	const [benchmarksList, setBenchmarksList] = useState([]);
	const {params} = route;
	const navigation = useNavigation();
	let sections = null;

	const _getBenchmarksList = async () => {
		setLoading(true);
		const list = await fetchBenchmarksList(
			'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_benchmarks',
		);

		if (list) {
			setLoading(false);
			setBenchmarksList(list);
		}
	};

	useEffect(() => {
		_getBenchmarksList();
		navigation.addListener('focus', () => {
			if (params && params.refreshBencharks) {
				_getBenchmarksList();
				navigation.setParams({
					refreshBencharks: false,
				});
			}
		});
		return () =>
			navigation.removeListener('focus', () => {
				_getBenchmarksList();
			});
	}, [navigation, params]);

	if (benchmarksList.length > 0) {
		sections = benchmarksList.map(item => {
			return (
				<ImprvdCarousel
					key={item.label}
					label={item.label}
					category={item.value}
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
				<ProfileIcon />

				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Benchmarks
				</Text>

				<ScrollView showsVerticalScrollIndicator={false} style={spacing.flex1}>
					{!isLoading && sections}
				</ScrollView>

				{!isLoading && <AddNewBenchmarkIcon />}
			</View>
		</View>
	);
};

export default Benchmarks;
