const mqtt = require('mqtt');
const { update_watch_by_professional, ProfessionalsService } = require('../services/server-service-fb');


const client = mqtt.connect('mqtt://broker.hivemq.com');
let isFirstNotificationSent = false;

client.on('connect', function () {
  client.subscribe('proyecto1-dispositivointrahospitalario-emparejado');
});

client.on('message', async function (topic, message, professional) {
  try {
    const selectedName = message.toString();
    console.log('Received message:', message.toString());
    console.log('Selected name:', selectedName);

    if (!isFirstNotificationSent) {
      const names = await ProfessionalsService(); 
      const randomIndex = Math.floor(Math.random() * names.length);
      const professional1 = names[2];

      const result = await update_watch_by_professional(selectedName, professional1);
      console.log('Result:', result);

      client.publish('proyecto1-dispositivointrahospitalario-emparejado', JSON.stringify(result));

      isFirstNotificationSent = true;
    } else {
      isFirstNotificationSent = false;
    }
  } catch (error) {
    console.error('Error processing MQTT message:', error);
  }
});
