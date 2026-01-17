let socket;
let canal = 'canal-11'; // Elige el nombre que quieras

function setup() {
	createCanvas(400, 400);

	// Conectamos con tu IP y el puerto 3000
	socket = io('http://206.189.168.40:3000', { transports: ['websocket'] });

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
