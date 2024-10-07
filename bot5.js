// Traemos el lector de código QR

const qrcode = require('qrcode-terminal');

const { Client, Buttons, List, MessageMedia, LocalAuth } = require('whatsapp-web.js');



const client = new Client({puppeteer: {executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',}});



// Habilitamos el código QR

client.on('qr', qr => {

    qrcode.generate(qr, {small: true});

});

// Mensaje de confirmación conectado

client.on('ready', () => {

    console.log('Tudo certo! WhatsApp conectado.');

});

// Iniciar las automatizaciones

client.initialize();



client.on('message', async (msg) => {

    if (msg.body === 'Grupo1') {

      const chat = await msg.getChat();

      const participants = chat.participants;

  

      // Construir una lista de números 

      const mentionedNumbers = participants.map(participant => `@${participant.id.user}`);

  

      const mentionedString = mentionedNumbers.join(' ');

      const message = `Hola a todos!  ${mentionedString}`;

      const img1 = MessageMedia.fromFilePath('./foto-funil.jpeg'); // arquivo de imagen a enviarse

      await client.sendMessage(msg.from, img1, {caption: 'Descripción'}); //Enviando una imagen
      
      await chat.sendMessage(message);

    }

  

});