document.getElementById('iniciar').addEventListener('click', function() {

    if ('webkitSpeechRecognition' in window) {
        const reconocimiento = new webkitSpeechRecognition();
        reconocimiento.lang = 'es-ES'; 
        reconocimiento.interimResults = false; 
        reconocimiento.maxAlternatives = 1;

        reconocimiento.onresult = function(event) {
            const resultado = event.results[0][0].transcript; 
            document.getElementById('inputBusqueda').value = resultado; 
            document.getElementById('resultado').textContent = 'Resultado: ' + resultado;
            console.log('Resultado: ' + resultado);
        };

        reconocimiento.onerror = function(event) {
            console.error('Error de reconocimiento: ' + event.error);
        };

        reconocimiento.onend = function() {
            console.log('Reconocimiento de voz finalizado.');
        };

        reconocimiento.start(); 
    } else {
        alert('Lo siento, tu navegador no soporta la API de reconocimiento de voz.');
    }
});