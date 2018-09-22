// const dbUri = "bolt://192.168.99.100:7687"
// const dbUser = "neo4j"
// const dbPassword = "test"

// module.exports = {dbUri, dbUser, dbPassword}

const convict = require('convict')
const fs = require('fs')
// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port"
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: '*',
      default: '192.168.99.100'
    },
    user: {
      doc: "Database userrname",
      format: String,
      default: 'neo4j',
      env: 'DB_USER'
    },
    password: {
      doc: "Database password",
      format: String,
      default: 'test',
      env: 'DB_PASSWORD'
    }
  }
});

// Load environment dependent configuration
var env = config.get('env');
const envFile = './config/' + env + '.json'
if (fs.existsSync(envFile)) {
    config.loadFile(envFile);
}

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;