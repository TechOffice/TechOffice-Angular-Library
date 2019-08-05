import { ExampleRenderComponent } from './example-render/example-render.component';
import { Component } from '@angular/core';
import { GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = 'app';

  columnDefs = [
      {headerName: 'Col1', field: 'col1'},
      {headerName: 'Col2', field: 'col2'},
      {headerName: 'Col3', field: 'col3', 
        cellRendererFramework: ExampleRenderComponent,
        cellStyle: { "overflow": 'visible' }
      }
  ];

  rowData = [
      { col1: 'Data 11', col2: 'Data 12', col3: 'Data 13' },
      { col1: 'Data 21', col2: 'Data 22', col3: 'Data 23' },
      { col1: 'Data 31', col2: 'Data 32', col3: 'Data 33' }
  ];

  gridOptions: GridOptions = <GridOptions> {
    rowHeight: 100
  }

  gridReady(param: GridReadyEvent){
    param.api.sizeColumnsToFit();
  }
}
