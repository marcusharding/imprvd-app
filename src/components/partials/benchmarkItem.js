// React
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

// Styles
import {ImprvdCarousel} from '../../styles/main';

const BenchmarkItem = ({item}) => {
	const object = item[1];
	// Is there a way I can spit out the key values infront of the value but also doing so without having to
	// directly specify the name with dot notation
	return (
		<TouchableHighlight>
			<View style={ImprvdCarousel.benchmarkItem}>
				<Text>{object['name']}</Text>

				{object['starting-max-reps'] && (
					<Text>{object['starting-max-reps']}</Text>
				)}

				{object['current-max-reps'] && (
					<Text>{object['current-max-reps']}</Text>
				)}

				{object['best-max-reps'] && <Text>{object['best-max-reps']}</Text>}
			</View>
		</TouchableHighlight>
	);
};

export default BenchmarkItem;
