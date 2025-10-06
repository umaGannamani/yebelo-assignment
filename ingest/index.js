const fs = require('fs');
const csv = require('csv-parser');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'ingest-client',
  brokers: ['localhost:9092'], // Redpanda broker
});

const producer = kafka.producer();
const topic = 'trade-data';

async function run() {
  await producer.connect();
  fs.createReadStream('trades_data.csv')
    .pipe(csv())
    .on('data', async (row) => {
      await producer.send({
        topic,
        messages: [{ value: JSON.stringify(row) }],
      });
      console.log('Sent:', row);
    })
    .on('end', async () => {
      console.log('All messages sent');
      await producer.disconnect();
    });
}

run().catch(console.error);
