// React
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Styles
import {baseStyles, spacing, typography} from '../../styles/main';

// Partials
import GoBackIcon from '../partials/goBackIcon';

// Scripts
import {deleteBenchmark} from '../../scripts/benchmarks';

const BenchmarkSingle = ({route}) => {
	const data = route.params.data;
	const object = route.params.object;
	const slug = route.params.slug;
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
			<GoBackIcon />
			<View style={baseStyles.heightFull}>
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
					activeOpacity={0.8}
					onPress={() => _deleteBenchmark()}
					style={[baseStyles.buttonContainer, spacing.marginTop20]}>
					<Text style={typography.buttonText}>Delete Benchmark</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default BenchmarkSingle;
