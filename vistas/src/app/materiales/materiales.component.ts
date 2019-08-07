import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    this.formularioMateriales()
    this.table_header = [
      {
        id: 'N°',
        nombre: 'Nombre',
        descripcion: 'Descripcion',
        fecha_registro: 'Fecha de Ingreso',
        fecha_actualizacion: 'Fecha de Actualizacion',
        precio: 'Costo',
        idNicho: 'Almacenamiento',
        idProveedor: 'Proveedor'
      }
    ]
  }
  formularioMateriales(){
    this.materialesForm = this.formBuilder.group({
      id: [''],
      nombre: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      fecha_registro: ['',[Validators.required]],
      fecha_actualizacion: ['',[Validators.required]],
      precio: ['',[Validators.required]],
      idNicho: ['',[Validators.required]],
      idProveedor: ['',[Validators.required]],

    });
  }
//Pagina Principal
respuesta:any[]
  getDataPedidos = () => {
    let tabla = 'material'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
        this.respuesta = data.datos
    })
  }  
  deleteDataTable = (value) => {
    let tabla = 'material'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&id=${value}`)
    .subscribe( data => { })
    window.location.reload()
  }
  postDataMateriales = () => {
    let nombre = this.materialesForm.get('nombre').value
    let descripcion = this.materialesForm.get('descripcion').value
    let fecha_registro = this.materialesForm.get('fecha_registro').value
    let fecha_actualizacion = this.materialesForm.get('fecha_actualizacion').value
    let precio = this.materialesForm.get('precio').value
    let idNicho = this.materialesForm.get('idNicho').value
    let idProveedor = this.materialesForm.get('idProveedor').value
    let returning
    let tabla = 'material'
    let register = {tabla: tabla, datos: [{nombre: nombre, descripcion: descripcion, fecha_registro: fecha_registro, fecha_actualizacion: fecha_actualizacion, precio: precio, idNicho : idNicho, idProveedor:idProveedor}]}
    this.http.post(environment.API_URL, register)
    .subscribe( data => { 
      returning = data
    })
    console.log(returning)
    window.location.reload()
  }
}
