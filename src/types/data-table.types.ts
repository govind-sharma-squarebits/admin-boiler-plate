import type { TableProps, TableColumn } from "react-data-table-component";

export interface CustomDataTableProps<T extends object>
  extends Omit<TableProps<T>, "columns" | "data"> {
  columns: TableColumn<T>[];
  data: T[];
  totalPages?: number;
  setPage?: (page: number) => void;
  page?: number;
  isLegendsShow?: boolean;
  isRowBorder?: boolean;
  tableHeight?: string;
}
