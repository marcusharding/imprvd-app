// React
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Styles
import {ImprvdCarousel} from '../../styles/main';

const BenchmarkItem = ({item, navigation}) => {
	const slug = item[0];
	const object = item[1];
	let data = Object.entries(object);
	const nameIndex = data.findIndex(benchmark => benchmark[0] === 'name');
	data.splice(0, 0, data.splice(nameIndex, 1)[0]);

	const onPressItem = () => {
		navigation.navigate('BenchmarkSingleScreen', {
			object: object,
			data: data,
			slug: slug,
		});
	};

	return (
		<TouchableOpacity onPress={() => onPressItem()}>
			<View style={ImprvdCarousel.benchmarkItem}>
				{data.map(benchmark => {
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
