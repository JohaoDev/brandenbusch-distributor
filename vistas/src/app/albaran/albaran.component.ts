import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-albaran',
  templateUrl: './albaran.component.html',
  styleUrls: ['./albaran.component.scss']
})
export class AlbaranComponent implements OnInit {

  table_header: any
  albaranForm: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formularioAlbaran()

    this.getDataAlbaran()
    this.getDataPedidos()

    this.table_header = [
      {
        id: 'N°',
        idpedido: 'Pedido',
        fecha_entrega: 'Fecha',
        idestado: 'Estado'
      }
    ]

  }

  formularioAlbaran(){
    this.albaranForm = this.formBuilder.group({
      id: [''],
      idpedido: ['',[Validators.required]],
      fecha_entrega: [''],
      idestado: [''],
    });
  }

  //PAGINA PRINCIPAL
  respuestaAlbaran: any[]

  getDataAlbaran = () => {
    this.http.get<any>(environment.API_URL + `Albaran`)
    .subscribe(data => {
      this.respuestaAlbaran = data.datos
    })
  }

  idAlbaranVariable: number

  getDatabyID = (value) => {
    let tabla = 'albaran'
    this.http.get<any>(environment.API_URL + `byid?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { 
      this.idAlbaranVariable = data.datos[0].id
      localStorage.setItem("id", this.idAlbaranVariable.toString() )
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'albaran'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
    window.location.reload()
  }
  //PAGINA PRINCIPAL


  //MODAL NEW ALBARAN
  respuestaPedidos: any[]

  getDataPedidos = () => {
    this.http.get<any>(environment.API_URL + `PedidosModalDetalle`)
    .subscribe(data => {
      this.respuestaPedidos = data.datos
    })
  }

  postDataAlbaran = () => {
    let idpedido = this.albaranForm.get('idpedido').value
    let idestado = 2

    let tabla = 'albaran'
    let register = {tabla: tabla, datos: [{idpedido: idpedido, idestado: idestado}]}
    this.http.post(environment.API_URL, register)
    .subscribe( data => {  })
    window.location.reload()
  }
  //MODAL NEW PEDIDO

}