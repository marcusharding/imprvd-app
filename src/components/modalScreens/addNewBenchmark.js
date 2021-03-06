// React
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, SafeAreaView, Alert} from 'react-native';

// Partials
import PreLoader from '../partials/preLoader';
import GoBackIcon from '../partials/goBackIcon';
import DropDownSelector from '../partials/dropDownSelector';
import AddNewBenchmarkFields from './addNewBenchmarkFields';

// Styles
import {typography, spacing} from '../../styles/main';

// Scripts
import {
	fetchBenchmarksList,
	fetchBenchmarkTags,
	fetchBenchmarkFields,
} from '../../scripts/benchmarks';

const AddNewBenchmark = () => {
	const [subTitle, setSubTitle] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [benchmarksList, setBenchmarksList] = useState([]);
	const [benchmarkFields, setBenchmarkFields] = useState([]);
	// Should be selected category
	const [selectedCategory, setSelectedCategory] = useState(null);

	const _getBenchmarkFields = async tagIds => {
		setBenchmarkFields([]);
		const fields = await fetchBenchmarkFields(tagIds);
		if (fields) {
			setBenchmarkFields(fields);
			setLoading(false);
		}
	};

	const _getBenchmarkTags = async category => {
		setLoading(true);
		const tags = await fetchBenchmarkTags(
			`https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_benchmarks?slug=${category}`,
		);

		if (tags) {
			_getBenchmarkFields(tags);
		}
	};

	const _setSelectedCategory = callback => {
		setSelectedCategory(callback(selectedCategory));
		_getBenchmarkTags(callback(selectedCategory));
	};

	const _getBenchmarksList = async () => {
		const list = await fetchBenchmarksList(
			'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_benchmarks',
		);

		if (list) {
			setBenchmarksList(list);
			setLoading(false);
		}
	};

	const fetchScreenData = () => {
		fetch(
			'https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_screens?slug=add-new-benchmark',
		)
			.then(response => response.json())
			.then(json => {
				const data = json[0].acf;
				setSubTitle(data.screen_subtitle);
			})
			.catch(error => {
				console.log(error);
				Alert.alert('Error:', error.message);
			});
	};

	const fetchData = () => {
		setLoading(true);
		fetchScreenData();
		_getBenchmarksList();
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<SafeAreaView style={spacing.flex1}>
			<GoBackIcon />
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
					selectedCategory={selectedCategory}
					_setSelectedCategory={_setSelectedCategory}
					benchmarksList={benchmarksList}
				/>
			</View>
			<ScrollView>
				<AddNewBenchmarkFields
					benchmarkFields={benchmarkFields}
					selectedCategory={selectedCategory}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddNewBenchmark;
