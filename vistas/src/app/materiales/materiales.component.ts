import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent implements OnInit {

  materialesForm: FormGroup
  table_header:any

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.getDataMaterial()
    this.getDataProveedor()
    this.getDataUbicacion()

    this.formularioMateriales()

    this.table_header = [
      {
        nombre_empresa: 'Empresa',
        representante: 'Representante Legal',
        nombre_material: 'Material',
        descripcion: 'Descripcion',
        fecha_registro: 'Fecha de Ingreso',
        precio: 'Precio $',
        ubicacion: 'Ubicación',
      }
    ]
  }

  formularioMateriales(){
    this.materialesForm = this.formBuilder.group({
      id: [''],
      nombre: ['',[Validators.required, Validators.pattern('[A-Za-zñÑ]{3,30}')]],
      descripcion: ['',[Validators.required, Validators.pattern('[A-Za-zñÑ]{3,150}')]],
      fecha_registro: ['',[Validators.required]],
      fecha_actualizacion: ['',[Validators.required]],
      precio: ['',[Validators.required, Validators.pattern('[0-9]')]],
      idubicacion: ['',[Validators.required]],
      idproveedor: ['',[Validators.required]],
    });
  }

  //Pagina Principal
  respuestaMateriales:any[]

  getDataMaterial = () => {
    this.http.get<any>(environment.API_URL + `MaterialesAPI`)
    .subscribe(data => {
      this.respuestaMateriales = data.datos
    })
  }  

  deleteDataTable = (value) => {
    let tabla = 'material'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&id=${value}`)
    .subscribe( data => { })
    window.location.reload()
  }
  //Pagina Principal

  //MODAL NEW MATERIAL
  postDataMateriales = () => {
    let nombre = this.materialesForm.get('nombre').value
    let descripcion = this.materialesForm.get('descripcion').value
    let precio = this.materialesForm.get('precio').value
    let idubicacion = this.materialesForm.get('idubicacion').value
    let idproveedor = this.materialesForm.get('idproveedor').value

    let tabla = 'material'

    if(this.materialesForm.invalid){
      Swal.fire({
        type: 'error',
        title: 'Ups!',
        text: 'Datos inválidos'
      })
    }else{
      let register = {tabla: tabla, datos: [{
                                              nombre: nombre, 
                                              descripcion: descripcion, 
                                              precio: precio, 
                                              idubicacion: idubicacion, 
                                              idproveedor: idproveedor
                                            }]}
      this.http.post(environment.API_URL, register)
      .subscribe( data => { })
      window.location.reload()
    }
  }

  respuestaProveedor: any[]

  getDataProveedor = () => {
    let tabla = 'proveedor'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaProveedor = data.datos
    })
  } 

  respuestaUbicaciones: any[]

  getDataUbicacion = () => {
    let tabla = 'ubicacion'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaUbicaciones = data.datos
    })
  }  
  //MODAL NEW MATERIAL

}
