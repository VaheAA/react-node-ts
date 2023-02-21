import { ReactElement, useEffect, useMemo } from 'react';
import { useTable, Column, CellProps } from 'react-table';
import { useReportStore } from '../store/reportStore';
import LoadingSpinner from '../components/ui/LoadinSpinner';
import { IMessage } from '../types/report';


const Dashboard: React.FC = () => {
  const report = useReportStore(state => state.report);
  const getMessages = useReportStore(state => state.getMessages);
  const isLoading = useReportStore(state => state.isLoading);

  useEffect(() => {
    getMessages();
  }, []);

  const reportData = useMemo(() => report ? [...report] : [], [report]);
  const reportColumns: Column<IMessage>[] = useMemo(() => report ? Object.keys(report[0]).map(key => {
    if (key === 'filePath') {
      return {
        Header: key as keyof IMessage,
        accessor: key as keyof IMessage,
        Cell: ({ value }: CellProps<IMessage>): ReactElement => <a href={`${import.meta.env.VITE_STATIC_URL}/${value}`} download>Download file</a>
      };
    }
    return {
      Header: key as keyof IMessage,
      accessor: key as keyof IMessage
    };
  }) : [], [report]);



  const tableInstance = useTable<IMessage>({ columns: reportColumns, data: reportData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="dasboard">
      {isLoading && <LoadingSpinner />}
      <div className="container">
        <div className="dashboard__inner">
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
              {rows.map(row => {
                prepareRow(row);

                return <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.getCellProps().key}>{cell.render("Cell")}</td>
                  ))}
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;