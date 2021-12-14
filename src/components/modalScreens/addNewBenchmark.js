// React
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, SafeAreaView, Alert} from 'react-native';

// Partials
import PreLoader from '../partials/preLoader';
import GoBackIcon from '../partials/goBackIcon';
import DropDownSelector from '../partials/dropDownPicker';
import AddNewBenchmarkFields from './addNewBenchmarkFields';

// Styles
import {typography, spacing} from '../../styles/main';

// Scripts
import {
	fetchBenchmarksList,
	fetchBenchmarkTags,
	fetchBenchmarkFields,
} from '../../scripts/benchmarks';

const AddNewBenchmark = ({navigation}) => {
	const [subTitle, setSubTitle] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [benchmarksList, setBenchmarksList] = useState([]);
	const [benchmarkFields, setBenchmarkFields] = useState([]);
	const [selectedBenchmark, setSelectedBenchmark] = useState('gymnastics');

	const getBenchmarkFields = async tagIds => {
		setBenchmarkFields([]);
		const fields = await fetchBenchmarkFields(tagIds);
		if (fields) {
			setBenchmarkFields(fields);
		}
	};

	const getBenchmarkTags = async () => {
		setLoading(true);
		const tags = await fetchBenchmarkTags(
			`https://contentmanagement.getimprvd.app/wp-json/wp/v2/app_benchmarks?slug=${selectedBenchmark}`,
		);

		if (tags) {
			getBenchmarkFields(tags);
		}
	};

	// const _setSelectedBenchmark = callback => {
	// 	// setSelectedBenchmark(callback(selectedBenchmark));
	// 	// fetchBenchmarkTags(callback);
	// 	console.log(callback(selectedBenchmark));
	// };

	const getBenchmarksList = async () => {
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
			.then(getBenchmarksList())
			.catch(error => {
				console.log(error);
				Alert.alert('Error:', error.message);
			});
	};

	const fetchData = () => {
		setLoading(true);
		fetchScreenData();
		getBenchmarkTags();
	};

	useEffect(() => {
		fetchData();
	}, []);

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
				{/* <DropDownSelector
					list={benchmarksList}
					setSelectedBenchmark={_setSelectedBenchmark}
					selectedBenchmark={selectedBenchmark}
				/> */}
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
};

export default AddNewBenchmark;
