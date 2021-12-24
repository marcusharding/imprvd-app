// React
import React, {useState} from 'react';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {form, baseStyles, typography, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

// Scripts
import {addNewBenchmark} from '../../scripts/benchmarks';

const AddNewBenchmarkFields = ({
	selectedBenchmark,
	benchmarkFields,
	navigation,
}) => {
	const [fieldValues, setFieldValues] = useState({});

	const updateInputValue = (value, fieldSlug, benchmark) => {
		setFieldValues({
			...fieldValues,
			[fieldSlug]: value,
			category: benchmark,
		});
	};

	const _addNewBenchmark = async () => {
		const response = await addNewBenchmark(fieldValues, selectedBenchmark);

		if (response) {
			CommonActions.reset({
				index: 1,
				routes: [{name: 'Benchmarks'}],
			});
			navigation.dispatch(
				CommonActions.navigate({
					name: 'Benchmarks',
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
					updateInputValue(value, field.slug, selectedBenchmark);
				}}
				placeholderTextColor="#EFEFEF"
			/>
		);
	});

	if (!selectedBenchmark) {
		return null;
	}

	if (selectedBenchmark && !benchmarkFields) {
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
