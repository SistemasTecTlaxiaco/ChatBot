const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); 
const client = new Client({puppeteer: {executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',}});

// Lectura del codigo QR
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// Depues de conectar el coidgo QR, probar el robot
client.on('ready', () => {
    console.log('WhatsApp conectado. Prueba tu robot ahora');
});
// Iniciar
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Retraso

// Flujo de mensajes

client.on('message', async msg => {

    if ((msg.body === 'Test1'|| msg.body === 'test1') && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //El retraso está en milesegundos, 3000 es 3 segundos
        await chat.sendStateTyping(); // Simulando Digitando
        await client.sendMessage(msg.from, 'Hola que tal? Soy  Bot 🤖 de Socios Digitales');
        await delay(3000); //retradso de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitando
        await client.sendMessage(msg.from, 'Si recibiste este mensaje es porque tu configuracion fue exitosa');
        await delay(3000); //retraso de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitando
        await client.sendMessage(msg.from, 'Ahora voy a enviarte enviar un audio 👇');

        await delay(6000); //Retraso de 5 segundos
        await chat.sendStateRecording(); //Simulando audio grbvando
        await delay(6000); //Retraso de 5 segundos
        const audio1 = MessageMedia.fromFilePath('./audiobot.ogg'); // Srchivo de audio en ogg grabado, purde ser .opus también
        await client.sendMessage(msg.from, audio1, {sendAudioAsVoice: true}); // enviando el audio1

        await delay(10000); //retraso de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitación
        await client.sendMessage(msg.from, 'Podrás enviar imágenes');

        const imagem1 = MessageMedia.fromFilePath('./foto1.png'); // arcuivo en imagen, puede ser jpeg también
        await client.sendMessage(msg.from, imagem1, {caption: 'Puedes agregar descripciones para mayor informació'}); //Enviando una imagen 

        await delay(3000); //retraso de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitación
        await client.sendMessage(msg.from, 'También podrás enviar videos');

        const video1 = MessageMedia.fromFilePath('./video1.mp4'); //vídeo 01
        await client.sendMessage(msg.from, video1, {caption: 'Aquí puedes poner descripción también'});

        await delay(3000); //retraso de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitación
        await client.sendMessage(msg.from, 'Y hasta PDFs 👇');

        const documento1 = MessageMedia.fromFilePath('./pdf1.pdf'); // pdf para ser enviado
        await client.sendMessage(msg.from, documento1); //Enviando un pdf


        await delay(3000); //retraso de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitación
        await client.sendMessage(msg.from, 'Genial verdad? Ahora usa tu criatividad para crear tus flujos de mensajes, caso quieras recibir nuevamente los mensages, digite hola');




    }

    
       



});