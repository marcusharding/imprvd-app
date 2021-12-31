// React
import {Alert} from 'react-native';

// Firebase
import firestore from '@react-native-firebase/firestore';

// Script
import {
	slugifyString,
	fetchUrlToJson,
	getCurrentDate,
	getCurrentTime,
} from './helpers';

// Constants
import {COLLECTION} from '../constants/constants';

export const fetchBenchmarksList = async url => {
	const json = await fetchUrlToJson(url);
	const list = [];

	if (json) {
		json.map(benchmark => {
			list.push({
				label: benchmark.title.rendered,
				value: benchmark.slug,
			});
		});
		return list;
	}
};

// These need poper handling of catching errors
export const fetchBenchmarkTags = async url => {
	const json = await fetchUrlToJson(url);

	if (json) {
		return json[0].tags;
	}
};

export const fetchBenchmarkFields = async tagIds => {
	const count = tagIds.length;
	let counter = 0;
	const fields = [];

	for (const id of tagIds) {
		const response = await fetch(
			`https://contentmanagement.getimprvd.app/wp-json/wp/v2/tags?include=${id}`,
		);
		const json = await response.json();
		fields.push({
			name: json[0].name,
			slug: json[0].slug,
		});
		counter = counter + 1;
		if (counter === count) {
			return fields;
		}
	}
};

export const getFormattedBenchmarkItem = item => {
	const slug = item[0];
	const object = item[1];
	const {category} = object;
	const mostRecentValue = object.values[object.values.length - 1];
	let data = Object.entries(mostRecentValue);
	const nameIndex = data.findIndex(benchmark => benchmark[0] === 'name');
	data.splice(0, 0, data.splice(nameIndex, 1)[0]);

	return {
		category: category,
		object: object,
		slug: slug,
		data: data,
	};
};

const setBenchmark = async (
	name,
	category,
	doc,
	dateAdded,
	dateModified,
	values,
) => {
	const data = {
		[name]: {
			category: category,
			...dateAdded,
			...dateModified,
			values,
		},
	};

	const response = await firestore()
		.collection(COLLECTION)
		.doc(doc)
		.set(data, {merge: true})
		.then(() => {
			console.log('data set');
			return true;
		})
		.catch(error => {
			console.log('Error setting data => ', error);
			Alert.alert('Error:', error.message);
		});

	if (response) {
		return true;
	}
};

export const addNewBenchmark = async (
	fieldValues,
	selectedBenchmark,
	category,
) => {
	console.log(fieldValues);
	if (fieldValues.name) {
		const doc = `benchmarks-${selectedBenchmark}`;
		const name = slugifyString(fieldValues.name);
		const dateAdded = getDateAdded();
		const dateModified = getDateAdded();
		const values = [];
		values.push({...fieldValues});
		const response = await setBenchmark(
			name,
			category,
			doc,
			dateAdded,
			dateModified,
			values,
		);

		if (response) {
			return true;
		}
	} else {
		Alert.alert('Please fill out at least benchmark name field');
	}
};

export const deleteBenchmark = async (object, slug) => {
	const doc = `benchmarks-${object.category}`;

	const response = await firestore()
		.collection(COLLECTION)
		.doc(doc)
		.update({
			[slug]: firestore.FieldValue.delete(),
		})
		.then(() => {
			console.log('Benchmark Deleted');
			return true;
		})
		.catch(error => {
			console.log('Error deleting benchmark => ', error);
			Alert.alert('Error:', error.message);
		});

	if (response) {
		return true;
	}
};

const getDateAdded = () => {
	const dateAdded = {
		dateAdded: {date: getCurrentDate(), time: getCurrentTime()},
	};

	return dateAdded;
};
