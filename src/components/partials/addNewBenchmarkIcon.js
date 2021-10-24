// React
import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import {baseStyles} from '../../styles/main';

const AddNewBenchmarkIcon = ({navigation}) => {
	return (
		<TouchableOpacity
			style={baseStyles.addNewBenchmarkIcon}
			activeOpacity={0.8}
			onPress={() => navigation.navigate('AddNewBenchmarkScreen')}>
			<MaterialCommunityIcons
				name={'plus-circle'}
				color={'#34FFC8'}
				size={50}
			/>
		</TouchableOpacity>
	);
};

export default AddNewBenchmarkIcon;
