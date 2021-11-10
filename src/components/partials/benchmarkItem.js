// React
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

// Styles
import {ImprvdCarousel} from '../../styles/main';

const BenchmarkItem = ({item}) => {
	const object = item[1];
	const keys = Object.keys(object);
	const values = Object.values(object);

	return (
		<TouchableHighlight>
			<View style={ImprvdCarousel.benchmarkItem}>
				{keys.map((key, index) => {
					if (key === 'category') {
						return;
					}

					return (
						<Text>
							{key} {values[index]}
						</Text>
					);
				})}
			</View>
		</TouchableHighlight>
	);
};

export default BenchmarkItem;
