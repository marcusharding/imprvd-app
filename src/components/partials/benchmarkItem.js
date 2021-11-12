// React
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

// Styles
import {ImprvdCarousel} from '../../styles/main';

const BenchmarkItem = ({item}) => {
	const object = item[1];
	const data = Object.entries(object);
	const nameIndex = data.findIndex(benchmark => benchmark[0] === 'name');
	data.splice(0, 0, data.splice(nameIndex, 1)[0]);

	return (
		<TouchableHighlight>
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
		</TouchableHighlight>
	);
};

export default BenchmarkItem;
