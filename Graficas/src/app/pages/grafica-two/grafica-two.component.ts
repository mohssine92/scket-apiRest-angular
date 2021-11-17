
import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { ChartDataSets , ChartType } from 'chart.js';
import {  Label } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { GraficaTwoService } from '../../services/grafica-two.service';

// https://www.youtube.com/watch?v=w-E39ta-a9A 
// fernando herrera 
@Component({
  selector: 'app-grafica-two',
  templateUrl: './grafica-two.component.html',
  styleUrls: ['./grafica-two.component.css']
})
export class GraficaTwoComponent implements OnInit {
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0 ], label: 'Ventas' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
   // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April'];
  


  constructor(
    private http: HttpClient,
    public graficaTwoService : GraficaTwoService,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.escucharSocket();
  
  }

  getData() {  
    // usando modulo http para hacer peticion http - si son muchas peticiones al mismo dominio - centralizamos las peticiones en un  servicio y esto es todo .
    this.http.get(environment.wsUrl+'/grafica')
        .subscribe( (data: any) => this.lineChartData = data  );
  }

  escucharSocket() {
    this.graficaTwoService.escucharCambiosGrafica()
        .subscribe( (data: any ) => this.lineChartData = data); 
  } // jamas olvidar dispara metodos que inicia observables realtime en el momento del build del componente que le interesa la escucha 
  

  
 

 


}


  // TODO: dispara data cada tiempo , example , usado en ngOnit

    // setInterval( () => {
    //   const newData = [
    //     Math.round( Math.random() * 100 ),
    //     Math.round( Math.random() * 100 ),
    //     Math.round( Math.random() * 100 ),
    //     Math.round( Math.random() * 100 )
    //   ];
    //   this.lineChartData = [
    //     {data: newData, label: 'ventas'}
    //   ]
    // }, 3000)
