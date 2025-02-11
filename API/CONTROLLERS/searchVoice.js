document.getElementById('iniciar').addEventListener('click', function() {//Obtiene el elemento con el ID iniciar y agrega un evento que se ejcutara cuando el usuario haga click en el
    //Linea vacia 
    if ('webkitSpeechRecognition' in window) {//Verifica si el navegadorsoporta la API webkitSpeechRecognition
        const reconocimiento = new webkitSpeechRecognition();//Crea una nueva instancia del reconociento de voz 
        reconocimiento.lang = 'es-ES'; //Establece el idioma del reconocimiento a español
        reconocimiento.interimResults = false; //Indica que no se mostraran resultados intermedios, solo el resultado final
        reconocimiento.maxAlternatives = 1; //Limita el número de alternativas a una sola opción
//Linea vacia
        reconocimiento.onresult = function(event) {//Define una función que se ejecutará 
            const resultado = event.results[0][0].transcript; //Extrae el texto reconocido de los resultados
            document.getElementById('inputBusqueda').value = resultado; //Asigna el texto reconociso al campo de entrada con el ID inputBusqueda
            document.getElementById('resultado').textContent = 'Resultado: ' + resultado;//Muestra el resultado en un elemento con el ID
            console.log('Resultado: ' + resultado);//Muestra el resultado en la consola para depuración 
        };//Termina la funcion
//Linea vacia
        reconocimiento.onerror = function(event) {//Define una función para manejar errores en el reconocimiento de voz
            console.error('Error de reconocimiento: ' + event.error);//Muestra un mensaje de error en la consola si ocurre un problema 
        };//termina la funcion
//Linea vacia 
        reconocimiento.onend = function() {//Define un afunción que se ejecutara cuando el reconocimiento de voz termine
            console.log('Reconocimiento de voz finalizado.');//Muestra en la consola que el reconocimiento ha finalizado
        };//Termina la funcion
//Line vacia 
        reconocimiento.start();//Inicia el reconocimiento de voz 
    } else {//En caso de que el navegador no soporte la API de reconocimiento de voz manda una alerta
        alert('Lo siento, tu navegador no soporta la API de reconocimiento de voz.');//Lanza la alerta indicando que el navegador no es compatible
    }//Termina la condicional
});//Termina toda la funcion