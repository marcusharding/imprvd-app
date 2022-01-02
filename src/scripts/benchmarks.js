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

export const fetchBenchmarksData = async category => {
	const doc = `benchmarks-${category}`;
	let data = [];
	const response = await firestore()
		.collection(COLLECTION)
		.doc(doc)
		.get()
		.then(documentSnapshot => {
			if (documentSnapshot.exists) {
				data = getOrderedBenchmarksData(documentSnapshot.data());
				return data;
			}
		})
		.catch(error => {
			console.log('Error fetching benchmarks => ', error);
			Alert.alert('Error:', error.message);
		});

	if (response) {
		return data;
	}
};

export const getFormattedBenchmarkItem = item => {
	const {category, values, slug} = item;
	const mostRecentValue = values[values.length - 1];
	let data = Object.entries(mostRecentValue);
	const nameIndex = data.findIndex(benchmark => benchmark[0] === 'name');
	data.splice(0, 0, data.splice(nameIndex, 1)[0]);

	return {
		category: category,
		object: item,
		slug: slug,
		data: data,
	};
};

export const addNewBenchmark = async (
	fieldValues,
	category,
	slug = null,
	updatingBenchmark = false,
) => {
	if (fieldValues.name) {
		const doc = `benchmarks-${category}`;
		const name = slugifyString(fieldValues.name);
		let response = null;

		if (updatingBenchmark) {
			const dateModified = getDateModified();
			const values = await mergeValues({...fieldValues}, doc, slug);
			response = await updateBenchmark(name, doc, dateModified, values);
		} else {
			const dateAdded = getDateAdded();
			const values = [];
			values.push({...fieldValues});
			response = await setBenchmark(
				name,
				category,
				doc,
				dateAdded,
				values,
				slug,
			);
		}

		if (response) {
			return true;
		}
	} else {
		Alert.alert('Please fill out at least benchmark name field');
	}
};

export const deleteBenchmark = async (category, slug) => {
	const doc = `benchmarks-${category}`;

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

export const getFieldValuesFromArray = data => {
	const fieldValues = {};

	data.map(field => {
		fieldValues[field[0]] = field[1];
	});

	return fieldValues;
};

const getDateAdded = () => {
	const dateAdded = {
		dateAdded: new Date(),
	};

	return dateAdded;
};

const getDateModified = () => {
	const dateModified = {
		dateModified: new Date(),
	};

	return dateModified;
};

const mergeValues = async (fieldValues, doc, slug) => {
	const values = [];
	const response = await firestore()
		.collection(COLLECTION)
		.doc(doc)
		.get()
		.then(documentSnapshot => {
			if (documentSnapshot.exists) {
				values.push(...documentSnapshot.data()[slug].values, fieldValues);
				return true;
			}
		})
		.catch(error => {
			console.log('Error getting benchmarks for values merge => ', error);
			Alert.alert('Error:', error.message);
		});

	if (response) {
		return values;
	}
};

const getOrderedBenchmarksData = data => {
	const objectValues = Object.values(data);

	const sortedDateAdded = objectValues.sort(
		(a, b) => b.dateAdded - a.dateAdded,
	);
	const sortedDateModified = sortedDateAdded.sort(
		(a, b) => b.dateModified - a.dateModified,
	);

	return sortedDateModified;
};

const setBenchmark = async (name, category, doc, dateAdded, values, slug) => {
	const data = {
		[name]: {
			category: category,
			slug: slug,
			...dateAdded,
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

// This can be merged into setBenchmark, just need to get data object to be dynamic
const updateBenchmark = async (name, doc, dateModified, values) => {
	const data = {
		[name]: {
			dateModified: dateModified.dateModified,
			values: values,
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
