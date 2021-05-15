import React, { useEffect, useState } from "react";
import { getTableData } from "../apis/apis";
import { Space, Spin, Table } from "antd";
import "./scss/StockTable.scss";
import CustomFilter from "./CustomFilter";
import { columns } from "../columns";

const StockTable = () => {
	const [tableData, setTableData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [dataColumns, setDataColumns] = useState(columns);
	const [selectedFilterItems, setSelectedFilterItems] = useState([]);

	useEffect(() => {
		getTableData().then((res) => {
			if (res) {
				const filteredData = res.map((item, index) => {
					const data = item;
					data.callValue = item.callValue.toPrecision(4);
					data.residualRate = item.residualRate.toPrecision(3);
					data.delta = item.delta.toPrecision(3);
					data.gamma = item.gamma.toString().slice(0, 5);
					data.callBidPrice = item.callBidPrice.toPrecision(4);
					data.callAskPrice = item.callAskPrice.toPrecision(4);
					data.callSmvVol = item.callSmvVol.toPrecision(3);
					data.putSmvVol = item.putSmvVol.toPrecision(3);
					data.extSmvVol = item.extSmvVol.toPrecision(3);
					data.vega = item.vega.toPrecision(2);
					data.extCallValue = item.extCallValue.toPrecision(4);
					data.callMidIv = item.callMidIv.toPrecision(3);
					data.callAskIv = item.callAskIv.toPrecision(3);
					data.putValue = item.putValue.toString().slice(0, 4);
					data.putMidIv = item.putMidIv.toString().slice(0, 4);
					data.putAskIv = item.putAskIv.toString().slice(0, 4);
					data.quoteDate = item.quoteDate.slice(0, 10);
					data.snapShotDate = item.snapShotDate.slice(0, 10);
					const updateDate = new Date(item.updatedAt);
					const timeString = updateDate.toLocaleTimeString();
					const day = updateDate.getMonth();
					let twoDigitMonth;
					if (day.toString().length === 1) {
						twoDigitMonth = `0${day}`;
					} else {
						twoDigitMonth = day;
					}
					const updateDateString = `${updateDate.getFullYear()}-${twoDigitMonth}-${updateDate.getDate()} ${timeString}`;
					data.updatedAt = updateDateString;
					return data;
				});
				setTableData(filteredData);
			}
		});
	}, []);

	useEffect(() => {
		if (tableData) {
			setLoading(false);
		}
	}, [tableData]);

	const handleFilterSelection = (event) => {
		debugger;
		const name = event.target.name;
		let tempData = selectedFilterItems;
		if (tempData.includes(name)) {
			tempData = tempData.filter((item, index) => {
				if (item !== name) {
					return item;
				}
				return null;
			});
		} else {
			tempData.push(name);
		}
		setSelectedFilterItems([...tempData]);
	};

	const applyFilter = () => {
		debugger;
		let columnData = dataColumns;
		let tempData = [
			{
				title: "Ticker",
				width: 100,
				dataIndex: "ticker",
				key: "1111",
				fixed: "left",
			},
			{
				title: "Trade Date",
				width: 150,
				dataIndex: "tradeDate",
				key: "1112",
				fixed: "left",
			},
			{
				title: "Expiry Date",
				width: 150,
				dataIndex: "expirDate",
				key: "1113",
				fixed: "left",
			},
		];
		if (selectedFilterItems.length === 0) {
			tempData = columns;
		} else {
			debugger;
			columnData = columnData.filter((item, index) => {
				if (selectedFilterItems.includes(item.dataIndex)) {
					return item;
				}
				return null;
			});
			tempData = [...tempData, ...columnData];
		}

		setDataColumns([...tempData]);
	};

	return (
		<div id="stock-table">
			<h2 className="heading">Strikes information</h2>
			<div className="filter-container">
				<CustomFilter
					handleFilterSelection={handleFilterSelection}
					selectedFilterItems={selectedFilterItems}
					setSelectedFilterItems={setSelectedFilterItems}
					applyFilter={applyFilter}
				/>
			</div>
			{loading ? (
				<div className="loader-container">
					<div className="loader">
						<Space size="large">
							<Spin size="large" />
						</Space>
						<div className="loading-text">
							<span className="first-line">Loading...</span>
							<span className="second-line">Please wait</span>
						</div>
					</div>
				</div>
			) : (
				<div className="table-container">
					<Table
						columns={dataColumns}
						dataSource={tableData}
						scroll={{ x: 500 }}
						sticky
					/>
				</div>
			)}
		</div>
	);
};

export default StockTable;
