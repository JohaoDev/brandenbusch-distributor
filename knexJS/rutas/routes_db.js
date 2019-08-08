;
const express = require('express')
let api = express.Router(),
  control = require('../controles/crud')

api.get('/route', control.getDatos)
api.post('/route', control.postDatos)
api.put('/route', control.updateDatos )
api.delete('/route', control.deleteDatos)

api.get('/routebyid', control.getDatosbyID)
api.get('/routeOnlyID', control.getDatosPedidos_detalles)
api.get('/routeReclamosAPI', control.getDatosReclamo_detalles)
api.get('/routeFacturasAPI', control.getDatosFactura_detalles)
api.get('/routeAlbaranAPI', control.getDatosAlbaran_detalles)

module.exports = api