// React
import React, {useState, useEffect} from 'react';
import {Text, View, Button, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import BackgroundColor from 'react-native-background-color';

// Styles
import {appTheme} from './src/styles/main';

// Firebase
import auth from '@react-native-firebase/auth';

// Partials
import PreLoader from './src/components/partials/preLoader';

// Screens
import SignUp from './src/components/screens/signup';
import Dashboard from './src/components/screens/dashboard';
import Login from './src/components/screens/login';
import EmailVerification from './src/components/screens/emailVerification';

// Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Temprorary logout screen whilst I re-do the sign up process
const logoutScreen = () => {
	return (
		<View>
			<Button
				color="#121212"
				title="Log out"
				onPress={() =>
					auth()
						.signOut()
						.then(() => console.log('User signed out'))
				}
			/>
		</View>
	);
};

// Bottom tabs stack
const TabStack = () => {
	return (
		<Tab.Navigator>
			{/* <Tab.Screen name="Feed" component={SettingsScreen} /> */}
		</Tab.Navigator>
	);
};

export default function App() {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		if (Platform.OS === 'android') {
			BackgroundColor.setColor('#121212');
		}
		SplashScreen.hide();
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	});

	if (initializing) {
		return <PreLoader />;
	}

	if (user && auth().currentUser.emailVerified) {
		return (
			<NavigationContainer options={{headerShown: false}} theme={appTheme}>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					{/* <Stack.Screen
						name="Dashboard"
						component={Dashboard}
						options={{headerShown: false}}
					/> */}
					<Stack.Screen name="logout" component={logoutScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}

	return (
		<NavigationContainer options={{headerShown: false}} theme={appTheme}>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Signup" component={SignUp} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="EmailVerification" component={EmailVerification} />
				<Stack.Screen
					name="Dashboard"
					component={Dashboard}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
