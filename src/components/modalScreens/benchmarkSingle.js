// React
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Styles
import {baseStyles, profile, typography, spacing} from '../../styles/main';

// Partials
import GoBackIcon from '../partials/goBackIcon';

// Scripts
import {deleteBenchmark} from '../../scripts/benchmarks';

const BenchmarkSingle = ({route}) => {
	const {object, data, category, slug} = route.params;
	const navigation = useNavigation();

	const _deleteBenchmark = async () => {
		const response = await deleteBenchmark(object, slug);

		if (response) {
			CommonActions.reset({
				index: 1,
				routes: [{name: 'Benchmarks'}],
			});
			navigation.dispatch(
				CommonActions.navigate({
					name: 'Benchmarks',
					params: {
						refreshBencharks: true,
					},
				}),
			);
		}
	};

	return (
		<View>
			<View style={profile.header}>
				<GoBackIcon />
				<TouchableOpacity
					style={spacing.marginTop10}
					activeOpacity={0.8}
					onPress={() =>
						navigation.dispatch(
							CommonActions.navigate({
								name: 'UpdateBenchmarkSingleScreen',
								params: {
									category: category,
									object: object,
									data: data,
									slug: slug,
								},
							}),
						)
					}>
					<Text style={typography.subHeading}>Update Benchmark</Text>
				</TouchableOpacity>
			</View>
			<View style={[baseStyles.heightFull, spacing.marginTop50]}>
				{data.map(benchmark => {
					if (benchmark[0] === 'name') {
						return (
							<Text
								key={benchmark[0]}
								style={[typography.pageHeading, baseStyles.screenHeading]}>
								{benchmark[1]}
							</Text>
						);
					}

					return (
						<View key={benchmark[0]} style={baseStyles.flexContainerRow}>
							<Text>{benchmark[0]}:</Text>
							<Text>{benchmark[1]}</Text>
						</View>
					);
				})}

				<TouchableOpacity
					style={baseStyles.flexContainer}
					activeOpacity={0.8}
					onPress={() => _deleteBenchmark()}>
					<Text style={{color: '#FF0000', fontSize: 20}}>
						Delete this benchmark
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default BenchmarkSingle;
