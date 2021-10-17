// React
import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

// Styles
import {baseStyles} from '../../styles/main';

class PreLoader extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<View style={baseStyles.flexContainer}>
				<ActivityIndicator size="large" color="#34FFC8" />
			</View>
		);
	}
}

export default PreLoader;
