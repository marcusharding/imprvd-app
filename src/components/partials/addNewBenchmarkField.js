// React
import React, {useState} from 'react';
import {TextInput} from 'react-native';

// Styles
import {form} from '../../styles/main';

const AddNewBenchmarkField = ({
	fieldName,
	fieldSlug,
	setFieldInputValue,
	index,
}) => {
	const [value, setValue] = useState(fieldName);
	return (
		<TextInput
			style={form.input}
			placeholder={fieldName}
			value={value}
			onChangeText={text => {
				setFieldInputValue(text, fieldSlug, index);
				setValue(text);
			}}
			placeholderTextColor="#EFEFEF"
		/>
	);
};

export default AddNewBenchmarkField;
