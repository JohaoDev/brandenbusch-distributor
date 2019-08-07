import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resumen-reclamo',
  templateUrl: './resumen-pedido.reclamo.html',
  styleUrls: ['./resumen-reclamo.component.scss']
})
export class ResumenReclamoComponent implements OnInit {

  respuestaDetallePedido: any[]
  table_header: any

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.table_header = [
      {
        idpedido: 'Código del pedido',
        idmaterial: 'Material',
        nombre: 'Nombre',
        cantidad: 'Cantidad',
        precio: 'Precio'
      }
    ]
  }

  getLocalStorage(){
    let id = localStorage.getItem("id")
    return id
  }

  getDetallePedido = () => {
    let tabla = "detalle_pedido"
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}&id=${this.getLocalStorage()}`)
    .subscribe(data => {
      this.respuestaDetallePedido = data.datos
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'ordenes_detalle'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
  }

}
