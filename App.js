// React
import React, {useState, useEffect} from 'react';
import {View, Button, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import BackgroundColor from 'react-native-background-color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import {appTheme} from './src/styles/main';

// Firebase
import auth from '@react-native-firebase/auth';

// Partials
import PreLoader from './src/components/partials/preLoader';

// Screens
import Welcome from './src/components/screens/welcome';
import SignUp from './src/components/screens/signup';
import Dashboard from './src/components/screens/dashboard';
import Login from './src/components/screens/login';
import EmailVerification from './src/components/screens/emailVerification';
import Benchmarks from './src/components/screens/benchmarks';
import Workouts from './src/components/screens/workouts';
import Profile from './src/components/screens/profile';

// Navigators
const Tab = createMaterialBottomTabNavigator();
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
		<Tab.Navigator
			initialRouteName="Dashboard"
			activeColor="#34FFC8"
			inactiveColor="#FFFFFF"
			barStyle={{backgroundColor: '#121212'}}>
			<Tab.Screen
				name="Dashboard"
				options={{
					tabBarLabel: 'Dashboard',
					tabBarIcon: ({color}) => (
						<MaterialCommunityIcons name="home" color={color} size={26} />
					),
				}}>
				{props => <Dashboard {...props} />}
			</Tab.Screen>
			<Tab.Screen
				name="Benchmarks"
				component={Benchmarks}
				options={{
					tabBarLabel: 'Benchmarks',
					tabBarIcon: ({color}) => (
						<MaterialCommunityIcons name="poll" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Workouts"
				component={Workouts}
				options={{
					tabBarLabel: 'Workouts',
					tabBarIcon: ({color}) => (
						<MaterialCommunityIcons
							name="weight-lifter"
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({color}) => (
						<MaterialCommunityIcons name="account" color={color} size={26} />
					),
				}}
			/>
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
					<Stack.Screen name="DashboardScreen">
						{props => <TabStack {...props} />}
					</Stack.Screen>
					<Stack.Screen name="logout" component={logoutScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}

	return (
		<NavigationContainer options={{headerShown: false}} theme={appTheme}>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="WelcomeScreen" component={Welcome} />
				<Stack.Screen name="SignupScreen" component={SignUp} />
				<Stack.Screen name="LoginScreen" component={Login} />
				<Stack.Screen
					name="EmailVerificationScreen"
					component={EmailVerification}
				/>
				<Stack.Screen
					name="DashboardScreen"
					component={Dashboard}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
