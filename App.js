// React
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Firebase
import auth from '@react-native-firebase/auth';

// Styles
import {appTheme} from './src/styles/main';

//Screens
import TestScreen from './testScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="TestScreen" component={TestScreen} />
		</Tab.Navigator>
	);
};

const App = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	const onAuthStateChanged = user => {
		setUser(user);
		if (initializing) {
			setInitializing(false);
		}
	};

	useEffect(() => {
		SplashScreen.hide();
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	});

	if (initializing) {
		return null;
	}

	if (!user) {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{headerShown: false}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}

	return (
		<SafeAreaView style={appTheme}>
			<StatusBar />
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<View>
					<Text>Welcome {user.email}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default App;
