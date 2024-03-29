import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTable, Column, CellProps, usePagination } from 'react-table';
import { useReportStore } from '../store/reportStore';
import LoadingSpinner from '../components/ui/LoadinSpinner';
import { IMessage } from '../types/report';
import Pagination from '../components/table/Pagination';
import Filter from '../components/table/Filter';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useChart } from '../hooks/useChart';

ChartJS.register(ArcElement, Tooltip, Legend);

type FilterType = {
  status: string;
  category: string;
};


const Dashboard: React.FC = () => {
  const rows = useReportStore(state => state.rows);
  const count = useReportStore(state => state.count);
  const getMessages = useReportStore(state => state.getMessages);
  const exportReport = useReportStore(state => state.exportReport);
  const isLoading = useReportStore(state => state.isLoading);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showCharts, setShowCharts] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChartType, setSelectedChartType] = useState<keyof FilterType>('category');

  const { data } = useChart(rows!, selectedChartType);


  const reportData = useMemo(() => rows && rows.length > 0 ? [...rows] : [], [rows]);
  const reportColumns: Column<IMessage>[] = useMemo(() => rows && rows.length > 0 ? Object.keys(rows[0]).map(key => {
    if (key === 'filePath') {
      return {
        Header: key as keyof IMessage,
        accessor: key as keyof IMessage,
        Cell: ({ value }: CellProps<IMessage>) => value ? (<a href={`${import.meta.env.VITE_STATIC_URL}/${value}`} download>Download file</a>) : null
      };
    }
    return {
      Header: key as keyof IMessage,
      accessor: key as keyof IMessage
    };
  }) : [], [rows]);


  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, } = useTable<IMessage>({ columns: reportColumns, data: reportData, manualPagination: true }, usePagination);


  const fetchData = useCallback(() => {
    getMessages(currentPage, 15);
  }, [currentPage]);

  useEffect(() => {
    fetchData();

  }, [currentPage]);


  const handleExport = async () => {
    await exportReport();
  };

  const toggleFiltersHandler = () => {
    setShowFilters((prev) => !prev);
  };

  const toggleChartsHandler = () => {
    setShowCharts((prev) => !prev);
  };

  const chartTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChartType(e.target.value);
  };

  return (
    <div className="dasboard">
      {isLoading && <LoadingSpinner />}
      <div className="container">
        <div className="dashboard__inner">
          <h1 className="title">Speak-up report</h1>
          <div className="dashboard__actions">
            <button onClick={toggleFiltersHandler} className="btn btn-filter">Filters</button>
            <button onClick={toggleChartsHandler} className="btn btn-filter">Show chart</button>
            <button onClick={handleExport} className="btn btn-export">Export</button>
          </div>
          <div className="dashboard__tools">
            {showCharts && <div className="chart-container">
              <Doughnut width="100%" height="100%" data={data} />
              <div className="chart-actions">
                <label className="form-label" htmlFor="chart">Chart by</label>
                <select name="chart" onChange={chartTypeHandler} value={selectedChartType}>
                  <option value="category">Category</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>}
            {showFilters && (

              <Filter />
            )}
          </div>
          <table className="table" {...getTableProps()}>
            <thead className="table__header">
              {headerGroups.map((headerGroup, index) => (
                <tr  {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th key={index} {...column.getHeaderProps}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: any) => {
                prepareRow(row);

                return <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => (
                    <td key={cell.getCellProps().key}>{cell.render("Cell")}</td>
                  ))}
                </tr>;
              })}
            </tbody>
          </table>
          <Pagination totalRows={count} pageChangeHandler={setCurrentPage} rowsPerPage={15} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;