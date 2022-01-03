// React
import React from 'react';
import {View, Text} from 'react-native';

// Partials
import ProfileIcon from '../partials/profileIcon';

// Styles
import {baseStyles, typography, spacing} from '../../styles/main';

const Social = () => {
	return (
		<View style={spacing.flex1}>
			<ProfileIcon />

			<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
				Social
			</Text>

			<View style={baseStyles.flexCenter}>
				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Coming soon
				</Text>
			</View>
		</View>
	);
};

export default Social;
