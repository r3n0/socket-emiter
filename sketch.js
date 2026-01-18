let socket;
let canal = 'canal-1'; // Elige el nombre que quieras

function setup() {
	createCanvas(800, 600);


	socket = io('http://10.0.0.101:3000', {
		// Eliminamos la restricción de solo websocket para mayor compatibilidad
		transports: ['polling', 'websocket'],
		reconnection: true
	});

	// Añade esto para debuggear en la consola de p5.js
	socket.on('connect_error', (err) => {
		console.log('Error de conexión detallado:', err.message);
	});

	// Al conectarnos, nos unimos al canal
	socket.on('connect', () => {
		console.log('✅ Conectado al servidor con ID:', socket.id);
		socket.emit('join-channel', canal);
	});
}

function draw() {
	background(220);
	text('Mueve el mouse para enviar datos', 10, 20);

	// Mapeamos la posición X (0-400) a un ángulo (0-180)
	let valor = floor(map(mouseX, 0, width, 0, 180));

	// Solo enviamos si el mouse está dentro del lienzo
	if (mouseX > 0 && mouseX < width) {
		socket.emit('send-value', {
			channel: canal,
			value: valor,
		});
		// console.log(valor);
	}
}
