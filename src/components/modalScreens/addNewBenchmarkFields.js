// React
import React, {useState} from 'react';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Styles
import {form, baseStyles, typography, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

// Scripts
import {addNewBenchmark} from '../../scripts/benchmarks';
import {slugifyString} from '../../scripts/helpers';

const AddNewBenchmarkFields = ({selectedCategory, benchmarkFields}) => {
	const [fieldValues, setFieldValues] = useState({});
	const navigation = useNavigation();

	const updateInputValue = (value, fieldSlug) => {
		setFieldValues({
			...fieldValues,
			[fieldSlug]: value,
		});
	};

	const _addNewBenchmark = async () => {
		const slug = slugifyString(fieldValues.name);
		const response = await addNewBenchmark(fieldValues, selectedCategory, slug);

		if (response) {
			CommonActions.reset({
				index: 1,
				routes: [{name: 'Benchmarks'}],
			});
			navigation.dispatch(
				CommonActions.navigate({
					name: 'Benchmarks',
					params: {
						refreshBencharks: true,
					},
				}),
			);
		}
	};

	const fields = benchmarkFields.map(field => {
		return (
			<TextInput
				key={field.slug}
				style={form.input}
				placeholder={field.name}
				value={fieldValues[field.slug]}
				onChangeText={value => {
					updateInputValue(value, field.slug);
				}}
				placeholderTextColor="#EFEFEF"
			/>
		);
	});

	if (!selectedCategory) {
		return null;
	}

	if (selectedCategory && !benchmarkFields) {
		return (
			<View style={baseStyles.flexCenter}>
				<PreLoader />
			</View>
		);
	}

	return (
		<View>
			{fields}
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => _addNewBenchmark()}
				style={[baseStyles.buttonContainer, spacing.marginTop20]}>
				<Text style={typography.buttonText}>Add Benchmark</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddNewBenchmarkFields;
