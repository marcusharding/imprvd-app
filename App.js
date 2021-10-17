// React
import React, {useState, useEffect} from 'react';
import {View, Button, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import BackgroundColor from 'react-native-background-color';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
		<Tab.Navigator
			screenOptions={({route}) => ({
				tabBarIcon: ({color, size}) => {
					let iconName;

					if (route.name === 'Dashboard') {
						iconName = 'md-home';
					} else if (route.name === 'Benchmarks') {
						iconName = 'stats-chart';
					} else if (route.name === 'Workouts') {
						iconName = 'ios-contacts';
					} else if (route.name === 'Profile') {
						iconName = 'ios-contact';
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				headerShown: false,
				tabBarActiveTintColor: '#34FFC8',
				tabBarInactiveTintColor: 'white',
				style: {
					backgroundColor: '#121212',
					borderTopColor: 'transparent',
					paddingBottom: Platform.OS === 'android' ? 15 : 35,
				},
			})}>
			<Tab.Screen name="Dashboard">
				{props => <Dashboard {...props} />}
			</Tab.Screen>
			<Tab.Screen name="Benchmarks" component={Benchmarks} />
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
