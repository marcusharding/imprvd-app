// React
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

// Styles
import {spacing} from '../../styles/main';

// Partials
import ImprvdCarousel from '../partials/imprvdCarousel';
import PreLoader from './preLoader';

// Scripts
import {getMostRecentBenchmarks} from '../../scripts/benchmarks';

const RecentBenchmarks = () => {
	const [isLoading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const _getMostRecentBenchmarks = async () => {
		setLoading(true);
		const response = await getMostRecentBenchmarks(5);

		if (response) {
			setData(response);
			setLoading(false);
		}
	};

	useEffect(() => {
		_getMostRecentBenchmarks();
	}, []);

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<View style={spacing.flex1}>
			<View style={spacing.flex1}>
				<ImprvdCarousel
					key={'recent-benchmarks'}
					data={data}
					label={'Recent Benchmarks'}
				/>
			</View>
		</View>
	);
};

export default RecentBenchmarks;
