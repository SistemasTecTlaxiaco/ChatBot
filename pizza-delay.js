const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

const delay = ms => new Promise(res => setTimeout(res, ms));

const menu = {
  '1': { name: 'Pizza Hawaiana', price: 30.0 },
  '2': { name: 'Pizza de Mussarela', price: 25.0 },
  '3': { name: 'Pizza de Pollo con Catupiry', price: 35.0 },
  '4': { name: 'Gaseosa 2L', price: 8.0 },
  '5': { name: 'Jugo de Naranja 500ml', price: 5.0 },
};

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('¡Listo! Su WhatsApp se ha conectado correctamente.');

  client.on('message', async (message) => {
    const chat = await message.getChat(); // Obtiene el objeto chat

    if (["atención", "hola", "quiero hacer un pedido", "quiero hacer una orden", "hacer pedido"].includes(message.body.toLowerCase()) && message.from.endsWith('@c.us')) {
      await chat.sendStateTyping();
      await delay(3000); // Simula escribiendo durante 3 segundos

      await client.sendMessage(message.from, 'Hola! ¿Cómo estás? Aquí la Pizzería de los Socios. Te voy a mandar nuestro menú.');

      let options = '';
      for (const [key, value] of Object.entries(menu)) {
        options += `${key}. ${value.name} - R$${value.price}\n`;
      }

      await chat.sendStateTyping();
      await delay(3000); // Simula escribiendo durante 3 segundos

      await client.sendMessage(message.from, `Menú de opciones:\n${options}\nEscribe el número de la opción deseada.`);
    } else if (Object.keys(menu).includes(message.body) && !message.fromMe) {
      const selectedOption = menu[message.body];
      if (!client.order) {
        client.order = {
          items: [],
          totalPrice: 0.0,
          customerAddress: '',
        };
      }
      client.order.items.push(selectedOption);
      client.order.totalPrice += selectedOption.price;

      await chat.sendStateTyping();
      await delay(3000); // Simula escribiendo durante 3 segundos

      await client.sendMessage(message.from, `Gracias, escogiste ${selectedOption.name}. El valor actual de tu pedido es R$${client.order.totalPrice}.`);

      await chat.sendStateTyping();
      await delay(3000); // Simula escribiendo durante 3 segundos

      await client.sendMessage(message.from, 'Escribe el número de la próxima opción deseada o envía "finalizar" para concluir tu pedido.');
    } else if (message.body.toLowerCase() === 'finalizar' && !message.fromMe) {
      if (!client.order || client.order.items.length === 0) {
        await chat.sendStateTyping();
        await delay(3000); // Simula escribiendo durante 3 segundos

        await client.sendMessage(message.from, 'Tu pedido está vacío. Por favor, escoge una opción de nuestro menú.');
        return;
      }

      await chat.sendStateTyping();
      await delay(3000); // Simula escribiendo durante 3 segundos

      await client.sendMessage(message.from, 'Tu pedido contiene:');
      let orderSummary = '';
      for (const item of client.order.items) {
        orderSummary += `${item.name} - R$${item.price}\n`;
      }
      await client.sendMessage(message.from, orderSummary);

      await chat.sendStateTyping();
      await delay(3000); // Simula escribiendo durante 3 segundos

      await client.sendMessage(message.from, `El valor total de tu pedido es R$${client.order.totalPrice}.`);

      await chat.sendStateTyping();
      await delay(3000); // Simula escribiendo durante 3 segundos

      await client.sendMessage(message.from, 'Por favor, indícanos tu dirección completa y número de la casa *"entre más específico mejor"*.');
    } else if (client.order && !message.fromMe) {
      // Recibe la dirección del cliente y confirma el pedido
      client.order.customerAddress = message.body;
      const order = client.order;

      await chat.sendStateTyping();
      await delay(3000); // Simula escribiendo durante 3 segundos

      await client.sendMessage(message.from, `Gracias! Tu pedido será entregado en la dirección: ${order.customerAddress}.`);

      await chat.sendStateTyping();
      await delay(3000); // Simula escribiendo durante 3 segundos

      await client.sendMessage(message.from, 'Para el pago, aceptamos Nequi, tarjeta de crédito y efectivo. ¡Gracias! Ahora solo espera tu pedido.');
      // Resetea el pedido del cliente
      client.order = null;
    }
  });
});

client.initialize();
