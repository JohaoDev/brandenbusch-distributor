;
const express = require('express')
let api = express.Router(),
  control = require('../controles/crud')

api.get('/route', control.getDatos)
api.post('/route', control.postDatos)
api.put('/route', control.updateDatos )
api.delete('/route', control.deleteDatos)
api.get('/routebyid', control.getDatosbyID)

//RECLAMOS
api.get('/routeReclamosAPI', control.getDatosReclamo_detalles)

//ALBARAN
api.get('/routeAlbaranAPI', control.getDatosAlbaran_detalles)

//FACTURAS
api.get('/routeFacturasAPI', control.getDatosFactura_detalles)        //V.UNIT AND V.TOTAL RESUMEN FACTURACION
api.get('/routeFacturasSelect', control.getFacturasSelect)            //SUBTOTAL, IVA, TOTAL RESUMEN FACTURACION
api.get('/routePDF_Facturas', control.getPDF_Facturas)

//PEDIDOS
api.get('/routePedidosAPI', control.getDatosPedidos_detalles)         //V.UNIT AND V.TOTAL RESUMEN PEDIDOS
api.get('/routePedidosSelect', control.getPedidosSelect)            //SUBTOTAL, IVA, TOTAL RESUMEN PEDIDOS


module.exports = api