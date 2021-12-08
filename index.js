/**
 * @format
 */
// React
import * as React from 'react';
import {AppRegistry, SafeAreaView} from 'react-native';
import {name as appName} from './app.json';

// Screens
import App from './App';

// Styles
import {baseStyles} from './src/styles/main';

const Index = () => {
	return (
		<SafeAreaView style={baseStyles.safeAreaView}>
			<App />
		</SafeAreaView>
	);
};

AppRegistry.registerComponent(appName, () => Index);
