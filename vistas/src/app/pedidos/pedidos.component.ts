import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  table_header: any
  pedidosForm: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formularioPedidos()

    this.getDataPedidos()
    this.getDataProveedores()

    this.table_header = [
      {
        id: 'N°',
        idproveedor: 'Proveedor',
        fecha: 'Fecha del Pedido',
        idestado: 'Estado'
      }
    ]

  }

  formularioPedidos(){
    this.pedidosForm = this.formBuilder.group({
      id: [''],
      idproveedor: ['',[Validators.required]],
      fecha: [''],
      total: ['',[Validators.required]],
    });
  }

  //PAGINA PRINCIPAL
  respuestaPedidos: any[]

  getDataPedidos = () => {
    let tabla = 'pedido'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
        this.respuestaPedidos = data.datos
    })
  }

  idPedidoVariable: number

  getDatabyID = (value) => {
    let tabla = 'pedido'
    this.http.get<any>(environment.API_URL + `byid?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { 
      this.idPedidoVariable = data.datos[0].id
      localStorage.setItem("id", this.idPedidoVariable.toString() )
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'pedido'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
    window.location.reload()
  }
  //PAGINA PRINCIPAL


  //MODAL NEW PEDIDO
  respuestaProveedores: any[]

  getDataProveedores = () => {
    let tabla = 'proveedor'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
        this.respuestaProveedores = data.datos
    })
  }
  
  postDataPedidos = () => {
    let idproveedor = this.pedidosForm.get('idproveedor').value
    let idestado = 2

    let tabla = 'pedido'
    let register = {tabla: tabla, datos: [{idproveedor: idproveedor, idestado: idestado}]}
    this.http.post(environment.API_URL, register)
    .subscribe( data => {  })
    window.location.reload()
  }
  //MODAL NEW PEDIDO

}
