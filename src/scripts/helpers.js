// React
import {Alert} from 'react-native';

export const slugifyString = string => {
	return string
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');
};

export const fetchUrlToJson = async url => {
	const response = await fetch(url).catch(error => {
		console.log('Error fetching data from given url => ', error);
		Alert.alert('Error:', error.message);
	});
	const json = await response.json();

	if (json) {
		return json;
	}
};

export const getCurrentDate = () => {
	const today = new Date();
	const date =
		today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

	return date;
};

export const getCurrentTime = () => {
	const today = new Date();
	const time =
		today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

	return time;
};
