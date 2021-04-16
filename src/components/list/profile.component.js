import React, { Fragment, useMemo } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import { COLUMNS } from './column'
import { GlobalFilter } from './GlobalFilter';
import MOCK_DATA from './MOCK_DATA.json'
import {  Link } from "react-router-dom";
import {connect} from 'react-redux';


function Profile(props) {
    console.log(0)
    console.log(props.result.data);
    const columns = useMemo(() => COLUMNS, [])
    //const data = useMemo(() => MOCK_DATA, [])
    const data = useMemo(() => props.result.data, []);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        prepareRow,
        rows,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state : { pageIndex, pageSize, globalFilter},
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 }
        },
        
        useGlobalFilter,
        useSortBy,
        usePagination
    );


    return (
        <Fragment>
            <Link to="/add-user"  ><a><button className="addUserBtn">Add User</button></a></Link>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {">>"}
                </button>{" "}
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageCount}
                    </strong>{" "}
                </span>
                <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </span>{" "}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[2, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

        </Fragment>
    )
}

const mapStateToProps = state => {
    
    return {
        result: state.createReducer
    };
  };

  export default connect(
    mapStateToProps,
    null, 
    )(Profile)

