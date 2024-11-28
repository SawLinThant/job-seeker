import { useEffect, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React from 'react';
import { MenuItem } from '@mui/material';
// import { jsPDF } from "jspdf"; //or use your library of choice here
// import autoTable from "jspdf-autotable";

import Link from 'next/link';
import { FiEye } from 'react-icons/fi';

// import ViewAction from "./actions/ViewAction";
// import TitleTotalList from "./ui/TitleTotalList";
// import TotalBetAmountMMK from "./ui/TotalBetAmountMMK";

// import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
// const csvConfig = mkConfig({
//   fieldSeparator: ',',
//   decimalSeparator: '.',
//   useKeysAsHeaders: true,
// });
//If using TypeScript, define the shape of your data (optional, but recommended)

//mock data - strongly typed if you are using TypeScript (optional, but recommended)

const ReactMaterialTable: React.FC<any> = ({
  column,
  data,
  totalCount,
  isRefetching,
  pagination,
  setPagination,
  error,
  isShowAction,
  total,
  menuType,
  betTabIndex,
  globalFilter,
  setGlobalFilter,
  showGlobalFilter,
  viewActionRoute,
}) => {
  // const handleExportRows = (rows) => {
  //   const doc = new jsPDF();
  //   const tableData = rows.map((row) => Object.values(row.original));
  //   const tableHeaders = column.map((c) => c.header);

  //   autoTable(doc, {
  //     head: [tableHeaders],
  //     body: tableData,
  //   });

  //   doc.save("mrt-pdf-example.pdf");
  // };

  const [dataRow, setRowData] = useState([]);

  useEffect(() => {
    setRowData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns: column,
    data: data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: showGlobalFilter ? true : false, //turn off a feature
    // enableRowSelection: true,
    // localization: {
    //   actions: Actions,
    // },

    enableRowOrdering: false,

    enableRowSelection: false,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableColumnOrdering: true,
    enableStickyHeader: true,
    enableStickyFooter: true,

    enableFilterMatchHighlighting: true,
    manualPagination: true,
    // muiCircularProgressProps: {
    //   Component: <MyCustomSpinner />,
    // },
    // muiLinearProgressProps: {
    //   color: "error",
    // },
    // muiCircularProgressProps: {
    //   color: "error",
    // },

    defaultDisplayColumn: {
      enableResizing: true, //turn on some features that are usually off for all display columns
    },

    muiTableBodyRowProps: ({ row, table }) => {
      const { density } = table.getState();
      return {
        sx: {
          cursor: 'pointer',

          //Set a fixed height for pinned rows
          height: row.getIsPinned()
            ? `${
                //Default mrt row height estimates. Adjust as needed.
                density === 'compact' ? 37 : density === 'comfortable' ? 53 : 69
              }px`
            : undefined,
        },
        onClick: (event) => {},
      };
    },

    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          // dataRow.splice(
          //   hoveredRow.index,
          //   0,
          //   dataRow.splice(draggingRow.index, 1)[0]
          // );
          setRowData([...dataRow]);
        }
      },
    }),

    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: '#F0F9FF',
        color: '#197CC0',
        whiteSpace: 'unset',

        // "& .MuiTableSortLabel-icon": {
        //   color: "white !important",
        // },
      },
    },
    muiTableFooterCellProps: {
      sx: {
        backgroundColor: '#197CC0',
        color: 'white',
        whiteSpace: 'unset',

        // "& .MuiTableSortLabel-icon": {
        //   color: "white !important",
        // },
      },
    },

    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
      showColumnFilters: false, // false/true
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    //customize the MRT components
    muiPaginationProps: {
      rowsPerPageOptions: [10, 50, 100],
      variant: 'outlined',
    },
    enableRowActions: true,
    enableColumnActions: true,
    positionActionsColumn: 'last',
    muiSelectCheckboxProps: {
      color: 'error',
    },
    muiSelectAllCheckboxProps: {
      color: 'error',
    },
    muiFilterTextFieldProps: {
      sx: { m: '0.5rem 0', width: '100%' },
      variant: 'outlined',
    },
    //   <Link to={`/admins/edit/${body._id}`} className="px-2">
    //   <EditIcon />
    // </Link>
    renderRowActions: ({ row }) => {

      return (
        <div>
          {viewActionRoute && (
            <Link href={`${viewActionRoute}/${row?.original?.id}`}>
              <FiEye className="text-[#667085]" size={20} />
            </Link>
          )}
        </div>
      );
    },

    renderRowActionMenuItems: ({ row }) => [
      <MenuItem key="edit" onClick={() => console.info('Edit')}>
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={() => console.info('Delete')}>
        Delete
      </MenuItem>,
    ],
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Box
    //     sx={{
    //       display: "flex",
    //       gap: "16px",
    //       padding: "8px",
    //       flexWrap: "wrap",
    //     }}
    //   >
    //     <Button
    //       sx={{ color: "#197CC0" }}
    //       //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
    //       onClick={handleExportData}
    //       startIcon={<FileDownloadIcon />}
    //     >
    //       Export All Data
    //     </Button>
    //     <Button
    //       sx={{ color: "#197CC0" }}
    //       disabled={table.getPrePaginationRowModel().rows.length === 0}
    //       //export all rows, including from the next page, (still respects filtering and sorting)
    //       onClick={() =>
    //         handleExportRows(table.getPrePaginationRowModel().rows)
    //       }
    //       startIcon={<FileDownloadIcon />}
    //     >
    //       Export All Rows
    //     </Button>
    //     <Button
    //       sx={{ color: "#197CC0" }}
    //       disabled={table.getRowModel().rows.length === 0}
    //       //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
    //       onClick={() => handleExportRows(table.getRowModel().rows)}
    //       startIcon={<FileDownloadIcon />}
    //     >
    //       Export Page Rows
    //     </Button>
    //     <Button
    //       sx={{ color: "#197CC0" }}
    //       disabled={
    //         !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
    //       }
    //       //only export selected rows
    //       onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
    //       startIcon={<FileDownloadIcon />}
    //     >
    //       Export Selected Rows
    //     </Button>
    //   </Box>
    // ),

    renderTopToolbarCustomActions: ({ table }) => (
      <>
        {false ? (
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              padding: '8px',
              flexWrap: 'wrap',
            }}
          >
            <Button
              sx={{ color: '#197CC0' }}
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              //export all rows, including from the next page, (still respects filtering and sorting)
              // onClick={() =>
              //   handleExportRows(table.getPrePaginationRowModel().rows)
              // }
              startIcon={<FileDownloadIcon />}
            >
              Export All Rows
            </Button>
            <Button
              sx={{ color: '#197CC0' }}
              disabled={table.getRowModel().rows.length === 0}
              //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
              // onClick={() => handleExportRows(table.getRowModel().rows)}
              startIcon={<FileDownloadIcon />}
            >
              Export Page Rows
            </Button>
            <Button
              sx={{ color: '#197CC0' }}
              disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
              //only export selected rows
              // onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
            >
              Export Selected Rows
            </Button>
          </Box>
        ) : (
          <div>Total {totalCount}</div>
        )}
      </>
    ),
    renderBottomToolbarCustomActions: ({ table }) => (
      <>
        <div>Total {totalCount}</div>
      </>
    ),
    onPaginationChange: setPagination,
    rowCount: totalCount,
    onGlobalFilterChange: setGlobalFilter,

    state: {
      pagination,
      isLoading: isRefetching,
      showAlertBanner: error,
      showProgressBars: isRefetching,
      globalFilter,
    },
    muiToolbarAlertBannerProps: error
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
  // return <></>;
};

export default ReactMaterialTable;
