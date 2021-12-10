// React
import React, {useState} from 'react';
import {TextInput, View, Text, TouchableOpacity, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {form, baseStyles, typography, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Scripts
import {slugifyString} from '../../scripts/helpers';

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

	const addBenchmark = () => {
		const {uid} = auth().currentUser;
		const collection = `user-${uid}`;
		const doc = `benchmarks-${selectedBenchmark}`;

		if (fieldValues.name) {
			console.log('name field populated');
			const value = slugifyString(fieldValues.name);

			firestore()
				.collection(collection)
				.doc(doc)
				.set(
					{
						[value]: {
							...fieldValues,
						},
					},
					{merge: true},
				)
				.then(() => {
					console.log('data set');
					CommonActions.reset({
						index: 1,
						routes: [{name: 'Benchmarks'}],
					});
					navigation.dispatch(
						CommonActions.navigate({
							name: 'Benchmarks',
						}),
					);
				})
				.catch(error => {
					console.log('Error setting data => ', error);
					Alert.alert('Error:', error.message);
				});
		} else {
			Alert.alert('Please fill out at least benchmark name field');
		}
	};

	// Whats this gunna do chief
	const deleteBenchmark = async () => {};

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
				onPress={() => addBenchmark()}
				style={[baseStyles.buttonContainer, spacing.marginTop20]}>
				<Text style={typography.buttonText}>Add Benchmark</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddNewBenchmarkFields;
