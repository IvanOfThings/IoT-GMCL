const { gql } = require('apollo-server');

const typeDefs = gql`
  "Función de concatenación, permite concatenar dos cadenas con un prefijo, un sufijo y una cadena media de unión"
  type Concatfunction {
    """
    El prefijo a aplicar a nuestra función de concatenación
    """
    prefix: String
    """
    El catacter separador a aplicar a nuestra función de concatenación
    """
    middle: String
    """
    El postfijo a aplicar a nuestra función de concatenación
    """
    postfix: String
    """
    El elemento a concatenar 1
    """
    subject1: String
    """
    El elemento a concatenar 2
    """
    subject2: String
  }

  input ConcatfunctionInput {
    """
    El prefijo a aplicar a nuestra función de concatenación
    """
    prefix: String
    """
    El catacter separador a aplicar a nuestra función de concatenación
    """
    middle: String
    """
    El postfijo a aplicar a nuestra función de concatenación
    """
    postfix: String
    """
    El elemento a concatenar 1
    """
    subject1: String
    """
    El elemento a concatenar 2
    """
    subject2: String
  }

  type DevicePrefixType {
    # Nombre cualificado a reemplazar
    qualifiedName: String!
    # Nombre organizacional a utilizar a partir de este momento para el nombre cualificado anterior
    orgName: String!
  }

  type DoAtionsType {
    # Lista de Hardware Id a lo sque aplicar las reglas
    HWID: [String]!
    # Función que permite obtener a partir de nombres cualificados los nombres organizacionales
    DevicePrefix: String
  }

  type DeviceConfig {
    # El ID único de nuestro DeviceConfig
    id: String!
    # El tipo de dispositivo al que aplicará nuestra configuración
    deviceType: String!
    # El los parametros de la función de concatenación para el ID
    QIDfunction: Concatfunction!
    # El los parametros de la función de concatenación para el nombre de la señal
    QNfunction: Concatfunction!
    # El estado actual de nuestro TODO
    do: DoAtionsType!
  }

  # Nuestra query principal que define la forma de consumir datos
  type Query {
    # Obtener las configuraciones de un dispositivo concetro
    deviceConfig(id: String!): DeviceConfig
    # Obtener las configuraciones de un dispositivo concetro
    # deviceConfigs(deviceType: String!, HWID: String!): [DeviceConfig]
    # Obtener las configuraciones de un dispositivo concetro
    deviceConfigs(deviceType: String!): [DeviceConfig]
    # Obtener una lista de todas las configuraciones
    allDeviceConfig: [DeviceConfig]
  }
  # Nuestras mutaciones que definen como interactuar con los datos
  type Mutation {
    # Crear un nuevo TODO pasando el contenido
    createDeviceConfig(
      # El tipo de dispositivo al que aplicará nuestra configuración
      deviceType: String!
      # El los parametros de la función de concatenación para el ID
      QIDfunction: ConcatfunctionInput!
      # El los parametros de la función de concatenación para el nombre de la señal
      QNfunction: ConcatfunctionInput!
    ): DeviceConfig
  }
`;

/*
const typeDefs = gql`
  "Función de concatenación, permite concatenar dos cadenas con un prefijo, un sufijo y una cadena media de unión"
  type Concatfunction {
    """
    El prefijo a aplicar a nuestra función de concatenación
    """
    prefix: String!
    """
    El catacter separador a aplicar a nuestra función de concatenación
    """
    middle: String!
    """
    El postfijo a aplicar a nuestra función de concatenación
    """
    postfix: String!
    """
    El elemento a concatenar 1
    """
    subject1: String!
    """
    El elemento a concatenar 2
    """
    subject2: String!
  }

  type DevicePrefixType {
    # Nombre cualificado a reemplazar
    qualifiedName: [String]!
    # Nombre organizacional a utilizar a partir de este momento para el nombre cualificado anterior
    orgName: String!
  }

  type DoAtionsType {
    # Lista de Hardware Id a lo sque aplicar las reglas
    HWID: [String]!
    # Función que permite obtener a partir de nombres cualificados los nombres organizacionales
    DevicePrefix: String!
  }

  type DeviceConfig {
    # El ID único de nuestro DeviceConfig
    id: String!
    # El tipo de dispositivo al que aplicará nuestra configuración
    deviceType: String!
    # El los parametros de la función de concatenación para el ID
    QIDfunction: Concatfunction!
    # El los parametros de la función de concatenación para el nombre de la señal
    QNfunction: Concatfunction!
    # El estado actual de nuestro TODO
    do: DoAtionsType!
  }

  # Nuestra query principal que define la forma de consumir datos
  type Query {
    # Obtener las configuraciones de un dispositivo concetro
    deviceConfig(id: String!): DeviceConfig
    # Obtener las configuraciones de un dispositivo concetro
    # deviceConfigs(deviceType: String!, HWID: String!): [DeviceConfig]
    # Obtener las configuraciones de un dispositivo concetro
    deviceConfigs(deviceType: String!): [DeviceConfig]
    # Obtener una lista de todas las configuraciones
    allDeviceConfigs: [DeviceConfig]
  }

  # Nuestras mutaciones que definen como interactuar con los datos
  type Mutation {
    # Crear un nuevo TODO pasando el contenido
    createDeviceConfig(
      # El tipo de dispositivo al que aplicará nuestra configuración
      deviceType: String!
      # El los parametros de la función de concatenación para el ID
      QIDfunction: Concatfunction!
      # El los parametros de la función de concatenación para el nombre de la señal
      QNfunction: Concatfunction! # El estado actual de nuestro DeviceConfig
    ): DeviceConfig
    # Borrar un DeviceConfig existente mediante el ID
    deleteDeviceConfig(id: String!): Todo
    # Marcar como completo un TODO existente mediante el ID
    addHWIDtoDeviceConfig(HWID: String!): DeviceConfig
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
`;
*/
module.exports = { typeDefs };
