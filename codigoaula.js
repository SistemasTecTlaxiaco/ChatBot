// Invocamos o leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client({puppeteer: {executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',}});

// entao habilitamos o usuario a acessar o serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certin
client.on('ready', () => {
    console.log('Listo! WhatsApp conectado correctamente.');
});
// E inicializa tudo para fazer a nossa magica =)
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil Base Projeto

client.on('message', async msg => {

    if (msg.body.match(/(activar|activar funnel|información|yo quiero|como funciona|funciona|teste|interesado|más información|imagenes|videos|audios|iptv)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulación que esta escribiendo
        await delay(5000); //Delay de 3000 milisegundos más coocido como 3 segundos
        const contact = await msg.getContact(); //Agarrando el contacto
        const name = contact.pushname; //Agarrando el nombre del contacto
        await client.sendMessage(msg.from,'Qué más socios! '+ name.split(" ")[0] + ', Sea bienvenido a la comunidad de socios digitales pro. Usted esta entrando a una clase de como manipular el ñchatbot y poderlo adaptar a su negocio'); //Primeira mensagem de texto
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulación que esta escribiendo
        await delay(3000); //delay de 3 segundos
        await client.sendMessage(msg.from, 'Você vai ter contato com as funcionalidades básicas do nosso projeto e poderá ver o quanto é fácil criar seus próprios funis personalizados.');
        await delay(3000); //delay de 3 segundos
        
    
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulación que esta escribiendo
        await delay(3000); //Delay de 3 segundos
        await client.sendMessage(msg.from, 'Agora eu vou te mandar um audio gravado mas enviado como se fosse fresquinho!!');
        await delay(5000); //Delay de 5 segundos
        await chat.sendStateRecording(); //Simulando audio grabando
        await delay(5000); //Delay de 5 segundos
        const formal1 = MessageMedia.fromFilePath('./audio_base.ogg'); // Archivo de audio en ogg grabado, también puede ser .opus
        await client.sendMessage(msg.from, formal1, {sendAudioAsVoice: true}); // enviando o audio1

        await delay(9000); //Delay de 5 segundos
        await chat.sendStateRecording(); //Simulando audio grabando
        await delay(5000); //Delay de 5 segundos
        const formal2 = MessageMedia.fromFilePath('./audio1.ogg'); // Archivo de audio en ogg grabado, también puede ser .opus
        await client.sendMessage(msg.from, formal2, {sendAudioAsVoice: true}); // enviando o audio1

        await delay(9000); //Delay de 5 segundos
        await chat.sendStateRecording(); //Simulando audio grabando
        await delay(5000); //Delay de 5 segundos
        const formal3 = MessageMedia.fromFilePath('./audio1.ogg'); // Archivo de audio en ogg grabado, también puede ser .opus
        await client.sendMessage(msg.from, formal3, {sendAudioAsVoice: true}); // enviando o audio1

        await delay(4000); //Delay de 4 segundos
        await chat.sendStateTyping(); // Simulación que esta escribiendo
        await client.sendMessage(msg.from, 'Agora quero te mandar uma imagem');
        await delay(3000); //Delay de 3 segundos
        const img1 = MessageMedia.fromFilePath('./imagem_base.png'); // archivo en imagen también puede ser jpeg
        await client.sendMessage(msg.from, img1, {caption: 'Aqui é a legenda'}); //Enviando a imagen

        await delay(5000); //Delay de 5 segundos
        const img2 = MessageMedia.fromFilePath('./imagem1.png'); // archivo en imagen también puede ser jpeg
        await client.sendMessage(msg.from, img2, {caption: 'Aqui é a legenda'}); //Enviando a imagen
        
        await delay(5000); //Delay de 5 segundos
        const img3 = MessageMedia.fromFilePath('./imagem1.png'); // archivo en imagen también puede ser jpeg
        await client.sendMessage(msg.from, img3, {caption: 'Aqui é a legenda'}); //Enviando a imagen

        await delay(4000); //Delay de 4 segundos
        await chat.sendStateTyping(); // Simulación que esta escribiendo
        await client.sendMessage(msg.from, 'Agora quero te mandar um video');
        await delay(3000); //Delay de 3 segundos
        const vid = MessageMedia.fromFilePath('./cap1.mp4'); //vídeo 01
        await client.sendMessage(msg.from, vid, {caption: 'legenda do vídeo'});

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulación que esta escribiendo
        await client.sendMessage(msg.from, 'Agora quero te mandar um pdf');

        const doc1 = MessageMedia.fromFilePath('./Pdf.pdf'); // pdf para ser enviado
        await client.sendMessage(msg.from, doc1); //Enviando el pdf


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulación que esta escribiendo
        await delay(3000); //Delay de 3 segundos
        await client.sendMessage(msg.from, 'Prontinho! Agora use a sua criatividade para criar sequencias de respostas com textos, audios, imagens... O céu é o limite');    

    }   
});
