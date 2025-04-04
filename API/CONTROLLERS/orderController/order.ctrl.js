const OrderModel = require("../../MODELS/orderModel/order.mdl");
const ProductModel = require("../../MODELS/productModel/product.mdl");

const OrderController = {
    async getAll(req, res) {
        try {
            const orders = await OrderModel.getOrdersByUser(req.params.id_usuario);
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los pedidos" });
            console.log(error);
        }
    },

    async getOrders(req, res) {
        try {
            const orders = await OrderModel.getOrders();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los pedidos" });
            console.log(error);
        }
    },

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

    async create(req, res) {
        try {
            const { estado, total, metodo_de_pago, fecha_entrega_estimada, direccion, id_usuario, fecha_levantamiento_pedido } = req.body;
            // Validar que los campos estén definidos (permitiendo total = 0)
            if (estado == null || total == null || !metodo_de_pago || !fecha_entrega_estimada || !direccion || !id_usuario) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }
            // Si no se envía fecha de levantamiento, se usa la fecha actual
            const pedidoData = {
                estado,
                total,
                metodo_de_pago,
                fecha_levantamiento_pedido: fecha_levantamiento_pedido || new Date().toISOString().slice(0, 10),
                fecha_entrega_estimada,
                direccion,
                id_usuario
            };

            const orderId = await OrderModel.createOrder(pedidoData);
            res.status(201).json({ message: "Pedido creado", id: orderId });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el pedido" });
            console.log(error);
        }
    },

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

    // Este método queda conservado si lo necesitas, pero el front utilizará addProductToOrder
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

    // NUEVO MÉTODO: Solo agrega un producto a un pedido existente
    async addProductToOrder(req, res) {
        try {
            const { id_pedido, id_producto, cantidad } = req.body;
            if (!id_pedido || !id_producto || !cantidad) {
                return res.status(400).json({ error: "id_pedido, id_producto y cantidad son obligatorios" });
            }
            const producto = await ProductModel.getProductById(id_producto);
            if (!producto) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            await OrderModel.addProductToOrder({ id_pedido, id_producto, cantidad });
            res.status(201).json({ message: "Producto agregado al pedido", id_pedido });
        } catch (error) {
            res.status(500).json({ error: "Error al agregar producto al pedido" });
            console.log(error);
        }
    },

    async getProductsByOrder(req, res) {
        try {
            const { id_pedido } = req.params;
            const productos = await OrderModel.getProductsByOrder(id_pedido);
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los productos del pedido" });
            console.log(error);
        }
    },

    async editOrder(req, res) {
        try {
            const { id_pedido } = req.params;
            const { estado, total, metodo_de_pago, fecha_entrega_estimada, direccion, productos } = req.body;

            if (!estado || !total || !metodo_de_pago || !fecha_entrega_estimada || !direccion) {
                return res.status(400).json({ error: "Todos los campos del pedido son obligatorios" });
            }

            const updatedOrder = await OrderModel.updateOrder(id_pedido, {
                estado,
                total,
                metodo_de_pago,
                fecha_entrega_estimada,
                direccion
            });

            if (!updatedOrder) {
                return res.status(404).json({ error: "Pedido no encontrado" });
            }

            if (productos && productos.length > 0) {
                for (const product of productos) {
                    const { id_producto, cantidad } = product;
                    await OrderModel.updateProductInOrder(id_pedido, id_producto, cantidad);
                }
            }

            res.json({
                message: "Pedido y productos actualizados con éxito",
                order: updatedOrder
            });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el pedido" });
            console.log(error);
        }
    },

    async deleteOrder(req, res) {
        try {
            const { id_pedido } = req.params;
            const { eliminarProductos } = req.body;

            if (eliminarProductos) {
                await OrderModel.deleteProductsFromOrder(id_pedido);
                return res.json({ message: "Productos del pedido eliminados con éxito" });
            }

            const deletedOrder = await OrderModel.deleteOrder(id_pedido);

            if (!deletedOrder) {
                return res.status(404).json({ error: "Pedido no encontrado" });
            }

            res.json({ message: "Pedido y productos eliminados con éxito" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el pedido" });
            console.log(error);
        }
    },

    async deleteProductFromOrder(req, res) {
        try {
            const { id_pedido, id_producto } = req.params;
            const deletedProduct = await OrderModel.deleteProductFromOrder(id_pedido, id_producto);

            if (!deletedProduct) {
                return res.status(404).json({ error: "Producto no encontrado en este pedido" });
            }

            res.json({ message: "Producto eliminado del pedido con éxito" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el producto del pedido" });
            console.log(error);
        }
    },

    async editProducts(req, res) {
        try {
            const { id_pedido } = req.params;
            const { productos } = req.body;  // Obtener los productos que se quieren actualizar
    
            if (!productos || productos.length === 0) {
                return res.status(400).json({ error: "Se requieren productos para actualizar" });
            }
    
            for (const product of productos) {
                const { id_producto, cantidad } = product;
                await OrderModel.updateProductInOrder(id_pedido, id_producto, cantidad);
            }
    
            res.json({
                message: "Productos del pedido actualizados con éxito",
            });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar los productos del pedido" });
            console.log(error);
        }
    },
    
    async editOrderDetails(req, res) {
        try {
            const { id_pedido } = req.params;
            const { estado, total, metodo_de_pago, fecha_entrega_estimada, direccion } = req.body;
    
            if (!estado || !total || !metodo_de_pago || !fecha_entrega_estimada || !direccion) {
                return res.status(400).json({ error: "Todos los campos del pedido son obligatorios" });
            }
    
            const updatedOrder = await OrderModel.updateOrder(id_pedido, {
                estado,
                total,
                metodo_de_pago,
                fecha_entrega_estimada,
                direccion
            });
    
            if (!updatedOrder) {
                return res.status(404).json({ error: "Pedido no encontrado" });
            }
    
            res.json({
                message: "Pedido actualizado con éxito",
                order: updatedOrder
            });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el pedido" });
            console.log(error);
        }
    }
};

module.exports = OrderController;

