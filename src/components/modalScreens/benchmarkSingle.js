// React
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Styles
import {baseStyles, spacing, typography} from '../../styles/main';

// Partials
import GoBackIcon from '../partials/goBackIcon';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const benchmarkSingle = ({route, navigation}) => {
	const data = route.params.data;
	const object = route.params.object;
	const slug = route.params.slug;

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
				console.log('Benchmark Deleted');
				navigation.navigate('Benchmarks');
			})
			.catch(error => {
				console.log('Error deleting benchmark => ', error);
			});
	};

	return (
		<View>
			<GoBackIcon navigation={navigation} />
			<View style={baseStyles.heightFull}>
				{data.map(benchmark => {
					if (benchmark[0] === 'name') {
						return (
							<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
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

export default benchmarkSingle;
