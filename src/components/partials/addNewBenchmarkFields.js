// React
import React, {Component} from 'react';
import {TextInput, View, Text, TouchableOpacity, Alert} from 'react-native';

// Styles
import {form, baseStyles, typography, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

class AddNewBenchmarkFields extends Component {
	constructor() {
		super();

		this.state = {
			isLoading: true,
			fields: null,
		};
	}

	updateInputValue(value, fieldSlug) {
		this.setState({
			[fieldSlug]: value,
		});
	}

	addBenchmark() {
		console.log(this.state.name);
		if (this.state.name) {
			console.log('name field filled out');
		} else {
			Alert.alert('Please fill out at least benchmark name field');
		}
	}

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
						this.updateInputValue(value, field.slug);
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
