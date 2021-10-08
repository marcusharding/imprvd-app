import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';

function HomeScreen() {
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Home!</Text>
		</View>
	);
}

function SettingsScreen() {
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Settings!</Text>
		</View>
	);
}

function Home() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Feed" component={SettingsScreen} />
			<Tab.Screen name="Messages" component={HomeScreen} />
		</Tab.Navigator>
	);
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

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
		<View>
			<Text>Welcome {user.email}</Text>
		</View>
	);
}
