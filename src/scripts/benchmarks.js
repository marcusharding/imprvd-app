// React
import {Alert} from 'react-native';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Script
import {slugifyString} from './helpers';

// Constants
import {UID} from '../constants/constants';

export const fetchBenchmarksList = async url => {
	const response = await fetch(url);
	const json = await response.json();
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
	const response = await fetch(url);
	const json = await response.json();

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

const setBenchmark = async (value, collection, doc, fieldValues) => {
	const data = {
		[value]: {
			...fieldValues,
		},
	};

	const response = await firestore()
		.collection(collection)
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

export const addNewBenchmark = async (fieldValues, selectedBenchmark) => {
	const {uid} = auth().currentUser;
	const collection = `user-${uid}`;
	const doc = `benchmarks-${selectedBenchmark}`;

	if (fieldValues.name) {
		const value = slugifyString(fieldValues.name);
		const response = await setBenchmark(value, collection, doc, fieldValues);

		if (response) {
			return true;
		}
	} else {
		Alert.alert('Please fill out at least benchmark name field');
	}
};

export const deleteBenchmark = async (object, slug) => {
	const {uid} = auth().currentUser;
	const collection = `user-${uid}`;
	const doc = `benchmarks-${object.category}`;

	const response = await firestore()
		.collection(collection)
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
