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
  console.log('Listo! su WhatsApp conectado de manera correcta!');

  client.on('message', async (message) => {
    if ((message.body.toLowerCase() === 'Atención'|| message.body === 'Hola'|| message.body === 'hola'|| message.body === 'Quiero hacer un pedido'|| message.body === 'Quiero hacer una orden'|| message.body === 'Hacer pedido') && message.from.endsWith('@c.us')) {
      await client.sendMessage(message.from,'Hola! Cómo estás? Aqui la Pizzería de los Socios. Te voy a mandar nuesto menú.');
      let options = '';
      for (const [key, value] of Object.entries(menu)) {
        options += `${key}. ${value.name} - R$${value.price}\n`;
      }
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`Menú de opciones:\n${options}\nDigite el número de la opción deseada.`);
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
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`Gracias usted escogio ${selectedOption.name}. El valor actual de su pedido es de R$${client.order.totalPrice}.`);
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,'Digite el número de la próxima opción deseada o envie "finalizar" para concluir su pedido.');
    } else if (message.body.toLowerCase() === 'finalizar' && !message.fromMe) {
      if (!client.order || client.order.items.length === 0) {
        await delay(3000); //Delay de 3 segundos

        await client.sendMessage(message.from,'Su pedido está vacio. Por favor, escoja una opción de nuestro menú.');
        return;
      }
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`Su pedido contiene:`);
      let orderSummary = '';
      for (const item of client.order.items) {
        orderSummary += `${item.name} - R$${item.price}\n`;
      }
      await message.reply(orderSummary);
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`El valor total de su pedido es de R$${client.order.totalPrice}.`);
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,'Por favor, me informa su dirección completa y número de la casa *"entre más específico mejor"*');
    } else if (client.order && !message.fromMe) {
      // Recebe o endereço do cliente e confirma o pedido
      client.order.customerAddress = message.body;
      const order = client.order;
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,`Gracias! Su pedido será entregado en la dirección ${order.customerAddress}.`);
      await delay(3000); //Delay de 3 segundos

      await client.sendMessage(message.from,'Para el pago, aceptamos Nequi, cartón de crédito e efectivo. Gracias! Ahora es solo esperar su pedido!');
      // Reseta o pedido do cliente
      client.order = null;
    }
  });

});
client.initialize();