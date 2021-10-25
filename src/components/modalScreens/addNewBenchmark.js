// React
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Partials
import PreLoader from '../partials/preLoader';
import GoBackIcon from '../partials/goBackIcon';
import DropDownSelector from '../partials/dropDownPicker';
import AddNewBenchmarkField from '../partials/addNewBenchmarkField';

// Styles
import {typography, spacing, baseStyles} from '../../styles/main';

class addNewBenchmark extends Component {
	constructor() {
		super();

		this.state = {
			subTitle: '',
			isLoading: true,
			benchmarksList: [],
			benchmarkFields: [],
			benchmarkFieldsValues: [],
			selectedBenchmark: null,
		};

		this.setSelectedBenchmark = this.setSelectedBenchmark.bind(this);
		this.setFieldInputValue = this.setFieldInputValue.bind(this);
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
			.catch(error => console.log(error));
	}

	setSelectedBenchmark(callback) {
		const {selectedBenchmark} = this.state;

		this.setState(state => ({
			selectedBenchmark: callback(state.selectedBenchmark),
		}));

		this.fetchBenchmarkTags(callback(selectedBenchmark));
	}

	setFieldInputValue(text, fieldSlug, index) {
		const {benchmarkFieldsValues} = this.state;
		benchmarkFieldsValues[index][fieldSlug] = text;

		this.setState({
			benchmarkFieldsValues: benchmarkFieldsValues,
		});
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
				this.setState({
					isLoading: false,
				});
			});
	}

	fetchBenchmarkFields(tagIds) {
		const {benchmarkFields} = this.state;

		tagIds.map(tagId => {
			fetch(
				`https://contentmanagement.getimprvd.app/wp-json/wp/v2/tags?include=${tagId}`,
			)
				.then(response => response.json())
				.then(json => {
					json.map(tag => {
						benchmarkFields.push({
							slug: tag.slug,
							name: tag.name,
						});
					});
					this.setState({
						benchmarkFields: benchmarkFields,
						isLoading: false,
					});
				})
				.catch(error => console.log(error));
		});
	}

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
			benchmarkFieldsValues,
		} = this.state;
		const {navigation} = this.props;
		let fieldsMarkup = null;

		if (benchmarkFields.length > 0) {
			fieldsMarkup = benchmarkFields.map((field, index) => {
				const fieldName = field.name;
				const fieldSlug = field.slug;
				benchmarkFieldsValues[index] = {[fieldSlug]: ''};

				return (
					<AddNewBenchmarkField
						key={field.slug}
						index={index}
						fieldName={fieldName}
						fieldSlug={fieldSlug}
						setFieldInputValue={this.setFieldInputValue}
					/>
				);
			});
		}

		if (isLoading) {
			return <PreLoader />;
		}

		console.log(benchmarkFieldsValues);

		return (
			<View>
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
				{fieldsMarkup}
				{fieldsMarkup && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => this.userLogin()}
						style={[baseStyles.buttonContainer, spacing.marginTop20]}>
						<Text style={typography.buttonText}>Add Benchmark</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

export default addNewBenchmark;
