import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-resumen-facturacion',
  templateUrl: './resumen-facturacion.component.html',
  styleUrls: ['./resumen-facturacion.component.scss']
})
export class ResumenFacturacionComponent implements OnInit {

  detallefacturaForm: FormGroup
  table_header: any

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formularioDetalleFactura()
    this.getDataDetalleFacturas()
    this.getDataMateriales()
    this.getDataSubtotal()
    this.getDataIva()
    // this.getDataTotal()
    this.getPDF()

    this.table_header = [
      {
        idmaterial: 'Descripción - Material',
        cantidad: 'Cantidad',
        valor_unitario: 'Valor Unitario',
        valor_total: 'Valor Total'
      }
    ]
  }

  formularioDetalleFactura(){
    this.detallefacturaForm = this.formBuilder.group({
      cantidad:['',[Validators.required]],
      idmaterial:['',[Validators.required]]
    })
  }

  //PAGINA PRINCIPAL
  getLocalStorage(){
    let id = localStorage.getItem("id")
    return id
  }

  respuestaDetalleFactura: any[]

  getDataDetalleFacturas = () => {
    this.http.get<any>(environment.API_URL + `FacturasAPI?idfactura=${this.getLocalStorage()}`)
    .subscribe(data => {
      this.respuestaDetalleFactura = data.datos
    })
  }

  respuestaSubtotal: any[]

  getDataSubtotal = () => {
    let subtotal = "sum(detalle_factura.cantidad*material.precio) as subtotal"

    this.http.get<any>(environment.API_URL + `FacturasSelect?idfactura=${this.getLocalStorage()}&select=${subtotal}`)
    .subscribe(data => {
      this.respuestaSubtotal = data.datos
    })
  }

  respuestaIva: any[]

  getDataIva = () => {
    let iva = "round((sum(detalle_factura.cantidad*material.precio))*0.12,2) as iva"

    this.http.get<any>(environment.API_URL + `FacturasSelect?idfactura=${this.getLocalStorage()}&select=${iva}`)
    .subscribe(data => {
      this.respuestaIva = data.datos
    })
  }

  respuestaTotal: any[]

  getDataTotal = () => {
    let total = "sum((detalle_factura.cantidad*material.precio)+(detalle_factura.cantidad*material.precio)*0.12) as total"

    this.http.get<any>(environment.API_URL + `FacturasSelect?idfactura=${this.getLocalStorage()}&select=${total}`)
    .subscribe(data => {
      this.respuestaTotal = data.datos
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'detalle_factura'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
  }
//PAGINA PRINCIPAL
  
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
  let idmaterial = this.detallefacturaForm.get('idmaterial').value

  let tabla = 'detalle_factura'

  if(this.detallefacturaForm.invalid){
    Swal.fire({
      type: 'error',
      title: 'Ups!',
      text: 'Datos inválidos'
    })
  }else{
    let register = {tabla: tabla, datos: [{
                                            cantidad: cantidad, 
                                            idfactura: this.getLocalStorage(), 
                                            idmaterial: idmaterial
                                          }]}
    this.http.post(environment.API_URL, register)
    .subscribe( data => {  })
    window.location.reload()
  }
}
//MODAL DETALLE_FACTURA

  // JSPDF

  docPdf: jsPDF;
  pdfData: any[]

  getPDF = () => {
    this.http.get<any>(environment.API_URL + `PDF_Facturas?idfactura=${this.getLocalStorage()}`)
    .subscribe(data => {
      this.pdfData = data.datos
    })
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
      orientation: 'P',
      unit: 'mm',
      format: 'A4',
      compress: true,
    })
    var headers = 
    {
      cantidad: "Cantidad",
      idmaterial: "Descripción - Material",
      valor_unitario: "Valor Unitario",
      valor_total: "Valor Total"
    };
    doc.autoTable({head: [headers],body: this.pdfData,
      startY: 85,
      tableWidth: 'auto',
      columnWidth: 'auto',
      styles: {
        overflow: 'linebreak'
      },})
    doc.save('Facturas.pdf')
  }

// JSPDF

}
