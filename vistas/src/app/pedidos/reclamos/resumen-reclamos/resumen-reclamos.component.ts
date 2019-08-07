import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resumen-reclamos',
  templateUrl: './resumen-reclamos.component.html',
  styleUrls: ['./resumen-reclamos.component.scss']
})
export class ResumenReclamosComponent implements OnInit {

  respuestaDetallePedido: any[]
  table_header: any

  constructor() { }

  ngOnInit() {
    this.table_header = [
      {
        cantidad: 'Cantidad',
        precio_llegada: 'Precio llegada',
        precio_pedido: 'Precio pedido',
        idReclamo: 'Reclamo',
        idPedido: 'Pedido',
        idMaterial: 'Material'
      }
    ]
  }

}
