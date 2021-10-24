// React
import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Partials
import PreLoader from '../partials/preLoader';
import GoBackIcon from '../partials/goBackIcon';
import DropDownSelector from '../partials/dropDownPicker';
import addNewBenchmarkField from '../partials/addNewBenchmarkField';

// Styles
import {typography} from '../../styles/main';

class addNewBenchmark extends Component {
	constructor() {
		super();

		this.state = {
			subTitle: '',
			isLoading: true,
			benchmarksList: [],
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
			.catch(error => console.log(error));
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
		const benchmarkFields = [];

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
						this.renderBenchmarkFields(benchmarkFields);
						this.setState({
							isLoading: false,
						});
					});
				})
				.catch(error => console.log(error));
		});
	}

	renderBenchmarkFields(benchmarkFields) {
		if (benchmarkFields) {
			return benchmarkFields.map(field => {
				<addNewBenchmarkField fieldName={field.name} />;
			});
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const {isLoading, subTitle, benchmarksList, selectedBenchmark} = this.state;
		const {navigation} = this.props;

		if (isLoading) {
			return <PreLoader />;
		}

		return (
			<View>
				<GoBackIcon navigation={navigation} />
				<Text style={typography.subHeading}>{subTitle}</Text>
				<DropDownSelector
					list={benchmarksList}
					setSelectedBenchmark={this.setSelectedBenchmark}
					selectedBenchmark={selectedBenchmark}
				/>
				{this.renderBenchmarkFields()}
			</View>
		);
	}
}

export default addNewBenchmark;
