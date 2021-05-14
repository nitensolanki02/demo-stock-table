export const getTableData = async () => {
	try {
		debugger;
		const response = await fetch(
			"https://api.orats.io/datav2/strikes.json?token=demo&ticker=IBM"
		);
		const data = await response.json();
		return data && data.data;
	} catch (err) {
		console.log(err);
	}
};
