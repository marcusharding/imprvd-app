// React
import React from 'react';
import {View, Text} from 'react-native';

// Styles
import {typography, baseStyles} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';

const Workouts = () => {
	return (
		<View>
			<ProfileIcon />

			<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
				Workouts
			</Text>
		</View>
	);
};

export default Workouts;
