// React
import React from 'react';
import {TextInput} from 'react-native';

// Styles
import {baseStyles, form} from '../../styles/main';

const addNewBenchmarkField = ({fieldName}) => {
	return (
		<TextInput
			style={form.input}
			placeholder="Name"
			value={fieldName}
			// onChangeText={value => this.updateInputValue(value, 'displayName')}
			placeholderTextColor="#EFEFEF"
		/>
	);
};

export default addNewBenchmarkField;
