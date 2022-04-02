import React, { useState, useRef } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import Modal from 'react-modal';
import Forms from './forms';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const appElement = document.getElementById('root');
Modal.setAppElement('#root');

const App = () => {
  const [rowData, updateRowData] = useState([
    { username: 'int_jim', age: 18, password_digest: "a336411ebf69964e4c866397d20eafb38dd8ee24c57b835748494eb595dff324" },
    { username: 'admin', age: 12, password_digest: "113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3" },
    { username: 'customer', age: 28, password_digest: "29861272e715c7a9cc306bac209caf197b6fccd7e7087f4606fc6bed2e55e5e4" },
  ]);
  const gridRef = useRef(null);

  const [columnDefs] = useState([
    { field: 'username', sortable: true, filter: true, checkboxSelection: true, editable: true },
    { field: 'age', sortable: true, filter: true, editable: true },
    { field: 'password_digest', flex: 1},
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
    <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
      <button onClick={onButtonClick}>Delete selected rows</button>
      <Forms updateGridRow={updateRowData} />
      <AgGridReact 
        ref={gridRef}
        rowData={rowData} 
        columnDefs={columnDefs}
        rowSelection="multiple">
      </AgGridReact>
    </div>
  );
};

render(<App />, appElement);
