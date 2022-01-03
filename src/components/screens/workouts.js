// React
import React from 'react';
import {View, Text} from 'react-native';

// Styles
import {typography, baseStyles, spacing} from '../../styles/main';

// Partials
import ProfileIcon from '../partials/profileIcon';

const Workouts = () => {
	return (
		<View style={spacing.flex1}>
			<ProfileIcon />

			<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
				Workouts
			</Text>

			<View style={baseStyles.flexCenter}>
				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Coming soon
				</Text>
			</View>
		</View>
	);
};

export default Workouts;
