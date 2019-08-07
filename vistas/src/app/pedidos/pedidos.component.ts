import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
}
