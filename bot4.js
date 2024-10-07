const qrcode = require('qrcode-terminal');
const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client({ puppeteer: { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } });

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Genial! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

let aguardandoNome = {};
let aguardandoPerguntas = {};

client.on('message', async (msg) => {
    const chat = await msg.getChat();

    // Verificar si el mensaje es de un grupo o si es de un usuario
    if (!msg.from.endsWith('@c.us')) {
        return; // Ignorar mensajes de grupos
    }

    if (!aguardandoNome[msg.from] && !aguardandoPerguntas[msg.from]) {
        aguardandoNome[msg.from] = true;
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Hola bienvenido 👋, Cuál es tu nombre?');
    } else if (aguardandoNome[msg.from]) {
        delete aguardandoNome[msg.from];
        aguardandoPerguntas[msg.from] = 1;
        await delay(5000);
        const nome = msg.body;
        await client.sendMessage(msg.from, `Es un placer, ${nome}! Ahora quiero saber un poco más sobre ti`);
        await delay(4000);
        await client.sendMessage(msg.from, '*Pregunta 1*: Qué edad tienes?\n_Ejm: 25_');
    } else if (aguardandoPerguntas[msg.from] === 1) {
        aguardandoPerguntas[msg.from] = 2;
        const idade = msg.body;
        await client.sendMessage(msg.from, `Genial, ${idade} años. Veo queres joven.\n\n*Pregunta 2:* Qué te gusta hacer en tus tiempos libres?`);
    } else if (aguardandoPerguntas[msg.from] === 2) {
        aguardandoPerguntas[msg.from] = 3;
        const hobby = msg.body;
        await client.sendMessage(msg.from, `Waoo! Antes solía ${hobby} también.\n\n*Última pergunta:* Cuál es tu plato de comida favorito?`);
    } else if (aguardandoPerguntas[msg.from] === 3) {
        aguardandoPerguntas[msg.from] = 4;
        const comidaFavorita = msg.body;
        await client.sendMessage(msg.from, `Uhmmmm, ${comidaFavorita} me gusta también!\nAhora, te enviaré una imagen.`);
        
        const img1 = MessageMedia.fromFilePath('./foto-funil.jpeg');
        
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, img1);

        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Por último, te gustaría aprovechar la promoción y aprender a crear chatbots sin mensualidades?`);

    } else if (aguardandoPerguntas[msg.from] === 4) {
        delete aguardandoPerguntas[msg.from];
        const comidaFavorita = msg.body;
        await client.sendMessage(msg.from, `Genial, es solo realziar tu compra a través de este link: https://pay.hotmart.com/U90192315B?off=1aiunkxn`);
    

        await client.sendMessage(msg.from, 'Nos vemos en el curso');
    } else {

    return;
    
    }
});