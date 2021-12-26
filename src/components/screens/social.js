// React
import React from 'react';
import {View, Text} from 'react-native';

// Partials
import ProfileIcon from '../partials/profileIcon';

// Styles
import {baseStyles, typography} from '../../styles/main';

const Social = () => {
	return (
		<View>
			<ProfileIcon />

			<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
				Social
			</Text>
		</View>
	);
};

export default Social;
