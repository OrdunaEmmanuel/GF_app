const {pool} = require("../../CONFIGS/db.config");
const CrudService = require("../../SERVICES/crudService");

// Inicialización del servicio CRUD
const clienteCrudService = new CrudService({
    tableName: 'usuario'
});

const Cliente = {
    // Crear un nuevo cliente
    create: async (cliente) => {
        const {
            nombre,
            apellido_p,
            apellido_m,
            clave,
            direccion,
            curp,
            numero_cel,
            password_user,
            tipo_usuario,
            token,
            id_localidad,
        } = cliente;

        try {
            const result = await clienteCrudService.create({
                nombre,
                apellido_p,
                apellido_m,
                clave,
                direccion,
                curp,
                numero_cel,
                password_user,
                tipo_usuario,
                id_localidad
            });
            
            return result.id;
        } catch (error) {
            console.error("Error al crear cliente:", error);
            throw error;
        }
    },

    // Buscar cliente por número de celular
    findByNumeroCelular: async (numero_celular) => {
        try {
            const conditions = { numero_cel: numero_celular };
            const result = await clienteCrudService.findAll(conditions, 1, 0);
            
            return result.success && result.data.length > 0 ? result.data[0] : null;
        } catch (error) {
            console.error("Error al buscar cliente por número de celular:", error);
            throw error;
        }
    },

    // Obtener todos los clientes
    getAll: async () => {
        try {
            const result = await clienteCrudService.findAll();
            return result.success ? result.data : [];
        } catch (error) {
            console.error("Error al obtener todos los clientes:", error);
            throw error;
        }
    },
};

module.exports = Cliente;