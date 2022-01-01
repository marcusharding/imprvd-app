// React
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownSelector = ({
	benchmarksList,
	selectedCategory,
	_setSelectedCategory,
}) => {
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState(benchmarksList);

	return (
		<DropDownPicker
			open={open}
			value={selectedCategory}
			items={items}
			setOpen={setOpen}
			setValue={_setSelectedCategory}
			setItems={setItems}
		/>
	);
};

export default DropDownSelector;
