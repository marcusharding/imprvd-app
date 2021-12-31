// React
import React, {useState} from 'react';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Styles
import {form, baseStyles, typography, spacing} from '../../styles/main';

// Partials
import PreLoader from '../partials/preLoader';

// Scripts
import {addNewBenchmark} from '../../scripts/benchmarks';

const UpdateBenchmarkSingle = ({route}) => {
	const [fieldValues, setFieldValues] = useState({});
	const [category, setCategory] = useState(null);
	const navigation = useNavigation();

	return nulls;
};

export default UpdateBenchmarkSingle;
