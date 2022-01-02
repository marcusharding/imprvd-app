// React
import React from 'react';
import {View, Text, ScrollView} from 'react-native';

// Partials
import ProfileIcon from '../partials/profileIcon';
import RecentBenchmarks from '../partials/recentBenchmarks';

// Styles
import {baseStyles, typography, spacing} from '../../styles/main';

const Dashboard = () => {
	return (
		<View style={spacing.flex1}>
			<View style={spacing.flex1}>
				<ProfileIcon />

				<Text style={[typography.pageHeading, baseStyles.screenHeading]}>
					Dashboard
				</Text>

				<ScrollView showsVerticalScrollIndicator={false} style={spacing.flex1}>
					<RecentBenchmarks />
				</ScrollView>
			</View>
		</View>
	);
};

export default Dashboard;
