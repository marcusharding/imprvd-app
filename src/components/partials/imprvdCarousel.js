// React
import Carousel from 'react-native-snap-carousel';
import React, {Component} from 'react';
import {Dimensions, View, Text} from 'react-native';

// Partials
import BenchmarkItem from './benchmarkItem';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Styles
import {typography} from '../../styles/main';

const {width: screenWidth} = Dimensions.get('window');

class ImprvdCarousel extends Component {
	constructor() {
		super();

		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		this.fetchBenchmarksDataListener();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	_renderItem = ({item}) => {
		return (
			<BenchmarkItem
				fetchBenchmarksData={this.fetchBenchmarksData}
				item={item}
			/>
		);
	};

	fetchBenchmarksData() {
		const {category} = this.props;
		const {data} = this.state;
		const {uid} = auth().currentUser;
		const collection = `user-${uid}`;
		const doc = `benchmarks-${category}`;

		this.setState({
			data: [],
		});

		firestore()
			.collection(collection)
			.doc(doc)
			.onSnapshot(documentSnapshot => {
				if (documentSnapshot.exists) {
					data.push(...Object.entries(documentSnapshot.data()));
					this.setState({
						data: data,
					});
				}
			});
	}

	fetchBenchmarksDataListener() {
		const {category} = this.props;
		const {data} = this.state;
		const {uid} = auth().currentUser;
		const collection = `user-${uid}`;
		const doc = `benchmarks-${category}`;

		this.setState({
			data: [],
		});

		this.unsubscribe = firestore()
			.collection(collection)
			.doc(doc)
			.onSnapshot(documentSnapshot => {
				if (documentSnapshot.exists) {
					data.push(...Object.entries(documentSnapshot.data()));
					this.setState({
						data: data,
					});
				}
			});
	}

	render() {
		const {data} = this.state;
		const {label} = this.props;

		if (data.length > 0) {
			return (
				<View>
					<Text style={typography.benchmarkHeading}>{label}</Text>
					<Carousel
						ref={c => {
							this._carousel = c;
						}}
						data={data}
						renderItem={this._renderItem}
						sliderWidth={screenWidth}
						itemWidth={screenWidth - 180}
						layout={'default'}
						firstItem={0}
						activeSlideAlignment={'start'}
						enableSnap={false}
						enableMomentum={true}
					/>
				</View>
			);
		}

		return null;
	}
}

export default ImprvdCarousel;
