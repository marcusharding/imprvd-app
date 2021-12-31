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

// Scripts
import {fetchBenchmarksData} from '../../scripts/benchmarks';

// Constants
import {COLLECTION} from '../../constants/constants';

const {width: screenWidth} = Dimensions.get('window');

class ImprvdCarousel extends Component {
	constructor() {
		super();

		this.state = {
			data: [],
		};
	}

	_fetchBenchmarksData = async () => {
		const {category} = this.props;
		const {data} = this.state;
		const doc = `benchmarks-${category}`;

		this.setState({
			data: [],
		});

		firestore()
			.collection(COLLECTION)
			.doc(doc)
			.onSnapshot(documentSnapshot => {
				if (documentSnapshot.exists) {
					data.push(documentSnapshot.data());
					this.setState({
						data: data,
					});
				}
			});
	};

	componentDidMount() {
		this._fetchBenchmarksData();
	}

	_renderItem = ({item}) => {
		return <BenchmarkItem item={item} />;
	};

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
