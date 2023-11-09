const mqtt = require('mqtt');
const axios = require('axios');

const client = mqtt.connect('mqtt://broker.hivemq.com');
let isFirstNotificationSent = false;
const { getNotificationById } = require('../repositories/server-fb.repository');


client.on('connect', function () {
  client.subscribe('watch.numero');
});

client.on('message', async function (topic, message) {
  try {
    const selectedName = message.toString(); 

    console.log('Received message:', message.toString());
    console.log('Selected name:', selectedName);
    console.log(new Date())


      const watch_id= selectedName
      const result= await getNotificationById(watch_id)
      // console.log('Result:', result);

      // Publish the result using MQTT
      let finalMsg = '';
      for (const key in result) {
        finalMsg += result[key] + '/'
      }
      console.log(finalMsg)
      client.publish('watch.notificacion', finalMsg)

    
  } catch (error) {
    console.error('Error processing MQTT message:', error);
  }
});
