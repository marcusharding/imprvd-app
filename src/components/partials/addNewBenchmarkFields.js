// React
import React, {Component} from 'react';
import {TextInput, View} from 'react-native';

// Styles
import {form, baseStyles} from '../../styles/main';

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

	updateInputValue(value, fieldSlug) {}

	setBenchmarkFields(updatedFields) {
		this.setState({
			fields: updatedFields,
			isLoading: false,
		});
	}

	componentDidUpdate(prevProps) {
		const {benchmarkFields} = this.props;

		if (prevProps.benchmarkFields !== benchmarkFields) {
			// this.setBenchmarkFields(benchmarkFields);
			console.log('They dont match');
		}
	}

	render() {
		const {selectedBenchmark} = this.props;
		const {isLoading, fields} = this.state;

		// console.log(benchmarkFields);

		if (!selectedBenchmark) {
			return null;
		}

		if (selectedBenchmark && isLoading) {
			return (
				<View style={baseStyles.flexCenter}>
					<PreLoader />
				</View>
			);
		}

		if (fields) {
			return null;
			// fields.map((field, index) => {
			// 	const fieldName = field.name;
			// 	const fieldSlug = field.slug;
			// 	this.setState({[fieldSlug]: ''});

			// 	return (
			// 		<TextInput
			// 			style={form.input}
			// 			placeholder={fieldName}
			// 			value={this.state[fieldSlug]}
			// 			onChangeText={value => {
			// 				this.updateInputValue(value, fieldSlug);
			// 			}}
			// 			placeholderTextColor="#EFEFEF"
			// 		/>
			// 	);
			// });
		}
	}
}

export default AddNewBenchmarkFields;
