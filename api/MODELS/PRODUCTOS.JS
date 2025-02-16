const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    código: {type:Number, required:true, trim:true},
    clave: {type:String, required:true, trim:true},
    descripción: {type:String, required:true, trim:true},
    margen_de_mercado: {type:String, required:true, trim:true},
    caja: {type: Number, required:true, trim:true},
    master: {type: Number, required:true, trim:true},
    precio: {type: Number, required:true, trim:true},
    unidad: {type:String, required:true, trim:true},
    ean: {type: Number, required:true, trim:true},
    precio_mínimo_de_venta: {type: Number, required:true, trim:true},
    alta_rotación: {type: Number, required:true, trim:true},
    precio_mayoreo_con_IVA: {type:String, required:true, trim:true},
    precio_distribuidor_con_IVA:{type:Number, required:true, trim:true},
    precio_público_con_IVA: {type:String, required:true, trim:true},
    precio_mayoreo_sin_IVA: {type:String, required:true, trim:true},
    precio_distribuidor_sin_IVA:{type:Number, required:true, trim:true},
    precio_público_sin_IVA: {type:String, required:true, trim:true},
    Marca: {type:String, required:true, trim:true},
    Precio_Medio_Mayoreo_sin_IVA: {type:String, required:true, trim:true},
    Precio_Medio_Mayoreo_con_IVA: {type:String, required:true, trim:true},
    Codigo_SAT:{type: Number, required:true, trim:true},
    Descripcion_SAT: {type:String, required:true, trim:true},
    Familia: {type:String, required:true, trim:true},
    Descripción_Familia:{type:String, required:true, trim:true},
    Peso_Kg:{type: Number, required:true, trim:true},
    Volumen_cm3:{type: Number, required:true, trim:true},
    Unnamed_26: { type: mongoose.Schema.Types.Mixed, default: null }
}, { _id: false }); // Aquí deshabilitamos el _id automático

module.exports = mongoose.model('Producto', ProductoSchema);