// React
import Carousel from 'react-native-snap-carousel';
import React, {Component} from 'react';
import {Dimensions} from 'react-native';

// Partials
import BenchmarkItem from './benchmarkItem';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width: screenWidth} = Dimensions.get('window');

class ImprvdCarousel extends Component {
	constructor() {
		super();

		this.state = {
			index: 0,
			data: [],
		};
	}

	componentDidMount() {
		this.fetchBenchmarksDataListener();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleSnapToItem = index => {
		this.setState({
			index: index,
		});
	};

	_renderItem = ({item}) => {
		const {navigation} = this.props;
		return <BenchmarkItem navigation={navigation} item={item} />;
	};

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

		return (
			<Carousel
				ref={c => {
					this._carousel = c;
				}}
				data={data}
				renderItem={this._renderItem}
				onSnapToItem={() => this.handleSnapToItem()}
				sliderWidth={screenWidth}
				itemWidth={screenWidth - 180}
				layout={'default'}
				firstItem={0}
				activeSlideAlignment={'start'}
			/>
		);
	}
}

export default ImprvdCarousel;
