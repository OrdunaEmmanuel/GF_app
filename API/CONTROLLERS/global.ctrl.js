
// Función para reconocimiento de voz y búsqueda
const reconocimientoVoz = () => {
    document.getElementById('iniciar').addEventListener('click', function () {
        if ('webkitSpeechRecognition' in window) {
            const reconocimiento = new webkitSpeechRecognition();
            reconocimiento.lang = 'es-ES';
            reconocimiento.interimResults = false;
            reconocimiento.maxAlternatives = 1;

            reconocimiento.onresult = function (event) {
                const resultado = event.results[0][0].transcript;
                document.getElementById('inputBusqueda').value = resultado;
                document.getElementById('resultado').textContent = 'Resultado: ' + resultado;
                console.log('Resultado: ' + resultado);
            };

            reconocimiento.onerror = function (event) {
                console.error('Error de reconocimiento: ' + event.error);
            };

            reconocimiento.onend = function () {
                console.log('Reconocimiento de voz finalizado.');
            };

            reconocimiento.start();
        } else {
            alert('Lo siento, tu navegador no soporta la API de reconocimiento de voz.');
        }
    });
};

// Controlador para obtener los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find({}, {
            _id: 0,
            código: 1,
            clave: 1,
            descripción: 1,
            precio_público_con_IVA: 1,
            unidad: 1,
            precio_mayoreo_con_IVA: 1,
            Marca: 1,
            Peso_Kg: 1
        });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error });
    }
};

module.exports = {
    iniciarReconocimientoVoz,
    obtenerProductos
};
