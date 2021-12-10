// React
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// Styles
import {baseStyles, spacing, typography} from '../../styles/main';

// Partials
import GoBackIcon from '../partials/goBackIcon';
import PreLoader from '../partials/preLoader';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const BenchmarkSingle = ({route, navigation}) => {
	const data = route.params.data;
	const object = route.params.object;
	const slug = route.params.slug;
	const [isLoading, setLoading] = useState(false);

	const deleteThisBenchmark = () => {
		const {uid} = auth().currentUser;
		const collection = `user-${uid}`;
		const doc = `benchmarks-${object.category}`;

		firestore()
			.collection(collection)
			.doc(doc)
			.update({
				[slug]: firestore.FieldValue.delete(),
			})
			.then(() => {
				setLoading(true);
				console.log('Benchmark Deleted');
				CommonActions.reset({
					index: 1,
					routes: [{name: 'Benchmarks'}],
				});
				navigation.dispatch(
					CommonActions.navigate({
						name: 'Benchmarks',
					}),
				);
			})
			.catch(error => {
				console.log('Error deleting benchmark => ', error);
				Alert.alert('Error:', error.message);
			});
	};

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<View>
			<GoBackIcon navigation={navigation} />
			<View style={baseStyles.heightFull}>
				{data.map(benchmark => {
					if (benchmark[0] === 'name') {
						return (
							<Text
								key={benchmark[0]}
								style={[typography.pageHeading, baseStyles.screenHeading]}>
								{benchmark[1]}
							</Text>
						);
					}

					return (
						<View key={benchmark[0]} style={baseStyles.flexContainerRow}>
							<Text>{benchmark[0]}:</Text>
							<Text>{benchmark[1]}</Text>
						</View>
					);
				})}

				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => deleteThisBenchmark()}
					style={[baseStyles.buttonContainer, spacing.marginTop20]}>
					<Text style={typography.buttonText}>Delete Benchmark</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default BenchmarkSingle;
