import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.scss']
})
export class UbicacionesComponent implements OnInit {

  table_header: any
  ubicacionForm: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    this.getDataUbicacion()
    this.formularioUbicacion()

    this.table_header = [
      {
        id: 'N°',
        nombre: 'Nombre',
      }
    ]

  }

  formularioUbicacion(){
    this.ubicacionForm = this.formBuilder.group({
      id: [''],
      nombre: ['',[Validators.required, Validators.pattern('[A-Za-zñÑ]{3,30}')]]
    });
  }

    //PAGINA PRINCIPAL
    respuestaUbicaciones: any[]

    getDataUbicacion = () => {
      let tabla = 'ubicacion'
      this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
      .subscribe(data => {
        this.respuestaUbicaciones = data.datos
      })
    }
  
    deleteDataTable = (value) => {
      let tabla = 'ubicacion'
      this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
      .subscribe( data => { })
      window.location.reload()
    }
    //PAGINA PRINCIPAL

  //MODAL NEW UBICACION
  postDataUbicacion = () => {
    let nombre = this.ubicacionForm.get('nombre').value

    let tabla = 'ubicacion'

    if(this.ubicacionForm.invalid){
      Swal.fire({
        type: 'error',
        title: 'Ups!',
        text: 'Datos inválidos'
      })
    }else{
      let register = {tabla: tabla, datos: [{nombre: nombre}]}
      this.http.post(environment.API_URL, register)
      .subscribe( data => {
        // this.postData = data
      })
      window.location.reload()
    }
  }
  //MODAL NEW UBICACION

}
