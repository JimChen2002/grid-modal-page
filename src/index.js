import React, { useState, useRef } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {
  const [rowData, updateRowData] = useState([
    { username: 'int_jim', age: 18, password_digest: 35000 },
    { username: 'admin', age: 12, password_digest: 32000 },
    { username: 'customer', age: 28, password_digest: 72000 },
  ]);
  const gridRef = useRef(null);

  const [columnDefs] = useState([
    { field: 'username', sortable: true, filter: true, checkboxSelection: true, editable: true },
    { field: 'age', sortable: true, filter: true, editable: true },
    { field: 'password_digest' },
  ]);

  const onButtonClick = e => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    let newRowData = [];
    for (let i = 0, j = 0; i < rowData.length; i++) {
      if (j < selectedNodes.length && i == selectedNodes[j].rowIndex) {
        j++;
      }
      else {
        newRowData.push(rowData[i]);
      }
    }
    updateRowData(newRowData);
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <button onClick={onButtonClick}>Delete selected rows</button>
      <AgGridReact 
        ref={gridRef}
        rowData={rowData} 
        columnDefs={columnDefs}
        rowSelection="multiple">
      </AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById('root'));
