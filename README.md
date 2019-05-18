# IoT-GMCL
Generic Module Configuration Language is an standardized language to configure transformation modules in IoT transformation processes

## What is GMCL

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Intoducción
GMCL o Generci Module Configuracion Language es un lenguaje de parametrización pensado para configurar los diferentes pasos de las transformaciones a aplicar durante un proceso de transformación de un dato (valor raw o no), permitiendo realizar conversiones estandarizadas hasta obtener el resultado en el formato deseado.

Ejemplos de estas transformaciones son: escalado, cambio de unidades, renombrado del dispositivo, renombrado de la señal, eliminación de señales,...

Este lenguaje de decodificación se define bon una lista de elementos, cada uno de estos elementos contiene dos camos_
 - Device: Elemento o dispositivo sobre el que habrá que aplicar las reglas definidas en dicho elemento.
 - QIDfunction: Función de concatenación para obtener el nombre cualificado del dispositivo.
 - QNfunction: Función de concatenación para obtener el nombre cualificado de las señales.
 - do: Lista de transformaciones. 
       Cada una de estas transformaciones a su vez se compone de:
     - HWID: Lista de IDs a los que aplciar las relgas descritas en este elemento
     - Reglas: Un conjunto de reglas según el proceso a que aplicar a la inromación

### Elementos básicos
En la zona más baja de la cadena de cualquier sistema IoT encontramos los siguientes elementos:
 - Sensor, captador o transductor
 - Registrador o dataloger
 - Sistema de comunicaciones
 - Mensaje

#### Sensor, captador o transductor
El elemento sensor, captador o tranductor es el elemento utilizado para convertir una señal física que es medida en una señal analótica medible (voltaje o intensidad) o bien en una señal digital (sensores intelgientes). 

#### Registrador o dataloger
El registrador/dataloger es un sistema encargado de recopilar la información medida por el sensor. consolidarla en un formato digital y finalmente transmitirla en un mensaje a través del sistema de comunicaciones utilizado (en IoT genralmente se utilizan comunicaciones inalambricas).

#### Sistema de comunicaciones
El sistema de comunicaciones es la infraestructura que proporciona el medio al dataloger para transmitir la información.

#### Menasje
El mensaje finalmente es la unidad de información que se transmite finalmente y que debe incluir toda la información necesaria para que el sistema recepctor, o el Edge sea capaz reconstruir el valor que inicialmente fué leido por el dispositivo.

### Transmisión de la información
Independientemente del sistema de comunicación empleado, NB-IoT, LoRa, Sigfox, wize u otros sistemas RF, lo importante es definir bien la información contenida en el mensaje. Para esto, lo importante es incluir las referencias necesarias para poder reconstruir la información que se pretendía transmitir, así como saber identificar a que particular objeto se refiere, pues no serviría de nada conocer el nivel de batería sin saber a que dispositivo se refiere, al igual que no serviría de nada conocer el nivel de plución sin no se sabe en que lugar se tomó la muestra. A partir de esta idea, se puede definir que en un mensaje, exisitrá una información mínima que siempre se requerirá para poder reconstruir toda la información necsaria realtiva sobrel a muestra en sí:

 - ID del dispositivo
 - Tipo de señal que se transmite
 - Valor de la muestra
 
Para poder conseguir estas transforamcioones lo primero es poder clasificar la información en función de los siguientes parámetros:
 - Tipo de dispositivo que la registra o emite: Es una caracterísitica física (que tipo de dispositivo se está útilizando)
 - ID del dispositivo que la emite: Identificador único del dispositivo para su tipo.
 - Señal del dispositivo: Dentro del dispositivo podemos tener más de una señal y necesitamos identificar a cual de las posibles señales que registra el dispositivo se refiere la muestra.
Lo que traduciremos a:
 - Nombre del elemento en nuestra organización: Será como nuestra organización se refiere al sistema (independientemente del disopsitvo que transmita la información, la registre o del sensor empleado).
 - Nombre de la señal: será el nombre que se da a la señal concreta.
 - Nombre cualificado de la señal: será el nombre cuyo resultado será una composición entre el nombre de la señal y el nombre organizacional (por ejemplo concatenar separando por puntos).
 
### Concatenation Funcion: Qualified ID y Qualified Name functions
Los valores de Qualified ID y Qualified Name se obtienen a través de una función que actua sobre los parametros y concatenandolos de una forma especifica con la información configurada en la función de transformación.
Las funciones de transformación de concatenación se comportan de la siguiente forma:
	<0><prefix><1><middle><2><postfix><3>   , donde las posiciones <0>, <1>, <2> y <3> son posiciones donde se pueden ubicar los parametros de entrada.
	
Para ello, la función de transformación consta de 7 parámetros, tres de ellos: prefix, middle y postfix son constantes cuya posición en la concatenación son fijos (admiten la cadena vacía como opción). Los últimos cuatro campos <field1>_order, <field1>_position, <field2>_order y <field2>_position indican; "position"  la posicion que ocupará el parametro dentro de los comentados anteriormente <0>, <1>, <2> o <3>, y "order" en caso de coincidir en la misma posición se combinarán según el valor del campo order, concatenando primero el elemento con orden menor de ambos. En caso de que ambos tengan el mismo orden se dará prioridad al valor del <field1> por delante del valor del <field1>.

#### QIDfunction
La función de concatenación para el ID cualificado consta de los campos:
	<field1>: deviceType
	<field2>: HWID

