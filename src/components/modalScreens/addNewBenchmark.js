// React
import React, {Component} from 'react';
import {View, Text, ScrollView, SafeAreaView, Alert} from 'react-native';

// Partials
import PreLoader from '../partials/preLoader';
import GoBackIcon from '../partials/goBackIcon';
import DropDownSelector from '../partials/dropDownPicker';
import AddNewBenchmarkFields from './addNewBenchmarkFields';

// Styles
import {typography, spacing} from '../../styles/main';

class AddNewBenchmark extends Component {
	constructor() {
		super();

		this.state = {
			subTitle: '',
			isLoading: true,
			benchmarksList: [],
			benchmarkFields: [],
			selectedBenchmark: null,
		};

		this.setSelectedBenchmark = this.setSelectedBenchmark.bind(this);
	}

	fetchData() {
		const {benchmarksList} = this.state;
		fetch(
			'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_screens?slug=add-new-benchmark',
		)
			.then(response => response.json())
			.then(json => {
				const data = json[0].acf;

				this.setState({
					subTitle: data.screen_subtitle,
					isLoading: false,
				});
			})
			.then(
				fetch(
					'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_benchmarks',
				)
					.then(response => response.json())
					.then(json => {
						json.map(benchmark => {
							benchmarksList.push({
								label: benchmark.title.rendered,
								value: benchmark.slug,
							});
							this.setState({
								benchmarksList: benchmarksList,
							});
						});
					}),
			)
			.catch(error => {
				console.log(error);
				Alert.alert('Error:', error.message);
			});
	}

	setSelectedBenchmark(callback) {
		const {selectedBenchmark} = this.state;

		this.setState(state => ({
			selectedBenchmark: callback(state.selectedBenchmark),
		}));

		this.fetchBenchmarkTags(callback(selectedBenchmark));
	}

	fetchBenchmarkTags(selectedBenchmark) {
		this.setState({
			isLoading: true,
			benchmarkFields: [],
		});

		fetch(
			`https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_benchmarks?slug=${selectedBenchmark}`,
		)
			.then(response => response.json())
			.then(json => {
				this.fetchBenchmarkFields(json[0].tags);
			})
			.catch(error => {
				console.log(error);
				Alert.alert('Error:', error.message);
				this.setState({
					isLoading: false,
				});
			});
	}

	fetchBenchmarkFields = async tagIds => {
		const {benchmarkFields} = this.state;
		const count = tagIds.length;
		let counter = 0;

		for (const id of tagIds) {
			const response = await fetch(
				`https://contentmanagement.getimprvd.app/wp-json/wp/v2/tags?include=${id}`,
			);
			const json = await response.json();
			benchmarkFields.push({
				name: json[0].name,
				slug: json[0].slug,
			});
			counter = counter + 1;
			if (counter === count) {
				this.setState({
					benchmarkFields: benchmarkFields,
					isLoading: false,
				});
			}
		}
	};

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const {
			isLoading,
			subTitle,
			benchmarksList,
			selectedBenchmark,
			benchmarkFields,
		} = this.state;
		const {navigation} = this.props;

		if (isLoading) {
			return <PreLoader />;
		}

		return (
			<SafeAreaView style={spacing.flex1}>
				<GoBackIcon navigation={navigation} />
				<Text
					style={[
						typography.subHeading,
						spacing.marginBottom20,
						spacing.marginTop20,
					]}>
					{subTitle}
				</Text>
				<View style={spacing.marginBottom20}>
					<DropDownSelector
						list={benchmarksList}
						setSelectedBenchmark={this.setSelectedBenchmark}
						selectedBenchmark={selectedBenchmark}
					/>
				</View>
				<ScrollView>
					<AddNewBenchmarkFields
						benchmarkFields={benchmarkFields}
						selectedBenchmark={selectedBenchmark}
						navigation={navigation}
					/>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default AddNewBenchmark;
