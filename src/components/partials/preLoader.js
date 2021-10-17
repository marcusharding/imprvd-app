// React
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

// Styles
import {baseStyles} from '../../styles/main';

const PreLoader = () => {
	return (
		<View style={baseStyles.flexContainer}>
			<ActivityIndicator size="large" color="#34FFC8" />
		</View>
	);
};

export default PreLoader;
