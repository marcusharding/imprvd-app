// React
import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import {baseStyles} from '../../styles/main';

const GoBackIcon = ({navigation}) => {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={() => this.chooseFile()}>
			<MaterialCommunityIcons
				name={'close'}
				size={35}
				onPress={() => navigation.goBack()}
			/>
		</TouchableOpacity>
	);
};

export default GoBackIcon;
