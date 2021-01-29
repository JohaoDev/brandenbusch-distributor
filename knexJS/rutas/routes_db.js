const express = require("express");
let api = express.Router(),
  control = require("../controles/crud");

api.get("/route", control.getDatos);
api.post("/route", control.postDatos);
api.put("/route", control.updateDatos);
api.delete("/route", control.deleteDatos);
api.get("/routebyid", control.getDatosbyID);

//RECLAMOS
api.get("/routeReclamosAPI", control.getDatosReclamo_detalles);

//ALBARAN
api.get("/routeAlbaranAPI", control.getDatosAlbaran_detalles);
api.get("/routeAlbaran", control.getAlbaranPP);

//FACTURAS
api.get("/routeFacturasAPI", control.getDatosFactura_detalles); //V.UNIT AND V.TOTAL RESUMEN FACTURACION
api.get("/routeFacturasSelect", control.getFacturasSelect); //SUBTOTAL, IVA, TOTAL RESUMEN FACTURACION
api.get("/routeFactura", control.getFacturaPP);
api.get("/routePDF_Facturas", control.getPDF_Facturas); //PDF
api.get("/routeFacturasTotal", control.getFacturasTotal);

//PEDIDOS
api.get("/routePedidosAPI", control.getDatosPedidos_detalles); //V.UNIT AND V.TOTAL RESUMEN PEDIDOS
api.get("/routePedidosSelect", control.getPedidosSelect); //SUBTOTAL, IVA, TOTAL RESUMEN PEDIDOS
api.get("/routePedidos", control.getPedidosPP);
api.get("/routePedidosModalDetalle", control.getPedidosModalDetalle);

//MATERIALES
api.get("/routeMaterialesAPI", control.getMaterialesSelect);

module.exports = api;
