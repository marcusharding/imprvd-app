/**
 * @format
 * @flow strict-local
 */

// React
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// Styles
import {appTheme} from './src/styles/main';

const App = () => {
	React.useEffect(() => {
		SplashScreen.hide();
	});
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
