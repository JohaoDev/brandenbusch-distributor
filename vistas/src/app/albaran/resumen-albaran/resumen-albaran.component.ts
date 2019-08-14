import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumen-albaran',
  templateUrl: './resumen-albaran.component.html',
  styleUrls: ['./resumen-albaran.component.scss']
})
export class ResumenAlbaranComponent implements OnInit {

  detallealbaranForm: FormGroup
  table_header: any

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.getDataMateriales()
    this.getDataDetalleAlbaran()

    this.formularioDetalleAlbaran()

    this.table_header = [
      {
        idmaterial: 'Material',
        cantidad: 'cantidad',
        precio_llegada: 'Precio llegada',
        precio: 'Precio material'
      }
    ]
  }

  formularioDetalleAlbaran(){
    this.detallealbaranForm = this.formBuilder.group({
      id: [''],
      idalbaran: ['',[Validators.required]],
      cantidad: ['',[Validators.required]],
      precio_llegada: ['',[Validators.required]],
      idmaterial: ['',[Validators.required]],
    });
  }

  //PAGINA PRINCIPAL
  getLocalStorage(){
    let id = localStorage.getItem("id")
    return id
  }

  respuestaDetalleAlbaran: any[]

  getDataDetalleAlbaran = () => {
    this.http.get<any>(environment.API_URL + `AlbaranAPI?idalbaran=${this.getLocalStorage()}`)
    .subscribe(data => {
      this.respuestaDetalleAlbaran = data.datos
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'detalle_albaran'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
  }
  //PAGINA PRINCIPAL

  //MODAL DETALLE PEDIDO 
  respuestaMateriales

  getDataMateriales = () => {
    let tabla = 'material'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaMateriales = data.datos
    })
  }
  
  postDataDetalleAlbaran = () => {
    let idmaterial = this.detallealbaranForm.get('idmaterial').value
    let cantidad = this.detallealbaranForm.get('cantidad').value
    let precio_llegada = this.detallealbaranForm.get('precio_llegada').value

    let tabla = 'detalle_albaran'

    if(this.detallealbaranForm.invalid){
      Swal.fire({
        type: 'error',
        title: 'Ups!',
        text: 'Datos inválidos'
      })
    }else{
      let register = {tabla: tabla, datos: [{ 
                                              idmaterial: idmaterial, 
                                              cantidad: cantidad, 
                                              idalbaran: this.getLocalStorage(),
                                              precio_llegada: precio_llegada
                                            }]}
      this.http.post(environment.API_URL, register)
      .subscribe( data => { })
      window.location.reload()
    }
  }
  //MODAL DETALLE PEDIDO 

}
