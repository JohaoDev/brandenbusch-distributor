import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resumen-reclamos',
  templateUrl: './resumen-reclamos.component.html',
  styleUrls: ['./resumen-reclamos.component.scss']
})
export class ResumenReclamosComponent implements OnInit {

  respuestaDetalleReclamo: any[]
  table_header: any
  detallereclamosForm: FormGroup

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.table_header = [
      {
        cantidad_pedido: 'Cantidad Pedida',
        cantidad_llegada: 'Cantidad Llegada',
        precio_pedido: 'Precio pedido',
        precio_llegada: 'Precio llegada',
        idreclamo: 'Reclamo',
        idpedido: 'Pedido',
        idmaterial: 'Material'
      }
    ]

    this.getDataDetallePedido()
    this.getDataMateriales()
    this.getDataPedidos()

    this.formularioDetalleReclamos()
  }

  formularioDetalleReclamos(){
    this.detallereclamosForm = this.formBuilder.group({
      id: [''],
      cantidad_pedido: ['',[Validators.required]],
      cantidad_llegada: ['',[Validators.required]],
      precio_pedido: ['',[Validators.required]],
      precio_llegada: ['',[Validators.required]],
      idreclamo: [''],
      idpedido: ['',[Validators.required]],
      idmaterial: ['',[Validators.required]]
    });
  }

  //PAGINA PRINCIPAL
  getLocalStorage(){
    let id = localStorage.getItem("id")
    return id
  }

  getDataDetallePedido = () => {
    this.http.get<any>(environment.API_URL + `ReclamosAPI?idreclamo=${this.getLocalStorage()}`)
    .subscribe(data => {
      this.respuestaDetalleReclamo = data.datos
    })
    console.log(this.respuestaDetalleReclamo)
  }

  deleteDataTable = (value) => {
    let tabla = 'detalle_reclamo'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
  }
  //PAGINA PRINCIPAL


  //MODAL DETALLE RECLAMO
  respuestaMateriales: any[]

  getDataMateriales = () => {
    let tabla = 'material'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaMateriales = data.datos
    })
  }

  respuestaPedidos: any[]

  getDataPedidos = () => {
    let tabla = 'pedido'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaPedidos = data.datos
    })
  }

  postDataDetallePedidos = () => {
    let cantidad_pedido = this.detallereclamosForm.get('cantidad_pedido').value
    let cantidad_llegada = this.detallereclamosForm.get('cantidad_llegada').value
    let precio_pedido = this.detallereclamosForm.get('precio_pedido').value
    let precio_llegada = this.detallereclamosForm.get('precio_llegada').value
    let idpedido = this.detallereclamosForm.get('idpedido').value
    let idmaterial = this.detallereclamosForm.get('idmaterial').value

    let tabla = 'detalle_reclamo'
    let register = {tabla: tabla, datos: [{ 
                                            cantidad_pedido: cantidad_pedido,
                                            cantidad_llegada: cantidad_llegada,
                                            precio_pedido: precio_pedido, 
                                            precio_llegada: precio_llegada, 
                                            idpedido: idpedido,
                                            idmaterial: idmaterial,
                                            idreclamo: this.getLocalStorage()
                                          }]}
    this.http.post(environment.API_URL, register)
    .subscribe( data => { })
    window.location.reload()
  }
  //MODAL DETALLER RECLAMO
}
