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
  reclamosForm: FormGroup

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getDataReclamos()

    this.table_header = [
      {
        id: 'N°',
        fecha: 'Fecha del Pedido',
      }
    ]
    this.formularioReclamos()
  }
  formularioReclamos(){
    this.reclamosForm = this.formBuilder.group({
      id: [''],
      fecha: [''],
      comentario:['']
    });
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
