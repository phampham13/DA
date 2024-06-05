import DataTable from "react-data-table-component";

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  table: {
    style: {
      marginTop: "0px",
    },
  },
  rows: {
    style: {
      minHeight: "72px",
      justifyContent: 'center', // override the row height
    },
  },
  headCells: {
    style: {
      backgroundColor: 'rgba(54, 163, 235, 0.1)',
      fontSize: "20px",
      borderBottomWidth: "1px",
      borderColor: "black",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontWeight: 500,
      fontFamily: "-apple-system,  BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell"
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

export default customStyles;
