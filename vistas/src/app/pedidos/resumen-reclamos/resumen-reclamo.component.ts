import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resumen-reclamo',
  templateUrl: './resumen-reclamo.component.html',
  styleUrls: ['./resumen-reclamo.component.scss']
})
export class ResumenReclamoComponent implements OnInit {

  respuestaDetallePedido: any[]
  table_header: any

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.table_header = [
      {
        idreclamo: 'Código del reclamo',
        cantidad: 'Cantidad',
        preciopedido: 'Precio Emitido',
        preciodellegada: 'Precio De Llegada',
        idpedido: 'Código del pedido',
        idmaterial:'Código del material',
      }
    ]
  }

  getLocalStorage(){
    let id = localStorage.getItem("id")
    return id
  }

  getDetallePedido = () => {
    let tabla = "detalle_reclamo"
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}&id=${this.getLocalStorage()}`)
    .subscribe(data => {
      this.respuestaDetallePedido = data.datos
    })
  }
  deleteDataTable = (value) => {
    let tabla = 'detalle_reclamo'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
  }
}
