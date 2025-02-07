const mongoose = require('mongoose');

// FUNCIONES BASICAS CRUD 

exports.Create = async (Model, data) => {
    try {
        const newDocument = new Model(data);
        await newDocument.save();
        return { success: true, data: newDocument };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


exports.Update = async (Model, id, updateData) => {
    try {
        const updatedDocument = await Model.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedDocument) return { success: false, error: 'Documento no encontrado' };
        return { success: true, data: updatedDocument };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

exports.Delete = async (Model, id) => {
    try {
        const deletedDocument = await Model.findByIdAndDelete(id);
        if (!deletedDocument) return { success: false, error: 'Documento no encontrado' };
        return { success: true, data: deletedDocument };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