El ejemplo siguente muestra un ejemplo de configfuración de la función de concatenación para obtener el Qualified ID del dispositivo, si tenemos los valores <deviceType> = "devT1" y el <HWID> = "12345" 
```
    "QIDfunction": {
      "prefix": "pre_",
      "middle": ".mid.",
      "postfix": "_post",
			"deviceType_position": 1,
			"deviceType_order": 0,
			"HWID_position": 2,
			"HWID_order": 0
    }
```
Tendremos el siguiente valor de Qualified ID como valor resultante:
	"pre_devT1.mid.12345_post"
	
Ejemplo 2:
```
    "QIDSymbol": {
      "prefix": "pre_",
      "middle": "",
      "postfix": "_post",
			"deviceType_position": 1,
			"deviceType_order": 0,
			"HWID_position": 1,
			"HWID_order": 0
    }
```
Tendremos el siguiente valor de Qualified ID como valor resultante:	"pre_devT112345_post"

Ejemplo 3:
```
    "QIDSymbol": {
      "prefix": "pre_",
      "middle": "",
      "postfix": "_post",
			"deviceType_position": 1,
			"deviceType_order": 1,
			"HWID_position": 1,
			"HWID_order": 0
    }
```
Tendremos el siguiente valor de Qualified ID como valor resultante:	"pre_12345devT1_post"

#### QNfunction
La función de concatenación para el Nombre cualificado consta de los campos:
	<field1>: Nombre organizacional si existe o ID cualificado en caso contrario.
	<field2>: Nombre de la señal renombrado u original en caso de que no haya sido renombrado.

El ejemplo siguente muestra un ejemplo de configfuración de la función de concatenación para obtener el Qualified Name de la señal, si tenemos los valores <orgName> = "taller" y el <signal> = "temperatura" 
```
    "QIDfunction": {
      "prefix": "pre_",
      "middle": ".mid.",
      "postfix": "_post",
			"orgName_position": 1,
			"orgName_order": 0,
			"signal_position": 2,
			"signal_order": 0
    }
```
Tendremos el siguiente valor de Qualified ID como valor resultante:	"pre_taller.mid.temperatura_post"
	
Un ejemplo más habitual sería el siguiente:
```
    "QIDfunction": {
      "prefix": "",
      "middle": "_",
      "postfix": "",
			"orgName_position": 1,
			"orgName_order": 0,
			"signal_position": 2,
			"signal_order": 0
    }
```
Tendremos el siguiente valor de Qualified ID como valor resultante:	"taller_temperatura"
	
## Etiqueta "do":
En la etiqueta do tenemos las reglas a aplicar

### HWID: lista de IDs de dispositivos a los que aplicar las reglas
El HWID o Hardware ID, es el identificador que se utilizará en el mensaje para poder identificar a los dispositivos registradores que emiten la información. Estos HWIDs pueden corresponderse con información física del dispositvo como el número de serie, IMEI, MAC, como se muestra en los ejemplos.

Serial Numbers:
```
    "HWID": [
      "471C3505",
      "571C3506",
      "22342308",
      "21233434"
    ]
```
IMEIs:
```
    "HWID": [
      "451236200698231",
			...
    ]
```

MACs:
```
    "HWID": [
      "fe:e3:3f:d3:33:43:d0"
			...
    ]
```

### Transformaciónes

#### RemoveSignal

```
    "HWID": [
      "fe:e3:3f:d3:33:43:d0"
			...
    ]
```

#### RenameSignal

#### ScaleSignal

#### changeUnit

#### DevicePrefix
El Device Prefix nos permite obtener el Nombre por el que la organización conoce la información del disopsitivo al que nos vamos a referir, y para ello se define una función que a partir del tipo de dispositivo y su HWID podemos obtener un identificador únic que podremos transformar en el nombre organizacional.

Como regla importante a tener en cuenta, podría haber diferentes dispositivos recopilando información pero que la organización entiende como el mísmo, por lo que podría darse el caso de que se requiera un subfjio que los diferencie.

La función de relación para obtener el identificador único se define como: Identificador único = f(<Device>,<HWID1>),
	si f(x,y)= concatena(x,".",y) tendríamos por ejemplo que para los valores device: "devT1" y HWID: "12345":
	   f("dev1", "12345") => "dev1.12345"
	
```
		"DevicePrefix": {
			"<Device>.<HWID1>": "<OrganizationalName01>",
			"<Device>.<HWID2>": "<OrganizationalName02>",
			"<Device>.<HWID3>": "<OrganizationalName03_D1>",
			"<Device>.<HWID4>": "<OrganizationalName03_D2>"
		}
```
La aplicación de este prefijo convertiría por ejemplo la información procedente de un dispositivo de tipo devT1 en el que nuestra organización entiende, como por ejemplo que la infromación viene del taller:

```
		"DevicePrefix": {
			"devT1.12345": "taller"
		}
```

A partir de aquí cualquier señal que proviniese de este dispositivo se etiquetaría con un tag que comenzaría con la cadena "taller".

#### RenameSignal
El Device Prefix nos permite obtener el Nombre por el que la organización conoce la información del disopsitivo al que nos vamos a referir, y para ello se define una función que a partir del tipo de dispositivo y su HWID podemos obtener un identificador únic que podremos transformar en el nombre organizacional.
```
			"RenameSignal": {
				"batteryVoltage": "V_TBAT",
				"pressure": "V_PRES",
				...
			}
```



## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/IvanOfThing/IoT-GMCL/tags). 

## Authors

* **Iván Perea Fuentes** - *Initial work* - [IvanOfThings](https://github.com/IvanOfThings)

See also the list of [contributors](https://github.com/IvanOfThing/IoT-GMCL/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
