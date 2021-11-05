// React
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

// Styles
import {ImprvdCarousel} from '../../styles/main';

const BenchmarkItem = ({title}) => {
	return (
		<TouchableHighlight>
			<View style={ImprvdCarousel.benchmarkItem}>
				<Text>{title}</Text>
			</View>
		</TouchableHighlight>
	);
};

export default BenchmarkItem;
