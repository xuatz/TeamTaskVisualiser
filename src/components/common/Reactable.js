import React from "react";
import * as Table from "reactabular-table";
import * as resizable from "reactabular-resizable";
import styled from "styled-components";

import "reactabular-resizable/style.css";

const StyledCell = styled.td`
  border: 1px solid black;
  &:hover {
    background-color: #eee;
  }
`;

class Reactable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: this.getColumns()
		};

		this.tableHeader = null;
		this.tableBody = null;
	}

	componentWillMount() {
		this.resizableHelper = resizable.helper({
			getId: ({ property }) => property
		});

		// Patch the column definition with class names.
		this.setState({
			columns: this.resizableHelper.initialize(this.state.columns)
		});
	}

	componentWillUnmount() {
		this.resizableHelper.cleanup();
	}

	getColumns() {
		const resizableFormatter = resizable.column({
			onDragStart: (width, { column }) => {
				console.log("drag start", width, column);
			},
			onDrag: (width, { column }) => {
				this.resizableHelper.update({
					column,
					width
				});
			},
			onDragEnd: (width, { column }) => {
				console.log("drag end", width, column);
			}
		});

		return [
			{
				property: "_id",
				header: {
					label: "ID",
					formatters: [resizableFormatter]
				},
				width: 280
			},
			{
				property: "title",
				header: {
					label: "Title",
					formatters: [resizableFormatter]
				},
				width: 450
			},
			{
				property: "createdAt",
				header: {
					label: "Created At"
				},
				width: 180
			}
		];
	}

	getClassName(column, i) {
		return `column-${this.id}-${i}`;
	}

	render() {
		const { columns } = this.state;

		const stylingComponents = {
			body: {
				cell: StyledCell
			}
		};

		return (
			<Table.Provider
				components={stylingComponents}
				className="pure-table pure-table-striped"
				columns={columns}
				style={{ width: "auto" }}>
				<Table.Header
					style={{
						maxWidth: 800
					}}
					ref={tableHeader => {
						this.tableHeader = tableHeader && tableHeader.getRef();
					}}
				/>

				<Table.Body
					rows={this.props.tasks}
					rowKey="_id"
					onRow={this.onRow}
					style={{
						maxWidth: 800,
						maxHeight: 400
					}}
					ref={tableBody => {
						this.tableBody = tableBody && tableBody.getRef();
					}}
				/>
			</Table.Provider>
		);
	}
	onRow(row, { rowIndex }) {
		return {
			className: rowIndex % 2 ? "odd-row" : "even-row"
		};
	}
}

export default Reactable;
