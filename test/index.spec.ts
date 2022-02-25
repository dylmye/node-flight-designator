import { equal, deepEqual } from "assert";
import FlightDesignator from "../src/flight-designator";

describe("FlightDesignator", () => {
  describe("#parse()", () => {
    describe("valid", () => {
      it("U24511", () => {
        var result = FlightDesignator.parse("U24511");
        deepEqual(result, {
          airlineCode: "U2",
          flightNumber: "4511",
          operationalSuffix: "",
        });
      });

      it("LH2054", () => {
        var result = FlightDesignator.parse("LH2054");
        deepEqual(result, {
          airlineCode: "LH",
          flightNumber: "2054",
          operationalSuffix: "",
        });
      });

      it("AS33", () => {
        var result = FlightDesignator.parse("AS33");
        deepEqual(result, {
          airlineCode: "AS",
          flightNumber: "33",
          operationalSuffix: "",
        });
      });

      it("KLM645", () => {
        var result = FlightDesignator.parse("KLM645");
        deepEqual(result, {
          airlineCode: "KLM",
          flightNumber: "645",
          operationalSuffix: "",
        });
      });

      it("YYY9999A", () => {
        var result = FlightDesignator.parse("YYY9999A");
        deepEqual(result, {
          airlineCode: "YYY",
          flightNumber: "9999",
          operationalSuffix: "A",
        });
      });

      it("AS33C", () => {
        var result = FlightDesignator.parse("AS33C");
        deepEqual(result, {
          airlineCode: "AS",
          flightNumber: "33",
          operationalSuffix: "C",
        });
      });

      it("X11", () => {
        var result = FlightDesignator.parse("X11");
        deepEqual(result, {
          airlineCode: "X1",
          flightNumber: "1",
          operationalSuffix: "",
        });
      });

      it("23 1234", () => {
        var result = FlightDesignator.parse("23 1234");
        deepEqual(result, {
          airlineCode: "23",
          flightNumber: "1234",
          operationalSuffix: "",
        });
      });

      it("123", () => {
        var result = FlightDesignator.parse("123");
        deepEqual(result, {
          airlineCode: "12",
          flightNumber: "3",
          operationalSuffix: "",
        });
      });

      it("R6750", () => {
        var result = FlightDesignator.parse("R6750");
        deepEqual(result, {
          airlineCode: "R6",
          flightNumber: "750",
          operationalSuffix: "",
        });
      });

      it("AB6430", () => {
        var result = FlightDesignator.parse("AB6430");
        deepEqual(result, {
          airlineCode: "AB",
          flightNumber: "6430",
          operationalSuffix: "",
        });
      });

      it("4U050", () => {
        var result = FlightDesignator.parse("4U050");
        deepEqual(result, {
          airlineCode: "4U",
          flightNumber: "050",
          operationalSuffix: "",
        });
      });

      it("LH180", () => {
        var result = FlightDesignator.parse("LH180");
        deepEqual(result, {
          airlineCode: "LH",
          flightNumber: "180",
          operationalSuffix: "",
        });
      });
    });

    describe("invalid", () => {
      it("1", () => {
        equal(null, FlightDesignator.parse("1"));
      });

      it("23", () => {
        equal(null, FlightDesignator.parse("23"));
      });

      it("X1", () => {
        equal(null, FlightDesignator.parse("X1"));
      });

      it("AS0", () => {
        equal(null, FlightDesignator.parse("AS0"));
      });

      it("XY00001", () => {
        equal(null, FlightDesignator.parse("XY00001"));
      });

      it("ASDFGHGF", () => {
        equal(null, FlightDesignator.parse("ASDFGHGF"));
      });
    });
  });
});
