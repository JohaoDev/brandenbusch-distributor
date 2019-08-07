import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss']
})
export class ReclamosComponent implements OnInit {

  table_header: any
  pedidosForm: FormGroup

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDataReclamos()

    this.table_header = [
      {
        id: 'N°',
        fecha: 'Fecha del Pedido',
      }
    ]
  }

    //PAGINA PRINCIPAL
    respuestaReclamos: any[]

    getDataReclamos = () => {
      let tabla = 'reclamo'
      this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
      .subscribe(data => {
          this.respuestaReclamos = data.datos
      })
    }
    //PAGINA PRINCIPAL

}
