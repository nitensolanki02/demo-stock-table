import React, { useEffect, useState } from "react";
import { filterOptions } from "../columns";
import "./scss/CustomFilter.scss";

const CustomFilter = (props) => {
	const [showFilter, setShowFilter] = useState(false);

	const isChecked = (filterItem) => {
		debugger;
		if (props.selectedFilterItems.includes(filterItem)) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		const filterContainer = document.querySelector("#custom-filter");
		document.addEventListener("click", (event) => {
			if (!filterContainer.contains(event.target)) {
				setShowFilter(false);
				return true;
			}
			return false;
		});
	});
	return (
		<div id="custom-filter">
			<div
				className="filter-text"
				onClick={() => {
					setShowFilter(!showFilter);
				}}
			>
				<button
					className={`filter-btn ${
						props.selectedFilterItems.length || showFilter
							? "active-filter"
							: ""
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						enableBackground="new 0 0 24 24"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
						className="filter-icon"
					>
						<g>
							<path d="M0,0h24 M24,24H0" fill="none" />
							<path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" />
							<path d="M0,0h24v24H0V0z" fill="none" />
						</g>
					</svg>
					<span
						className={`text ${
							props.selectedFilterItems.length || showFilter
								? "active-filter-text"
								: ""
						}`}
					>
						{props.selectedFilterItems.length
							? "Filters applied"
							: "Apply filters"}
					</span>
				</button>
			</div>
			<div
				className={`filter-items ${showFilter ? "open-filter-container" : ""}`}
			>
				{filterOptions.map((item, index) => {
					return (
						<div className="label-container" key={index}>
							<label className="custom-checkbox-container">
								<input
									type="checkbox"
									id={item.dataIndex}
									name={item.dataIndex}
									checked={isChecked(item.dataIndex)}
									onChange={(event) => props.handleFilterSelection(event)}
								/>
								<div className="text">{item.title}</div>
							</label>
						</div>
					);
				})}
				<div className="apply-btn-container">
					<button
						className="btn"
						onClick={() => {
							props.applyFilter();
							setShowFilter(!showFilter);
						}}
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
};

export default CustomFilter;
