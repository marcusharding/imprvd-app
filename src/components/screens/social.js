// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Partials
import ProfileIcon from '../partials/profileIcon';

// Styles
import {baseStyles, typography} from '../../styles/main';

class Social extends Component {
	render() {
		const {navigation, profileImagePath} = this.props;
		return (
			<View>
				<ProfileIcon navigation={navigation} imagePath={profileImagePath} />

				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Social
				</Text>
			</View>
		);
	}
}

export default Social;
