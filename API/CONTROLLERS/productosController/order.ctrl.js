const OrderModel = require("../../MODELS/productsModels/order.mdl");
const ProductModel = require("../../MODELS/productsModels/products.mdl");

const OrderController = {
    // Obtener todos los pedidos de un usuario
    async getAll(req, res) {
        try {
            const orders = await OrderModel.getOrdersByUser(req.params.id_usuario);
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los pedidos" });
            console.log(error);
        }
    },

    // Obtener todos los pedidos (sin filtrar por usuario)
    async getOrders(req, res) {
        try {
            const orders = await OrderModel.getOrders(); // Obtiene todos los pedidos de la base de datos
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los pedidos" });
            console.log(error);
        }
    },

    // Obtener un pedido por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderModel.getOrderById(id);
            if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el pedido" });
        }
    },

    // Crear un pedido
    async create(req, res) {
        try {
            const { estado, total, metodo_de_pago, fecha_entrega_estimada, direccion, id_usuario } = req.body;
            if (!estado || !total || !metodo_de_pago || !fecha_entrega_estimada || !direccion || !id_usuario) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }
            const orderId = await OrderModel.createOrder(req.body);
            res.status(201).json({ message: "Pedido creado", id: orderId });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el pedido" });
            console.log(error);
        }
    },

    // Buscar pedidos por término
    async search(req, res) {
        try {
            const { term, id_usuario } = req.body;
            if (!term || !id_usuario) {
                return res.status(400).json({ error: "Se requiere un término de búsqueda y el ID del usuario" });
            }
            const orders = await OrderModel.searchOrders(term, id_usuario);
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: "Error en la búsqueda de pedidos" });
            console.log(error);
        }
    },

    // Agregar un producto a un pedido o crear el pedido si no existe
    async addProductAndCreateOrderIfNeeded(req, res) {
        try {
            const { id_usuario, id_producto, cantidad, direccion, metodo_de_pago, fecha_entrega_estimada } = req.body;

            if (!id_usuario || !id_producto || !cantidad || !direccion || !metodo_de_pago || !fecha_entrega_estimada) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }

            const producto = await ProductModel.getProductById(id_producto);
            if (!producto) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            let pedido = await OrderModel.getPendingOrderByUser(id_usuario);

            if (!pedido) {
                const pedidoData = {
                    estado: "pendiente",
                    total: 0,
                    metodo_de_pago,
                    fecha_entrega_estimada,
                    direccion,
                    id_usuario
                };
                const nuevoPedidoId = await OrderModel.createOrder(pedidoData);
                pedido = { id_pedido: nuevoPedidoId };
            }

            const detalle = {
                id_pedido: pedido.id_pedido,
                id_producto,
                cantidad,
            };

            await OrderModel.addProductToOrder(detalle);

            res.status(201).json({
                message: "Producto agregado al pedido",
                id_pedido: pedido.id_pedido
            });

        } catch (error) {
            res.status(500).json({ error: "Error al agregar producto al pedido" });
            console.log(error);
        }
    },

    // Obtener productos por ID del pedido
    async getProductsByOrder(req, res) {
        try {
            const { id_pedido } = req.params;
            const productos = await OrderModel.getProductsByOrder(id_pedido);
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los productos del pedido" });
            console.log(error);
        }
    }
};

module.exports = OrderController;

