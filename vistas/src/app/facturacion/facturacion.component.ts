import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss']
})
export class FacturacionComponent implements OnInit {

  detallefacturaForm: FormGroup
  facturaForm: FormGroup
  table_header: any

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formularioFactura()
    this.formularioDetalleFactura()

    this.getPDF()
    this.getDataFactura()
    this.getDataClientes()
    this.getDataMateriales()

    this.table_header = [
      {
        id: 'N°',
        fecha: 'Fecha',
        total:'Total',
        idcliente:'Cliente'
      }
    ]    
  }

  formularioFactura(){
    this.facturaForm = this.formBuilder.group({
      id:[''],
      fecha:[''],
      total:['',[Validators.required]],
      idcliente:['',[Validators.required]]
    })
  }

  formularioDetalleFactura(){
    this.detallefacturaForm = this.formBuilder.group({
      id:[''],
      cantidad:['',[Validators.required]],
      precio:['',[Validators.required]],
      descuento:['',[Validators.required]],
      idmaterial:['',[Validators.required]],
      idfactura:['',[Validators.required]]
    })
  }

//PAGINA PRINCIPAL
respuestaFacturas: any[]

getDataFactura = () => {
  let tabla = 'factura'
  this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
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
nuevafecha = new Date()
fecha_orden = this.nuevafecha.getDate() + "/" + (this.nuevafecha.getMonth() +1) + "/" + this.nuevafecha.getFullYear()

postDataFactura = () => {
  let total = this.facturaForm.get('total').value
  let idcliente = this.facturaForm.get('idcliente').value
  let returning

  let tabla = 'factura'
  let register = {tabla: tabla, datos: [{fecha: this.fecha_orden, total: total, idcliente: idcliente}]}
  this.http.post(environment.API_URL, register)
  .subscribe( data => {
    returning = data
  })
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

//MODAL DETALLE_FACTURA
respuestaMateriales: any[]

getDataMateriales = () => {
  let tabla = 'material'
  this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
  .subscribe(data => {
    this.respuestaMateriales = data.datos
  })
}

postDataDetalleFacturas = () => {
  let cantidad = this.detallefacturaForm.get('cantidad').value
  let precio = this.detallefacturaForm.get('precio').value
  let descuento = this.detallefacturaForm.get('descuento').value
  let idmaterial = this.detallefacturaForm.get('idmaterial').value
  let returning

  let tabla = 'detalle_factura'
  let register = {tabla: tabla, datos: [{descuento: descuento, cantidad: cantidad, precio: precio, idfactura: this.idFacturaVariable, idmaterial: idmaterial}]}
  this.http.post(environment.API_URL, register)
  .subscribe( data => { 
    returning = data
  })
  window.location.reload()
}
//MODAL DETALLE_FACTURA

  // JSPDF

  docPdf: jsPDF;
  pdfData: any[]

  getPDF = () => {
    let ruta = 'pdf'
    let tabla = 'factura'

    this.http.get<any>(environment.API_URL + `${ruta}?tabla=${tabla}`)
    .subscribe(data => {
      this.pdfData = data.datos
    })
    console.log(this.pdfData)
  }

  pdf() {
    let textSize=10;
    let anchoTotal=210
    let altoTotal=290
    let margenSup=25
    let margeninf=25
    let margeniz=25
    let margende= 25
    let anchouso= anchoTotal-margeniz-margende
    let altouso=altoTotal-margenSup-margeninf
    let x=25;
    let y=25;

    let doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'A4',
      compress: true,
    })
    var headers = 
    {
      id: "N° Pedido",
      fecha: "Fecha De Factura",
      total: "Total de Factura",
      idcliente: "Nombre Del Cliente",
    };
    doc.autoTable({
      head: [headers],
      body: this.pdfData, colSpan: 2, rowSpan: 2, styles: {halign: 'center'},
    })
    doc.save('Facturas.pdf')
  }

// JSPDF
}