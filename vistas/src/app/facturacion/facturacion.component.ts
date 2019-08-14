import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss']
})
export class FacturacionComponent implements OnInit {

  facturaForm: FormGroup
  table_header: any

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formularioFactura()

    this.getDataFactura()
    this.getDataClientes()

    this.table_header = [
      {
        fecha: 'Fecha',
        idcliente:'Cliente',
        idestado: 'Estado'
      }
    ]    
  }

  formularioFactura(){
    this.facturaForm = this.formBuilder.group({
      id:[''],
      fecha:[''],
      idestado:['',[Validators.required]],
      idcliente:['',[Validators.required]]
    })
  }

//PAGINA PRINCIPAL
respuestaFacturas: any[]

getDataFactura = () => {
  this.http.get<any>(environment.API_URL + `Factura`)
  .subscribe(data => {
    this.respuestaFacturas = data.datos
  })
}

idFacturaVariable: number

getDatabyID = (value) => {
  let tabla = 'factura'
  this.http.get<any>(environment.API_URL + `byid?tabla=${tabla}&&id=${value}`)
  .subscribe( data => {
    this.idFacturaVariable = data.datos[0].id
    localStorage.setItem("id", this.idFacturaVariable.toString() )
  })
}

deleteDataTable = (value) => {
  let tabla = 'factura'
  this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
  .subscribe( data => { })
  window.location.reload()
}
//PAGINA PRINCIPAL

//MODAL NEW FACTURA
postDataFactura = () => {
  let idcliente = this.facturaForm.get('idcliente').value
  let idestado = 2

  let tabla = 'factura'
  let register = {tabla: tabla, datos: [{
                                          idcliente: idcliente,
                                          idestado: idestado
                                        }]}
  this.http.post(environment.API_URL, register)
  .subscribe( data => { })
  window.location.reload()
}

respuestaClientes: any[]

getDataClientes = () => {
  let tabla = 'cliente'
  this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
  .subscribe(data => {
    this.respuestaClientes = data.datos
  })
}
//MODAL NEW FACTURA

}