const express = require('express');
const { Kafka } = require('kafkajs');

const app = express();
const PORT = 3001;

// Kafka configuration
const kafka = new Kafka({
  clientId: 'bridge-client',
  brokers: ['localhost:29092'], // <-- Use the host-mapped port
  connectionTimeout: 3000,      // optional: reduce default timeout
  requestTimeout: 25000
});

const consumer = kafka.consumer({ groupId: 'rsi-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'your-topic-name', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

consumer.on(consumer.events.CRASH, (e) => {
  console.error('Consumer crashed:', e.payload.error);
});

consumer.on(consumer.events.DISCONNECT, () => {
  console.log('Consumer disconnected');
});

// Start consumer
runConsumer().catch(err => console.error('Error starting consumer:', err));

app.get('/', (req, res) => {
  res.send('Bridge server is running');
});

app.listen(PORT, () => {
  console.log(`Bridge server running on http://localhost:${PORT}`);
});
