;
exports.up = function(knex, Promise) {
  //TABLAS DEBILES
  return knex.schema
  .createTable( 'ubicacion', function( table ) {
    table.increments('id');
    table.string('nombre');
  })
  .createTable( 'estado', function( table ) {
    table.increments('id');
    table.string('nombre');
  })
  .createTable( 'proveedor', function( table ) {
    table.increments('id');
    table.string('identificacion').notNullable().unique();
    table.string('nombre_empresa');
    table.string('representante');
    table.string('correo_electronico');
    table.string('direccion');
    table.string('telefono');
  })
  .createTable( 'reclamo', function( table ) {
    table.increments('id');
    table.timestamp('fecha').defaultTo(knex.fn.now());
    table.string('comentario');
  })
  .createTable( 'cliente', function( table ) {
    table.increments('id');
    table.string('identificacion').notNullable().unique();
    table.string('nombre');
    table.string('apellido');
    table.string('direccion');
    table.string('telefono');
    table.string('correo_electronico');
  })

  //TABLAS FUERTES
  .createTable( 'material', function( table ) {
    table.increments('id');
    table.string('nombre');
    table.string('descripcion');
    table.timestamp('fecha_registro').defaultTo(knex.fn.now());
    table.timestamp('fecha_actualizacion').defaultTo(knex.fn.now());
    table.decimal('precio');
    table.integer('idproveedor').references('id').inTable('proveedor');
    table.integer('idubicacion').references('id').inTable('ubicacion');
  })
  .createTable( 'pedido', function( table ) {
    table.increments('id');
    table.timestamp('fecha').defaultTo(knex.fn.now());
    table.integer('idestado').references('id').inTable('estado');
    table.integer('idproveedor').references('id').inTable('proveedor');
  })
  .createTable( 'detalle_pedido', function( table ) {
    table.increments('id');
    table.integer('cantidad');
    table.integer('idpedido').references('id').inTable('pedido');
    table.integer('idmaterial').references('id').inTable('material');
  })
  .createTable( 'albaran', function( table ) {
    table.increments('id');
    table.integer('idpedido').references('id').inTable('pedido');
    table.integer('idestado').references('id').inTable('estado');
    table.timestamp('fecha_entrega').defaultTo(knex.fn.now());
  })
  .createTable( 'detalle_albaran', function( table ) {
    table.increments('id');
    table.integer('idalbaran').references('id').inTable('albaran');
    table.integer('idmaterial').references('id').inTable('material');
    table.integer('cantidad');
  })
  .createTable( 'detalle_reclamo', function( table ) {
    table.increments('id');
    table.integer('cantidad_pedido');
    table.integer('cantidad_llegada');
    table.decimal('precio_pedido');
    table.decimal('precio_llegada');
    table.integer('idreclamo').references('id').inTable('reclamo');
    table.integer('idpedido').references('id').inTable('pedido');
    table.integer('idmaterial').references('id').inTable('material');
  })
  .createTable( 'factura', function( table ) {
    table.increments('id');
    table.timestamp('fecha').defaultTo(knex.fn.now());
    table.integer('idestado').references('id').inTable('estado');
    table.integer('idcliente').references('id').inTable('cliente');
  })
  .createTable( 'detalle_factura', function( table ) {
    table.increments('id');
    table.integer('cantidad');
    table.integer('idmaterial').references('id').inTable('material');
    table.integer('idfactura').references('id').inTable('factura');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists( 'ubicacion' )
    .dropTableIfExists( 'estado' )
    .dropTableIfExists( 'proveedor' )
    .dropTableIfExists( 'reclamo' )
    .dropTableIfExists( 'cliente' )
    .dropTableIfExists( 'material' )
    .dropTableIfExists( 'pedido' )
    .dropTableIfExists( 'detalle_pedido' )
    .dropTableIfExists( 'albaran' )
    .dropTableIfExists( 'detalle_albaran' )
    .dropTableIfExists( 'detalle_reclamo' )
    .dropTableIfExists( 'factura' )
    .dropTableIfExists( 'detalle_factura' )
};
