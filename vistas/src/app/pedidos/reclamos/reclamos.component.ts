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

    this.formularioReclamos()

    this.table_header = [
      {
        id: 'N°',
        fecha: 'Fecha del Reclamo',
        comentario: 'Comentario'
      }
    ]
  }

  formularioReclamos(){
    this.reclamosForm = this.formBuilder.group({
      id: [''],
      fecha: [''],
      comentario:['',[Validators.required]]
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

  idReclamoVariable: number

  getDatabyID = (value) => {
    let tabla = 'reclamo'
    this.http.get<any>(environment.API_URL + `byid?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { 
      this.idReclamoVariable = data.datos[0].id
      localStorage.setItem("id", this.idReclamoVariable.toString() )
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'reclamo'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
    window.location.reload()
  }
  //PAGINA PRINCIPAL

  //MODAL NEW RECLAMO
  postDataReclamos = () => {
    let comentario = this.reclamosForm.get('comentario').value

    let tabla = 'reclamo'
    let register = {tabla: tabla, datos: [{comentario: comentario}]}
    this.http.post(environment.API_URL, register)
    .subscribe( data => { })
    window.location.reload()
  }
  //MODAL NEW RECLAMO


}
