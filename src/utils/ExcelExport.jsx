import React from 'react';
import * as XLSX from 'xlsx';

const ExcelExport = ({ data, filename }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, filename);
  };

  return (
    <button onClick={exportToExcel}>Export to Excel</button>
  );
};

export default ExcelExport;
