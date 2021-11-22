// React
import React, {Component} from 'react';
import {TextInput, View, Text, TouchableOpacity, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {form, baseStyles, typography, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class AddNewBenchmarkFields extends Component {
	constructor() {
		super();

		this.state = {
			isLoading: true,
			fieldValues: {},
		};
	}

	updateInputValue(value, fieldSlug, selectedBenchmark) {
		this.setState({
			fieldValues: {
				...this.state.fieldValues,
				[fieldSlug]: value,
				category: selectedBenchmark,
			},
		});
	}

	slugifyString(string) {
		return string
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-');
	}

	addBenchmark() {
		const {uid} = auth().currentUser;
		const {fieldValues} = this.state;
		const {selectedBenchmark, navigation} = this.props;
		const collection = `user-${uid}`;
		const doc = `benchmarks-${selectedBenchmark}`;

		if (fieldValues.name) {
			console.log('name field populated');
			const value = this.slugifyString(fieldValues.name);

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
						index: 0,
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
	}

	deleteBenchmark = async () => {};

	componentDidMount() {}

	render() {
		const {selectedBenchmark, benchmarkFields} = this.props;

		const fields = benchmarkFields.map(field => {
			return (
				<TextInput
					key={field.slug}
					style={form.input}
					placeholder={field.name}
					value={this.state[field.slug]}
					onChangeText={value => {
						this.updateInputValue(value, field.slug, selectedBenchmark);
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
					onPress={() => this.addBenchmark()}
					style={[baseStyles.buttonContainer, spacing.marginTop20]}>
					<Text style={typography.buttonText}>Add Benchmark</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default AddNewBenchmarkFields;
