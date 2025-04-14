import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, FirstDataRenderedEvent, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([ AllCommunityModule ]);

interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

@Component({
  selector: 'app-data-grid',
  imports: [
    AgGridAngular
  ],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss'
})
export class DataGridComponent implements OnInit {

  @Input({ required: true }) title!: string;

  // Row Data: The data to be displayed.
  rowData: IRow[] = [];

  sample = [
    {
      'mission': 'CRS SpX-25',
      'company': 'SpaceX',
      'location': 'LC-39A, Kennedy Space Center, Florida, USA',
      'date': '2022-07-15',
      'time': '0:44:00',
      'rocket': 'Falcon 9 Block 5',
      'price': 12480000,
      'successful': true
    },
    {
      'mission': 'LARES 2 & Cubesats',
      'company': 'ESA',
      'location': 'ELV-1, Guiana Space Centre, French Guiana, France',
      'date': '2022-07-13',
      'time': '13:13:00',
      'rocket': 'Vega C',
      'price': 4470000,
      'successful': true
    },
    {
      'mission': 'Wise One Looks Ahead (NROL-162)',
      'company': 'Rocket Lab',
      'location': 'Rocket Lab LC-1A, Māhia Peninsula, New Zealand',
      'date': '2022-07-13',
      'time': '6:30:00',
      'rocket': 'Electron/Curie',
      'price': 9750000,
      'successful': true
    },
    {
      'mission': 'TROPICS Flight 1',
      'company': 'Astra',
      'location': 'SLC-46, Cape Canaveral SFS, Florida, USA',
      'date': '2022-07-12',
      'time': '17:43:00',
      'rocket': 'Rocket 3',
      'price': 3670000,
      'successful': false
    }
  ];
  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    { field: 'mission' },
    { field: 'company' },
    { field: 'location' },
    { field: 'date' },
    { field: 'price' },
    { field: 'successful' },
    { field: 'rocket' },
  ];

  // Load data into grid when ready
  constructor(private http: HttpClient) {

  }

  ngOnInit() {

  }

  loadData() {
    this.rowData = this.sample;
  }

  onGridReady(params: GridReadyEvent) {
    this.loadData();
    // this.http.get<any[]>('https://www.ag-grid.com/example-assets/space-mission-data.json')
    //   .subscribe((data) => {
    //     console.log('onGridReady', this.sample);
    //     this.rowData = this.sample;
    //   });
  }

  gridInitialized($event: FirstDataRenderedEvent<IRow>) {
    console.log('ag grid first data rendered', $event);
  }
}
