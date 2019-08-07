import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    this.table_header = [
      {
        id: 'N°',
        idproveedor: 'Proveedor',
        fecha: 'Fecha del Pedido',
        total: 'Total'
      }
    ]
    this.pedidosForm = this.formBuilder.group({
      id: [Validators.required],
      idproveedor: [Validators.required],
      apellidos: [Validators.required],
      fecha: [Validators.required],
      total: [Validators.required],
    });
  }


  //PAGINA PRINCIPAL
  respuesta: any[]

  getDataProveedores = () => {
    let tabla = 'proveedor'
    this.http.get<any>(environment.API_URL + `${tabla}`)
        .subscribe(data => {
            this.respuesta = data.datos
        })
  }

  nuevafecha = new Date()
  fecha_orden = this.nuevafecha.getDate() + "/" + (this.nuevafecha.getMonth() +1) + "/" + this.nuevafecha.getFullYear()
  idproveedor = this.pedidosForm.get('idproveedor').value

  postDataPedidos = () => {
    let tabla = 'pedido'
    let register = {tabla: tabla, datos: [{fecha: this.fecha_orden, idproveedor: this.idproveedor}]}
    this.http.post(environment.API_URL, register)
    .subscribe( data => {
      // this.postData = data
    })
    window.location.reload()
  }

  //PAGINA PRINCIPAL

}
