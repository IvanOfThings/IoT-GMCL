const mongoose = require('mongoose');

// definimos en constantes nuestras variables de entorno con los datos de conexión de la base de datos
const { DB_USER } = process.env;
const { DB_PASS } = process.env || cF4LdKi3cja2KNh;
const { DB_HOST } = process.env;
const { DB_NAME } = process.env;
const DB_PORT = process.env.DB_PORT || 5432;

const db = mongoose.connect(
  'mongodb+srv://client_back_gmcl:cF4LdKi3cja2KNh@cluster0-52qcl.mongodb.net/configTool',
  {
    useNewUrlParser: true,
  },
);

const { Schema } = mongoose;

const concatfunctionSchema = new Schema({
  prefix: { type: String, required: true },
  middle: { type: String, required: true },
  postfix: { type: String, required: true },
  subject1: { type: String, required: true },
  subject2: { type: String, required: true },
});
const concatfunction = mongoose.model('concatfunction', concatfunctionSchema);

const devicePrefixTypeSchema = new Schema({
  qualifiedName: { type: String, required: true },
  orgName: { type: String, required: true },
});
const devicePrefixType = mongoose.model('devicePrefixType', concatfunctionSchema);

const doAtionsTypeSchema = new Schema({
  HWID: { type: String, required: true },
  DevicePrefix: devicePrefixTypeSchema,
});
const doAtionsType = mongoose.model('doAtionsType', concatfunctionSchema);

const DeviceConfigSchema = new Schema({
  id: { type: String, required: true },
  deviceType: { type: String, required: true },
  QIDfunction: concatfunctionSchema,
  QNfunction: concatfunctionSchema,
  do: doAtionsTypeSchema,
});
const DeviceConfig = mongoose.model('DeviceConfig', DeviceConfigSchema);

// exportamos nuestra conexión a la base de datos y nuestro modelo
module.exports = {
  db,
  DeviceConfig,
  concatfunction,
  devicePrefixType,
  doAtionsType,
  DB_PORT,
};
