import { AsyncPipe, NgComponentOutlet, NgForOf } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reports',
  imports: [
    NgComponentOutlet,
    AsyncPipe,
    NgForOf,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements AfterViewInit {

  schemas: any = [
    {
      name: 'DataGridComponent',
      inputs: {
        title: 'Data Grid Component',
      },
    },
    {
      name: 'AssetReportComponent',
      inputs: {
        title: 'Asset Report Component',
      },
    },
  ];

  componentManifest: Record<string, { load: () => Promise<unknown> }> = {
    DataGridComponent: {
      load: () => import('../../../components/data-grid/data-grid.component')
    },
  };


  constructor(private store: Store) {

  }

  ngAfterViewInit() {

  }

  load(component: string): any {
    return this.componentManifest[component].load().then((c: any) => {
      return (c as any)[component];
    });
  }

  loadComponents() {
    if (this.schemas?.length) {
      this.schemas.forEach((item: any) => {
        item['component'] = this.load(item.name);
      });
    }
  }
}
