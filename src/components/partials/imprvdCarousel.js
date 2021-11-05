// React
import Carousel from 'react-native-snap-carousel';
import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';

// Partials
import BenchmarkItem from './benchmarkItem';

const {width: screenWidth} = Dimensions.get('window');

class ImprvdCarousel extends Component {
	constructor() {
		super();

		this.state = {
			index: 0,
		};
	}

	handleSnapToItem = index => {
		this.setState({
			index: index,
		});
	};

	_renderItem = ({item, index}) => {
		return <BenchmarkItem title={item.title} />;
	};

	render() {
		const {fakeData} = this.props;

		return (
			<Carousel
				ref={c => {
					this._carousel = c;
				}}
				data={fakeData}
				renderItem={this._renderItem}
				onSnapToItem={() => this.handleSnapToItem()}
				sliderWidth={screenWidth}
				itemWidth={screenWidth - 200}
				layout={'default'}
				firstItem={0}
			/>
		);
	}
}

export default ImprvdCarousel;
