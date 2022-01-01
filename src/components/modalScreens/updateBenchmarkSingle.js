// React
import React, {useState, Fragment} from 'react';
import {
	TextInput,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Styles
import {form, typography, spacing, profile, colors} from '../../styles/main';

// Scripts
import {
	addNewBenchmark,
	getFieldValuesFromArray,
} from '../../scripts/benchmarks';

// Partials
import GoBackIcon from '../partials/goBackIcon';

const UpdateBenchmarkSingle = ({route}) => {
	const {data, category, slug} = route.params;
	const [fieldValues, setFieldValues] = useState(getFieldValuesFromArray(data));
	const navigation = useNavigation();

	const updateInputValue = (value, fieldSlug) => {
		setFieldValues({
			...fieldValues,
			[fieldSlug]: value,
		});
	};

	const _updateBenchmark = async () => {
		const response = await addNewBenchmark(fieldValues, category, slug, true);

		if (response) {
			CommonActions.reset({
				index: 1,
				routes: [{name: 'Benchmarks'}],
			});
			navigation.dispatch(
				CommonActions.navigate({
					name: 'Benchmarks',
					params: {
						refreshBencharks: true,
					},
				}),
			);
		}
	};

	const fields = data.map(field => {
		return (
			<Fragment key={field[0]}>
				<Text style={spacing.marginBottom10}>{field[0]}</Text>
				<TextInput
					style={form.input}
					placeholder={field[1]}
					value={fieldValues[field.slug]}
					onChangeText={value => {
						updateInputValue(value, field[0]);
					}}
					placeholderTextColor="#EFEFEF"
				/>
			</Fragment>
		);
	});

	return (
		<View>
			<View style={[profile.header, spacing.marginBottom20]}>
				<GoBackIcon />
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => _updateBenchmark()}>
					<Text style={[typography.subHeading, colors.lightBlue]}>
						Save updates
					</Text>
				</TouchableOpacity>
			</View>
			<ScrollView style={spacing.marginBottom100}>{fields}</ScrollView>
		</View>
	);
};

export default UpdateBenchmarkSingle;
