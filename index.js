const { ApolloServer, gql } = require('apollo-server');
const { db } = require('./src/model/db');
const { typeDefs } = require('./src/model/schema');
const { resolvers } = require('./src/model/resolvers');

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen(5432).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

/*
  # Nuestras mutaciones que definen como interactuar con los datos
  type Mutation {
    # Crear un nuevo TODO pasando el contenido
    createDeviceConfig(
      # El tipo de dispositivo al que aplicará nuestra configuración
      deviceType: String
      # El los parametros de la función de concatenación para el ID
      QIDfunction: Concatfunction
      # El los parametros de la función de concatenación para el nombre de la señal
      QNfunction: Concatfunction # El estado actual de nuestro DeviceConfig
    ): DeviceConfig
    # Borrar un DeviceConfig existente mediante el ID
    deleteDeviceConfig(id: String): DeviceConfig
    # Marcar como completo un TODO existente mediante el ID
    addHWIDtoDeviceConfig(HWID: String): DeviceConfig
  }

  # Nuestras suscripciones que definen a que datos suscribirse
  type Subscription {
    # Suscribirse a los nuevos DeviceConfig creados
    deviceConfigCreated(status: String!): DeviceConfig
    # Suscribirse a las actualizaciones de un TODO mediante el ID
    deviceConfigUpdated(id: String!): DeviceConfig
  }
  # Nuestro esquema principal que define la query, mutation y subscription
  type Schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
  */
