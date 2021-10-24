// React
import React from 'react';
import {TextInput} from 'react-native';

// Styles
import {form} from '../../styles/main';

const AddNewBenchmarkField = ({fieldName}) => {
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

export default AddNewBenchmarkField;
