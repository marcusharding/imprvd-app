export const fetchBenchmarksList = async url => {
	const response = await fetch(url);
	const json = await response.json();
	const benchmarksList = [];

	if (json) {
		json.map(benchmark => {
			benchmarksList.push({
				slug: benchmark.slug,
				label: benchmark.title.rendered,
			});
		});
		return benchmarksList;
	}
};
