import { type TableStyles } from "react-data-table-component";

export const CustomStyle = (
  isRowBorder: boolean
): TableStyles => ({
  rows: {
    style: {
      fontSize: "14px",
      fontWeight: 500,
      minHeight: "72px",
      padding: "10px 0px",
      borderBottom: isRowBorder ? "1px solid #f0f0f0" : "none",
    },
  },

  expanderRow: {
    style: {
      padding: 0,
      margin: 0,
    },
  },
  expanderCell: {
    style: {
      padding: 0,
      borderTop: "none",
    },
  },

  headRow: {
    style: {
      width: "100%",
      backgroundColor: "#F9F9F9",
      borderBottom: "none",
      marginBottom: "8px",
      borderRadius: "10px",
      minHeight: "56px",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 600,
    },
  },
});
