;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])

let getDatos = (req, res) => {
    let tabla = req.query.tabla
    let campo = req.query.campo
    db.select(campo).from(tabla)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let postDatos = (req, res) => {
    let tabla = req.body.tabla
    let datos = req.body.datos
    db(tabla).returning('id').insert(datos)
    .then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado
        })
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let updateDatos = (req, res) => {
    let tabla = req.body.tabla
    let datos = req.body.datos
    datos.forEach( element => {
        db(tabla).where('id', element.id).update(element)
        .then( resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}` 
            })
        })
    })
}

let deleteDatos = (req, res) => {
    let tabla = req.query.tabla
    let id = req.query.id
    db(tabla).where('id', id).delete()
    .then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getDatosbyID = (req, res) => {
    let tabla = req.query.tabla
    let campo = req.query.campo
    let id = req.query.id
    db.select(campo).from(tabla).where('id', id)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

//SELECT DE DETALLES SISTEMA
let getDatosReclamo_detalles = (req, res) => {
    let idreclamo = req.query.idreclamo
    db.raw(`select detalle_reclamo.id, detalle_reclamo.idreclamo, detalle_reclamo.cantidad_pedido, detalle_reclamo.cantidad_llegada, detalle_reclamo.precio_pedido,
    detalle_reclamo.precio_llegada, proveedor.nombre_empresa as idpedido, material.nombre as idmaterial
    from detalle_reclamo join pedido on detalle_reclamo.idpedido = pedido.id join material on material.id = detalle_reclamo.idmaterial
    join proveedor on pedido.idproveedor = proveedor.id where detalle_reclamo.idreclamo = ${idreclamo}`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getDatosFactura_detalles = (req, res) => {
    let idfactura = req.query.idfactura
    db.raw(`select detalle_factura.id, detalle_factura.idfactura , material.nombre as idmaterial, detalle_factura.cantidad, material.precio as valor_unitario, (detalle_factura.cantidad*material.precio) as valor_total from detalle_factura join material on detalle_factura.idmaterial = material.id where idfactura =  ${idfactura}`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getDatosAlbaran_detalles = (req, res) => {
    let idalbaran = req.query.idalbaran

    db.raw(`select detalle_albaran.idalbaran, material.nombre, detalle_albaran.precio_llegada, material.precio from detalle_albaran join material on detalle_albaran.idmaterial = material.id where detalle_albaran.idalbaran =  ${idalbaran}`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getFacturasSelect = (req, res) => {
    let idfactura = req.query.idfactura
    let select = req.query.select
    db.raw(`select detalle_factura.idfactura, ${select} from detalle_factura join material on detalle_factura.idmaterial = material.id where idfactura = ${idfactura} group by detalle_factura.idfactura `)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getDatosPedidos_detalles = (req, res) => {
    let idpedido = req.query.idpedido

    db.raw(`select detalle_pedido.idpedido, detalle_pedido.cantidad, material.nombre as idmaterial, material.precio as valor_unitario, (material.precio*detalle_pedido.cantidad) as valor_total from detalle_pedido join material on detalle_pedido.idmaterial = material.id where  detalle_pedido.idpedido = ${idpedido}`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getPedidosSelect = (req, res) => {
    let idpedido = req.query.idpedido
    let consulta = req.query.consulta

    db.raw(`select detalle_pedido.idpedido, ${consulta} from detalle_pedido join material on detalle_pedido.idmaterial = material.id where idpedido = ${idpedido} group by detalle_pedido.idpedido`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getMaterialesSelect = (req, res) => {
    db.raw(`select proveedor.nombre_empresa, proveedor.representante, material.nombre as nombre_material, material.descripcion, material.fecha_registro, material.precio, ubicacion.nombre as ubicacion from proveedor join material on material.idproveedor = proveedor.id join ubicacion on ubicacion.id = material.idubicacion`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getFacturaPP = (req, res) => {
    db.raw(`select factura.id, cliente.nombre || ' ' || cliente.apellido as idcliente, factura.fecha as fecha, estado.nombre as idestado from cliente join factura on factura.idcliente = cliente.id join estado on factura.idestado = estado.id`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getPedidosPP = (req, res) => {
    db.raw(`select pedido.id, proveedor.nombre_empresa as idproveedor, pedido.fecha as fecha, estado.nombre as idestado from pedido join proveedor on pedido.idproveedor = proveedor.id join estado on pedido.idestado = estado.id`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}

let getPedidosModalDetalle = (req, res) => {
    db.raw(`select pedido.id, proveedor.nombre_empresa as idproveedor, pedido.fecha from pedido  join proveedor on pedido.idproveedor = proveedor.id`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}


//SELECT DE DETALLES SISTEMA

//PDF
let getPDF_Facturas = (req, res) => {
    let idfactura = req.query.idfactura

    db.raw(`select material.nombre as idmaterial, detalle_factura.cantidad, material.precio as valor_unitario, (detalle_factura.cantidad*material.precio) as valor_total from detalle_factura join material on detalle_factura.idmaterial = material.id where idfactura =  ${idfactura}`)
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado.rows
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}
// PDF

module.exports = {
    getDatos,
    postDatos,
    updateDatos,
    deleteDatos,
    getDatosbyID,
    getDatosPedidos_detalles,
    getDatosReclamo_detalles,
    getDatosFactura_detalles,
    getDatosAlbaran_detalles,
    getPDF_Facturas,
    getFacturasSelect,
    getPedidosSelect,
    getMaterialesSelect,
    getFacturaPP,
    getPedidosPP,
    getPedidosModalDetalle
}