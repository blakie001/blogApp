const { Client } = require("@elastic/elasticsearch");
// config/elasticsearch.js
const dotenv = require('dotenv');

dotenv.config();

const client = new Client ({
    node: process.env.ELASTICSEARCH_NODE,
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD,
    },
})

const testConnection = async () =>{
    try {
        await client.ping(),
        console.log("Connected to Elasticsearch")
    } catch (error) {
        console.error('Failed to connect to Elasticsearch:', error);
        process.exit(1); // Exit the process if the connection fails
    }
}
testConnection();

module.exports = client;