// React
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Styles
import {ImprvdCarousel} from '../../styles/main';

// Scripts
import {getFormattedBenchmarkItem} from '../../scripts/benchmarks';

const BenchmarkItem = ({item}) => {
	const formattedItem = getFormattedBenchmarkItem(item);
	const navigation = useNavigation();

	const onPressItem = () => {
		navigation.dispatch(
			CommonActions.navigate({
				name: 'BenchmarkSingleScreen',
				params: {
					object: formattedItem.object,
					data: formattedItem.data,
					slug: formattedItem.slug,
				},
			}),
		);
	};

	return (
		<TouchableOpacity onPress={() => onPressItem()}>
			<View style={ImprvdCarousel.benchmarkItem}>
				{formattedItem.data.map(benchmark => {
					if (benchmark[0] === 'name') {
						return (
							<Text style={ImprvdCarousel.benchmarkTextName} key={benchmark[1]}>
								{benchmark[1]}
							</Text>
						);
					}

					return (
						<View key={benchmark[0]} style={ImprvdCarousel.benchmarkTextGroup}>
							<Text style={ImprvdCarousel.benchmarkTextKey}>
								{benchmark[0]}:
							</Text>
							<Text>{benchmark[1]}</Text>
						</View>
					);
				})}
			</View>
		</TouchableOpacity>
	);
};

export default BenchmarkItem;
