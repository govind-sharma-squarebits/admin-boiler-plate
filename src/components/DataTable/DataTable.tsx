import DataTable, { type TableColumn } from "react-data-table-component";

import type { CustomDataTableProps } from "../../types";
import { Pagination } from "./Pagination";
import { CustomStyle } from "./tableStyle";

/**
 * CustomDataTable component that wraps react-data-table-component with custom styling
 * @template T - Type of data object
 * @param props - DataTableProps containing columns, data and other table configuration
 * @returns Styled data table with pagination
 */

const legend = [
  {
    color: "#81c784", // success.light equivalent
    label: "Admin Registration",
  },
  {
    color: "var(--color-accent)", // customColors.orange equivalent
    label: "Self Registration",
  },
];

export const CustomDataTable = <T extends object>(
  props: CustomDataTableProps<T>,
) => {
  const {
    columns,
    data,
    selectableRows,
    onRowClicked,
    totalPages,
    setPage,
    page,
    isLegendsShow = false,
    isRowBorder = true,
    tableHeight = "300px",
    ...restProps
  } = props;

  return (
    <div className="flex flex-col justify-between h-[calc(100%-70px)]">
      <DataTable
        className="data-table hidden-scrollbar"
        style={{ overflow: "hidden" }}
        fixedHeader
        customStyles={CustomStyle(isRowBorder)}
        fixedHeaderScrollHeight={`calc(100vh - ${tableHeight})`}
        columns={columns as TableColumn<T>[]}
        data={data}
        selectableRows={selectableRows}
        onRowClicked={onRowClicked}
        {...restProps}
      />

      <div className={`flex items-center min-h-[48px] p-2 ${isLegendsShow ? 'justify-between' : 'justify-end'}`}>
        {isLegendsShow && (
          <div className="flex gap-6">
            {legend.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-sm text-gray-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {totalPages && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            setPage={setPage || (() => {})}
            page={page || 1}
          />
        )}
      </div>
    </div>
  );
};
