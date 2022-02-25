# Flight Designator
[![npm](https://img.shields.io/npm/v/@dylmye/flight-designator.svg?style=flat-square)](https://npmjs.com/package/flight-designator)
[![npm license](https://img.shields.io/npm/l/@dylmye/flight-designator.svg?style=flat-square)](https://npmjs.com/package/flight-designator)
[![npm downloads](https://img.shields.io/npm/dm/@dylmye/flight-designator.svg?style=flat-square)](https://npmjs.com/package/flight-designator)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fdylmye%2Fnode-flight-designator%2Fbadge%3Fref%3Dmaster&style=flat-square)](https://actions-badge.atrox.dev/dylmye/node-flight-designator/goto?ref=master)

A fork of Jonas Hermsmeier's Flight Designator validation, converted to TypeScript and ES6 classes. Requires Node 10 or above.

## Install via [npm](https://npmjs.com) or [yarn](https://yarnpkg.com)

```sh
$ npm install --save @dylmye/flight-designator
$ yarn add @dylmye/flight-designator
```

## Usage

```ts
import FlightDesignator from "@dylmye/flight-designator";
```

## Parse

```ts
FlightDesignator.parse('U24511A') // OR
new FlightDesignator().parse('U24511A')
> FlightDesignator {
  airlineCode: 'U2',
  flightNumber: 4511,
  operationalSuffix: 'A'
}
```

##### Validate

```ts
FlightDesignator.isValid('KLM0180')
> true
```

```ts
FlightDesignator.isValidAirlineCode('KLM')
> true
```

```ts
FlightDesignator.isValidFlightNumber('0180')
> true
```

##### Construct & validate instance

```ts
// Construct a flight designator
const flight = new FlightDesignator('KLM', '645')
> FlightDesignator {
  airlineCode: 'KLM',
  flightNumber: 645,
  operationalSuffix: ''
}
// Check whether it's valid
flight.isValid()
> true
```

##### Format flight designators

```ts
FlightDesignator.format('u2 0350A')
// Compact
> 'U2350A'
// With spaces
FlightDesignator.format('u2 0350A', true)
> 'U2 350 A'
// With zero-padded flight number
FlightDesignator.format('u2350A', true, true)
> 'U2 0350 A'
```

```ts
var flight = new FlightDesignator('LH', 254, 'X')
// Compact
flight.toString()
> 'LH254X'
// With spaces
flight.toString(true)
> 'LH 254 X'
// With zero-padded flight number
flight.toString(true, true)
> 'LH 0254 X'
```
