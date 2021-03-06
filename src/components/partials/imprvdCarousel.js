// React
import Carousel from 'react-native-snap-carousel';
import React, {Component} from 'react';
import {Dimensions, View, Text} from 'react-native';

// Partials
import BenchmarkItem from './benchmarkItem';

// Styles
import {typography} from '../../styles/main';

// Scripts
import {fetchBenchmarksData} from '../../scripts/benchmarks';

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

		const response = await fetchBenchmarksData(category);

		if (response) {
			this.setState({
				data: response,
			});
		}
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
