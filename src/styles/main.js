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
		color: 'white',
		fontSize: 30,
		paddingBottom: 20,
		fontFamily: 'Gilroy-SemiBold',
	},

	subHeading: {
		color: '#fff',
		fontSize: 20,
		paddingBottom: 20,
		textAlign: 'center',
		fontFamily: 'Montserrat-Regular',
	},
});

const baseStyles = StyleSheet.create({
	flexContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	safeAreaView: {
		flex: 1,
		position: 'relative',
		height: '100%',
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#121212',
	},
});

export {appTheme};
export {typography};
export {baseStyles};
export {form};
