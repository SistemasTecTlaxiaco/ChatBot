// Invocamos el lector de codigo qr
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); 
const client = new Client({puppeteer: {executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',}});

// habilitamos el acceso al codigo qr
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// informa que el whatsapp está conectado
client.on('ready', () => {
    console.log('Todo bien! WhatsApp conectado.');
});
// Iniciación
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Función que usamos para crear un retraso entre una acción y otra

// Flujo de conversación

let saudacaoEnviada = {};

client.on('message', async (msg) => {
    const chat = await msg.getChat();

    // Verificar si el mensaje es de un grupo o si es de un usuario
    if (!msg.from.endsWith('@c.us')) {
        return; // Ignorar mensages de grupos
    }

    if (!saudacaoEnviada[msg.from]) {
        saudacaoEnviada[msg.from] = true;
        
        await chat.sendStateTyping();
        await delay(5000);
        const contact = await msg.getContact(); //extrayendo el contacto
        const name = contact.pushname; //extrayendo el nombre del contacto
        await client.sendMessage(msg.from, 'Hola '+ name.split(" ")[0] + '👋 Bienvenido al al curso *Chatbots sin mensualidades*  Como podemos ayudarte?\n\n1- Saber el Precio.\n2- Saber Funcionalidades.\n3- Se usa alguna plataforma?\n4- Duración del curso.\n5- Link de compra.\n0- Menú principal.');

    }


    if (msg.body !== null && msg.body === '1'|| msg.body === 'Precio'|| msg.body === 'costo'|| msg.body === 'precio'|| msg.body === 'Costo'|| msg.body === 'valor'|| msg.body === 'Valor' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'El precio de nuestro curso está de promoción de ~US$ 199.00~ por apenas US$49.90, SIN EMBARGO, por nuestro LANZAMIENTO, para los primeros 50 alumnos, costará US$29.90 \n\nAquí te dejamos el link de compra para que entres en la promoción: https://pay.hotmart.com/U90192315B?off=1aiunkxn ');

        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

    }

    if (msg.body !== null && msg.body === '2'|| msg.body === 'Funcionalidades'|| msg.body === 'Funciones'|| msg.body === 'funcionalidades'|| msg.body === 'funciones' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Te enseñaremos a crear tu chatbot con las principales funciones para atender a tus clientes en automático. Podrás enviar imágenes, enviar textos, enviar videos, enviar audios (como si hubieran sido grabados al momento). Además, podras crear menu de opciones como este para una atención rápida, reconocer el nombre del cliente y mucho más. Lo mejor de todo es que no necesitas pagar plataformas externas, ni tener tu computador prendido para que funcione.\n\nAquí te dejamos el link de compra para que entres en la promoción: https://pay.hotmart.com/U90192315B?off=1aiunkxn ');

        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

    }

    if (msg.body !== null && msg.body === '3'|| msg.body === 'plataformas'|| msg.body === 'plataforma'|| msg.body === 'software'|| msg.body === 'Software' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'No necesitas usar ninguna app, ni niguna plataforma, ya que te enseñaré a crear chatbots sin pagar mensualidades. Solo necesitas una computadora para aprender a configurar y listo. No necesitas que tu computadora esté prendida siempre, tu bot funcionara 24 hrs.\n\nAquí te dejamos el link de compra para que entres en la promoción: https://pay.hotmart.com/U90192315B?off=1aiunkxn ');

        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

    }


    if (msg.body !== null && msg.body === '4'|| msg.body === 'duración'|| msg.body === 'Duración' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Tendrás acceso al curso por 1 año, tiempo suficiente para haber podido implementar tu bot. En realidad, siguiendo el paso a paso, podrás crear tu chatbot en poccas horas o días. \n\nAquí te dejamos el link de compra para que entres en la promoción: https://pay.hotmart.com/U90192315B?off=1aiunkxn');

        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

    }

    if (msg.body !== null && msg.body === '5'|| msg.body === 'Pagar'|| msg.body === 'pagar'|| msg.body === 'Link'|| msg.body === 'link de pago' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Aquí te dejo el link de pago aprovecha la promoción de los primeros 50 alumnos:  https://pay.hotmart.com/U90192315B?off=1aiunkxn ');

    }


    if (msg.body !== null && msg.body === 'AYUDA'|| msg.body === 'Ayuda' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Acabamos de solicitar a uno de nuestros asesores para ayudarte. Aguarde unos minutos');

    }


});