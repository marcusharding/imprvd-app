/**
 * @format
 * @flow strict-local
 */

// React
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';

// Styles
import {appTheme} from './src/styles/main';

const App = () => {
	return (
		<SafeAreaView style={appTheme}>
			<StatusBar />
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<View>
					<Text>This is the app rebuild</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default App;
