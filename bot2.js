// Invocamos el lector de codigo qr
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // 
const client = new Client({puppeteer: {executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',}});

// habilitamos el acceso al codigo qr
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// informa que el whatsapp está conectado
client.on('ready', () => {
    console.log('Todo OK! WhatsApp conectado.');
});
// Iniciación
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Función para crear un retraso de un mensaje a otro

// Flujo de conversación

client.on('message', async msg => {

    if (msg.body.match(/(ativar|ativar funil|informação|eu quero|como funciona|funciona|teste|interessado|informações|mais informações|Imagens|videos|audios|teste)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //retraso de 3 segundos
        await chat.sendStateTyping(); // Simulando digitación
        await delay(5000); //retraso de 3000 milisegundos o 3 segundos
        const contact = await msg.getContact(); //extrayendo el contacto
        const name = contact.pushname; //extrayendo el nombre del contacto
        await client.sendMessage(msg.from,'Hola! '+ name.split(" ")[0] + ', Sé bienvenido a un flujo de chatbots creado sin pagar mensualidades'); //Primer mensaje de texto
        await delay(3000); //retraso de 3 segundos
        await chat.sendStateTyping(); // Simulando digitación
        await delay(3000); //retraso 3 segundos
        await client.sendMessage(msg.from, 'Aquí te mostraré como es fácil crear un chatbot. Como viste una de las funcionalidades es tomar tu nombre en automatico.');
        await delay(3000); //retraso de 3 segundos
        
    
        await delay(3000); //retraso de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitación
        await delay(3000); //Delay de 3 segundos
        await client.sendMessage(msg.from, 'Ahora voy a mandarte un audio como si lo hubiera grabado ahora.');
        await delay(5000); //retraso de 5 segundos
        await chat.sendStateRecording(); //Simulando grabando audio
        await delay(5000); //retraso de 5 segundos
        const formal1 = MessageMedia.fromFilePath('./audio-funil.ogg'); // Archivo de audio en ogg grabado, puede ser .opus también
        await client.sendMessage(msg.from, formal1, {sendAudioAsVoice: true}); // enviando el audio-funil


        await delay(4000); //retraso de 4 segundos
        await chat.sendStateTyping(); // Simulando Digitación
        await client.sendMessage(msg.from, 'Ahora quiero enviarte una imagen');
        await delay(3000); //retraso de 3 segundos
        const img1 = MessageMedia.fromFilePath('./foto-funil.jpeg'); // archivo en imagen, puede ser jpeg también
        await client.sendMessage(msg.from, img1, {caption: 'Aquí puedes poner una descripción a tu imagen'}); //Enviando la imagen

   
        await delay(4000); //retraso de 4 segundos
        await chat.sendStateTyping(); // Simulando Digitación
        await client.sendMessage(msg.from, 'Por quiero enviarte un video');
        await delay(3000); //retraso de 3 segundos
        const video1 = MessageMedia.fromFilePath('./video-bot.mp4'); //Enviando un video
        await client.sendMessage(msg.from, video1, {caption: 'Puedes colocar otra descripción'});


        await delay(3000); //retraso de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitación
        await client.sendMessage(msg.from, 'Por último te enviaré un pdf');

        const doc1 = MessageMedia.fromFilePath('./pdf-bot.pdf'); // pdf para ser enviado
        await client.sendMessage(msg.from, doc1); //Enviando un pdf


        await client.sendMessage(msg.from, 'Listo! Ahora podrás crear todas los flujos que quieras como este ejemplo. Usa tu creatividad...');
    

   
    



    }
    
});