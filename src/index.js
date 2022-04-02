import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {
  const [rowData] = useState([
    { username: 'int_jim', age: 18, password_digest: 35000 },
    { username: 'admin', age: 12, password_digest: 32000 },
    { username: 'customer', age: 28, password_digest: 72000 },
  ]);

  const [columnDefs] = useState([
    { field: 'username', sortable: true, filter: true },
    { field: 'age', sortable: true, filter: true},
    { field: 'password_digest' },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById('root'));
