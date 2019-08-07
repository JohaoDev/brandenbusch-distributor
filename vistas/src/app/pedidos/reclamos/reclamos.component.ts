import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss']
})
export class ReclamosComponent implements OnInit {

  table_header: any
  pedidosForm: FormGroup

  constructor() { }

  ngOnInit() {
    this.table_header = [
      {
        id: 'N°',
        fecha: 'Fecha del Pedido',
      }
    ]
  }

}
