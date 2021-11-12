import {StyleSheet} from 'react-native';

const appTheme = {
	colors: {
		primary: '',
		background: '#121212',
		card: '#111111',
		text: '#ffffff',
		notification: 'rgb(255, 69, 58)',
	},
};

const spacing = StyleSheet.create({
	marginBottom20: {
		marginBottom: 20,
	},

	marginTop20: {
		marginTop: 20,
	},

	flex1: {
		flex: 1,
	},
});

const form = StyleSheet.create({
	input: {
		width: '100%',
		marginBottom: 25,
		paddingBottom: 15,
		alignSelf: 'center',
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 5,
		paddingLeft: 25,
		paddingTop: 15,
		color: '#EFEFEF',
	},

	inputText: {
		color: '#D1D1D1',
		marginTop: 25,
		fontSize: 16,
		textAlign: 'center',
		fontFamily: 'Montserrat-Regular',
	},

	inputTextSpan: {
		color: '#34FFC8',
	},
});

const typography = StyleSheet.create({
	pageHeading: {
		color: '#ffffff',
		fontSize: 30,
		paddingBottom: 20,
		fontFamily: 'Gilroy-SemiBold',
	},

	subHeading: {
		color: '#ffffff',
		fontSize: 20,
		paddingBottom: 20,
		textAlign: 'center',
		fontFamily: 'Montserrat-Regular',
	},

	benchmarkHeading: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: 'bold',
		fontFamily: 'Montserrat-Regular',
		marginTop: 20,
		marginBottom: 20,
	},

	buttonText: {
		fontSize: 18,
		color: '#000000',
		fontWeight: 'bold',
		alignSelf: 'center',
		textTransform: 'uppercase',
	},
});

const baseStyles = StyleSheet.create({
	flexContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	heightFull: {
		height: '100%',
	},

	flexCenter: {
		flex: 1,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	flexContainerRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},

	safeAreaView: {
		flex: 1,
		position: 'relative',
		height: '100%',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		backgroundColor: '#121212',
	},

	headerIcon: {
		height: 100,
		width: 100,
		resizeMode: 'stretch',
	},

	buttonContainer: {
		elevation: 8,
		width: '100%',
		backgroundColor: '#03DAC6',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
	},

	screenHeading: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 50,
	},

	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 100,
	},

	profileIcon: {
		marginTop: 10,
		marginLeft: 'auto',
		borderRadius: 100,
		width: 35,
		height: 35,
	},

	addNewBenchmarkIcon: {
		position: 'absolute',
		bottom: 0,
		right: 10,
		marginBottom: 20,
	},
});

const ImprvdCarousel = StyleSheet.create({
	benchmarkItem: {
		backgroundColor: '#2A2A2A',
		padding: 20,
		width: '100%',
		borderRadius: 5,
		marginBottom: 20,
	},

	benchmarkTextGroup: {
		display: 'flex',
		flexDirection: 'row',
	},

	benchmarkTextName: {
		fontSize: 18,
		color: '#ffffff',
		marginBottom: 10,
	},

	benchmarkTextKey: {
		marginRight: 15,
		color: '#ffffff',
	},
});

export {appTheme, typography, baseStyles, form, spacing, ImprvdCarousel};
