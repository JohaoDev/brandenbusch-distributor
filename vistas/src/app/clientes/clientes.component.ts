import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  table_header: any
  clienteForm: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.getDataCliente()
    this.formularioCliente()

    this.table_header = [
      {
        id: 'N°',
        identificacion: 'Identificación',
        nombre: 'Nombre',
        apellido: 'Apellido',
        direccion: 'Dirección',
        telefono: 'Teléfono',
        correo_electronico: 'Correo Electrónico'
      }
    ]
  }

  formularioCliente(){
    this.clienteForm = this.formBuilder.group({
      id: [''],
      identificacion: ['',[Validators.required, Validators.pattern('([0|1|2]{1})([0-9]{9})')]],
      nombre: ['',[Validators.required, Validators.pattern('[A-Za-zñÑ]{3,30}')]],
      apellido: ['',[Validators.required, Validators.pattern('[A-Za-zñÑ]{3,30}')]],
      direccion: ['',[Validators.required, Validators.pattern('[A-Z]+[a-z]*')]],
      telefono: ['',[Validators.required, Validators.pattern('([09|08|06]{2})([0-9]{8})')]],
      correo_electronico: ['',[Validators.required, Validators.pattern('^[a-z]+[a-z0-9.-_ñÑ]*@[a-z]+[a-z0-9]*.[a-z]{2,3}[.]?[a-z]*$')]]
    });
  }

  //PAGINA PRINCIPAL
  respuestaClientes: any[]

  getDataCliente = () => {
    let tabla = 'cliente'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaClientes = data.datos
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'cliente'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
    window.location.reload()
  }
  //PAGINA PRINCIPAL

  //MODAL NEW CLIENTE
  postDataCliente = () => {
    let identificacion = this.clienteForm.get('identificacion').value
    let nombre = this.clienteForm.get('nombre').value
    let apellido = this.clienteForm.get('apellido').value
    let direccion = this.clienteForm.get('direccion').value
    let telefono = this.clienteForm.get('telefono').value
    let correo_electronico = this.clienteForm.get('correo_electronico').value

    if(this.clienteForm.invalid){
      Swal.fire({
        type: 'error',
        title: 'Ups!',
        text: 'Datos inválidos al registrar el cliente'
      })
    }else{
      let tabla = 'cliente'
      let register = {tabla: tabla, datos: [{
                                              identificacion: identificacion, 
                                              nombre: nombre, 
                                              apellido: apellido,
                                              direccion: direccion, 
                                              telefono: telefono,
                                              correo_electronico: correo_electronico
                                            }]}
      this.http.post(environment.API_URL, register)
      .subscribe( data => {
        // this.postData = data
      })
      window.location.reload()
    }
  }
  //MODAL NEW CLIENTE

}
