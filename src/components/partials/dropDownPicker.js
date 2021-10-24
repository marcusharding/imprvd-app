// React
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownSelector = ({list, selectedBenchmark, setSelectedBenchmark}) => {
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState(list);

	return (
		<DropDownPicker
			open={open}
			value={selectedBenchmark}
			items={items}
			setOpen={setOpen}
			setValue={setSelectedBenchmark}
			setItems={setItems}
		/>
	);
};

export default DropDownSelector;
