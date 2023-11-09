const mqtt = require('mqtt');
const axios = require('axios');

const client = mqtt.connect('mqtt://broker.hivemq.com');
let isFirstNotificationSent = false;
const { update_watch } = require('../services/server-service-fb');

client.on('connect', function () {
  client.subscribe('proyecto1-dispositivointrahospitalario-completado');
});

client.on('message', async function (topic, message) {
  try {
    const selectedName = message.toString(); // Assuming the name is included in the message payload

    console.log('Selected name:', selectedName);

    if (!isFirstNotificationSent) {
      const response = await update_watch(selectedName);
      const result = 'Marcado como completado';

      // Publish the result using MQTT
      client.publish('proyecto1-dispositivointrahospitalario-completado', JSON.stringify(result));

      isFirstNotificationSent = true; // Set the flag to true after sending the first notification
    } else {
      isFirstNotificationSent = false; // Reset the flag to false to allow sending notifications again
    }
  } catch (error) {
    console.error('Error processing MQTT message:', error);
  }
});
