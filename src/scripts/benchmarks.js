export const fetchBenchmarksList = async url => {
	const response = await fetch(url);
	const json = await response.json();
	const list = [];

	if (json) {
		json.map(benchmark => {
			list.push({
				label: benchmark.title.rendered,
				value: benchmark.slug,
			});
		});
		return list;
	}
};

export const fetchBenchmarkTags = async url => {
	const response = await fetch(url);
	const json = await response.json();

	if (json) {
		return json[0].tags;
	}
};

export const fetchBenchmarkFields = async tagIds => {
	const count = tagIds.length;
	let counter = 0;
	const fields = [];

	for (const id of tagIds) {
		const response = await fetch(
			`https://contentmanagement.getimprvd.app/wp-json/wp/v2/tags?include=${id}`,
		);
		const json = await response.json();
		fields.push({
			name: json[0].name,
			slug: json[0].slug,
		});
		counter = counter + 1;
		if (counter === count) {
			return fields;
		}
	}
};
