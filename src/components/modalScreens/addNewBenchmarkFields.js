// React
import React, {Component} from 'react';
import {TextInput, View, Text, TouchableOpacity, Alert} from 'react-native';

// Styles
import {form, baseStyles, typography, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

// Firebase
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

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
		const {uid} = auth().currentUser;
		const {selectedBenchmark, benchmarkFields} = this.props;
		const reference = `/users/${uid}/benchmarks/${selectedBenchmark}`;

		database()
			.ref(reference)
			.set({})
			.then(() => {
				console.log('data set');
			})
			.catch(error => {
				console.log('Error setting data => ', error);
			});

		if (this.state.name) {
			console.log('name field filled out');
		} else {
			Alert.alert('Please fill out at least benchmark name field');
		}
	}

	deleteBenchmark = async () => {
		const {uid} = auth().currentUser;
		const {selectedBenchmark} = this.props;
		const reference = `/users/${uid}/benchmarks/${selectedBenchmark}`;
		await database().ref(reference).remove();
	};

	componentDidMount() {
		const {uid} = auth().currentUser;
		const {selectedBenchmark} = this.props;
		const reference = `/users/${uid}/benchmarks/${selectedBenchmark}`;
		database()
			.ref(reference)
			.once('value')
			.then(snapshot => {
				console.log('User data: ', snapshot.val());
			})
			.catch(error => {
				console.log('Error fetching data => ', error);
			});
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
				<Text style={{marginTop: 40}} onPress={() => this.deleteBenchmark()}>
					Delete benchmark
				</Text>
			</View>
		);
	}
}

export default AddNewBenchmarkFields;
