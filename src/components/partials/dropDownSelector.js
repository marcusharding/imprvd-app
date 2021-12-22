// React
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownSelector = ({
	benchmarksList,
	selectedBenchmark,
	_setSelectedBenchmark,
}) => {
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState(benchmarksList);

	return (
		<DropDownPicker
			open={open}
			value={selectedBenchmark}
			items={items}
			setOpen={setOpen}
			setValue={_setSelectedBenchmark}
			setItems={setItems}
		/>
	);
};

export default DropDownSelector;
