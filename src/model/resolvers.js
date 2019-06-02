// importamos uuid para crear nuestros ID únicos
const uuid = require('uuid/v4');
// nos traemos nuestro modelo Todo
const { DeviceConfig } = require('./db');
// imporatmos el módulo pubsub usado para suscripciones (luego lo creamos)
const pubsub = require('./pubsub');

/*
    # Obtener las configuraciones de un dispositivo concetro
    deviceConfig(id: String!): DeviceConfig
    # Obtener las configuraciones de un dispositivo concetro
    deviceConfigs(deviceType: String!, HWID: String!): [DeviceConfig]
    # Obtener las configuraciones de un dispositivo concetro
    deviceConfigs(deviceType: String!): [DeviceConfig]
    # Obtener una lista de todas las configuraciones
    allDeviceConfigs: [DeviceConfig]

*/
// este objeto contiene todos nuestros resolvers
const resolvers = {
  // acá definimos como resolver cada query de nuestro esquema
  Query: {
    // nuestra query de obtener todos los TODOs
    allDeviceConfig() {
      // devolvemos todos los TODOs usando nuestro modelo
      return DeviceConfig.find();
    },
    // nuestra query para obtener un único ID
    deviceConfig(_, { id }) {
      // el segundo parámetro que recibimos es un objeto con los parámetros
      // que pasamos a nuestra query, en este caso `id`
      // luego obtenemos un único TODO usando el ID que recibimos
      return DeviceConfig.findById(id);
    },
    // nuestra query para obtener un único ID
    deviceConfigs(_, { deviceType }) {
      // el segundo parámetro que recibimos es un objeto con los parámetros
      // que pasamos a nuestra query, en este caso `id`
      // luego obtenemos un único TODO usando el ID que recibimos
      return DeviceConfig.findAll({ where: { deviceType } });
    },
  },
  // acá definimos como resolver cada mutación de nuestro esquema
  Mutation: {
    // la mutación para crear un nuevo todo
    async createDeviceConfig(_, { deviceType, QIDfunction, QNfunction }) {
      console.log('ha llegado al resolver');
      // creamos un nuevo TODO usando `uudi` para generar el ID y definiendo status como `active`
      const deviceConfig = new DeviceConfig({
        id: uuid(),
        deviceType,
        QIDfunction,
        QNfunction,
        do: { HWID: ['df'] },
      });
      console.log(deviceConfig);
      deviceConfig.save((error, documento) => {
        if (error) {
          console.log('Error al intentar guardar');
        } else {
          console.log(documento);
        }
      });
      console.log('salvado');
      // devolvemos el TODO que creamos
      return deviceConfig;
    },
  },
};

module.exports = { resolvers };

/*
,
    // la mutación para borrar un TODO
    async deleteDeviceConfig(_, { id }) {
      // actualizamos el estado a `deleted` en el TODO con el ID que recibimos
      await DeviceConfig.deleteOne({ id });
    },

  // acá definimos como resolver cada suscripción de nuestro esquema
  Subscription: {
    // cuando se crea un TODO recibimos ese TODO y lo enviamos a los clientes
    deviceConfigCreated(deviceConfig) {
      return deviceConfig;
    },
    // cuando se actualiza un TODO recibimos ese TODO y lo enviamos a los clientes
    deviceConfigUpdated(deviceConfig) {
      return deviceConfig;

    },

        mutation{
          createDeviceConfig(
            deviceType: "prueba",
            QIDfunction:{
                  prefix: "a",
                  postfix: "b",
                  middle: "c",
                  subject1: "d",
                  subject2: "e",
            },
            QNfunction:{
                  prefix: "a",
                  postfix: "b",
                  middle: "c",
                  subject1: "d",
                  subject2: "e",
            }
          )
        }

        */
