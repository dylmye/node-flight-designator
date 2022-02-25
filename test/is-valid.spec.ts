import { strictEqual } from "assert";
import FlightDesignator from "../src/flight-designator";

var validFlights = [
  "U24511",
  "LH2054",
  "AS33",
  "KLM645",
  "YYY9999A",
  "AS33C",
  "X11",
  "23 1234",
  "123",
  "R6750",
  "AB6430",
  "4U050",
  "LH180",
];

var invalidFlights = ["1", "23", "X1", "AS0", "XY00001", "ASDFGHGF"];

describe("FlightDesignator", () => {
  describe(".isValid()", () => {
    describe("valid", () => {
      validFlights.forEach(function (flight) {
        it(flight, () => {
          strictEqual(FlightDesignator.isValid(flight), true);
        });
      });
    });

    describe("invalid", () => {
      invalidFlights.forEach(function (flight) {
        it(flight, () => {
          strictEqual(FlightDesignator.isValid(flight), false);
        });
      });
    });
  });

  describe("#isValid()", () => {
    describe("valid", () => {
      validFlights.forEach(function (flight) {
        it(flight, () => {
          strictEqual(FlightDesignator.parse(flight).isValid(), true);
        });
      });
    });

    describe("invalid", () => {
      invalidFlights.forEach(function (flight) {
        it(flight, () => {
          var airline = flight.slice(0, 2);
          var number = flight.slice(2, 6);
          var suffix = flight.slice(6);
          strictEqual(
            new FlightDesignator(airline, number, suffix).isValid(),
            false
          );
        });
      });
    });
  });
});
