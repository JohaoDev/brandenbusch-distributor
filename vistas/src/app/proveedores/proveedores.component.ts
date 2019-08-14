import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  table_header: any
  proveedorForm: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formularioProveedor()
    this.getDataProveedores()

    this.table_header = [
      {
        id: 'N°',
        identificacion: 'Identificacíon',
        nombre_empresa: 'Nombre de la Empresa',
        representante: 'Representante',
        correo_electronico: 'Correo Electrónico',
        direccion: 'Dirección',
        telefono: 'Teléfono'
      }
    ]
  }

  formularioProveedor(){
    this.proveedorForm = this.formBuilder.group({
      id: [''],
      identificacion: ['',[Validators.required, Validators.pattern('([0|1|2]{1})([0-9]{9})')]],
      nombre_empresa: ['',[Validators.required, Validators.pattern('[A-Za-zñÑ]{3,30}')]],
      representante: ['',[Validators.required, Validators.pattern('[A-Za-zñÑ]{3,30}')]],
      correo_electronico: ['',[Validators.required, Validators.pattern('^[a-z]+[a-z0-9.-_ñÑ]*@[a-z]+[a-z0-9]*.[a-z]{2,3}[.]?[a-z]*$')]],
      direccion: ['',[Validators.required, Validators.pattern('[A-Z]+[a-z]*')]],
      telefono: ['',[Validators.required, Validators.pattern('([09|08|06]{2})([0-9]{8})')]]
    });
  }

    //PAGINA PRINCIPAL
    respuestaProveedores: any[]

    getDataProveedores = () => {
      let tabla = 'proveedor'
      this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
      .subscribe(data => {
        this.respuestaProveedores = data.datos
      })
    }
  
    deleteDataTable = (value) => {
      let tabla = 'proveedor'
      this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
      .subscribe( data => { })
      window.location.reload()
    }
    //PAGINA PRINCIPAL

    //MODAL NEW PROVEEDOR
    postDataProveedor = () => {
      let identificacion = this.proveedorForm.get('identificacion').value
      let nombre_empresa = this.proveedorForm.get('nombre_empresa').value
      let representante = this.proveedorForm.get('representante').value
      let correo_electronico = this.proveedorForm.get('correo_electronico').value
      let direccion = this.proveedorForm.get('direccion').value
      let telefono = this.proveedorForm.get('telefono').value
  
      let tabla = 'proveedor'
      let register = {tabla: tabla, datos: [{
                                              identificacion: identificacion, 
                                              nombre_empresa: nombre_empresa,
                                              representante: representante,
                                              correo_electronico: correo_electronico,
                                              direccion: direccion, 
                                              telefono: telefono
                                            }]}
      this.http.post(environment.API_URL, register)
      .subscribe( data => {
        // this.postData = data
      })
      window.location.reload()
    }
    //MODAL NEW PROVEEDOR

}
