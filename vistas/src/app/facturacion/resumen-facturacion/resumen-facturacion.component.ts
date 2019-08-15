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
    this.getDataTotal()
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
  respuestaClientes: any[]



  respuestaSubtotal: any[]

  getDataSubtotal = () => {
    let subtotal = "sum(detalle_factura.cantidad*material.precio) as subtotal"

    this.http.get<any>(environment.API_URL + `FacturasSelect?idfactura=${this.getLocalStorage()}&select=${subtotal}`)
    .subscribe(data => {
      this.respuestaSubtotal = data.datos
      console.log(this.respuestaTotal)
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
    this.http.get<any>(environment.API_URL + `FacturasTotal?idfactura=${this.getLocalStorage()}`)
    .subscribe(data => {
      this.respuestaTotal=data.data
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

  // idFacturaVariable: number

  // getDatabyID = () => {
  //   let tabla = 'cliente'
  //   this.http.get<any>(environment.API_URL + `byid?tabla=${tabla}&id=${}`)
  //   .subscribe( data => {
  //     this.idFacturaVariable = data.datos[0].id
  //     localStorage.setItem("id", this.idFacturaVariable.toString() )
  //   })
  // }

  marcaDeAgua=(doc)=> {
    let i:number;
   var totalPages = doc.internal.getNumberOfPages();
   let  x=25;
   for (i = 1; i <= totalPages; i++) {
     doc.setPage(i);
     doc.setFontSize(40);
     doc.setTextColor(222, 238, 230  );
     doc.text(x ,doc.internal.pageSize.height - 60, 'Brandenbusch',45);
   }

   return doc;
 }

  pdf() {
    let  x=25;
     let y=25;
    let  size=14;
    let logo = new Image();
    var hora = Date();
    logo.src = "../../../assets/logo-distribuidora.png"
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
    doc.addImage(logo,15,10,40,20)
    doc.setFontSize(size-2);
    doc.text('Ruc:1723603997001',x+30,y-5);
    doc.setFontSize(size);
    doc.setFontSize(size-2);
    doc.setTextColor(0, 0, 0);
    doc.setFontStyle('italic');
    doc.text('@Brandenbusch.com.ec',x,y+250,{maxWidth:100});
    doc.text('Direccion: Av Diego De Vaca ',x+40,y+250,{maxWidth:100});
    doc.text(`Cliente: __________`,x,y+243,{maxWidth:100});
    doc.text('Vendedor: ___________',x+56,y+243,{maxWidth:100});
    doc.setFontSize(size-2);
    doc.setFontStyle('italic');
    doc.setTextColor(0, 0, 0);
    doc.text(`Fecha ${hora}`,x,y+13);
    doc.text('Nombre del Cliente:__________________',x,y+20);
    doc.text('Cédula/Ruc:_____________',x,y+27);
    doc.text('Direccion Domicilio:__________________________________________',x,y+34);
    doc.text('Telefono/Celular:_______________________________________',x,y+44);

    doc.autoTable({head: [headers],body: this.pdfData,
      startY: 65,
      tableWidth: 'auto',
      columnWidth: 'auto',
      styles: {
        overflow: 'linebreak'
      },})
      doc=this.marcaDeAgua(doc)
    doc.save('Facturas.pdf')
  }

// JSPDF

}
