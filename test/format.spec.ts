import { equal } from "assert";
import FlightDesignator from "../src/flight-designator";

describe("FlightDesignator", () => {
  describe("#format()", () => {
    it("YYY 9999 A", () => {
      equal(FlightDesignator.format("YYY 9999 A"), "YYY9999A");
    });

    it("4U050", () => {
      equal(FlightDesignator.format("4U050"), "4U50");
    });

    it("lh0018", () => {
      equal(FlightDesignator.format("lh0018"), "LH18");
    });

    it("lh0018 w/ spaces", () => {
      equal(FlightDesignator.format("lh0018", true), "LH 18");
    });

    it("lh0018 w/ padding", () => {
      equal(FlightDesignator.format("lh0018", false, true), "LH0018");
    });

    it("lh0018 w/ spaces & padding", () => {
      equal(FlightDesignator.format("lh0018", true, true), "LH 0018");
    });

    it("lh0018C w/ padding", () => {
      equal(FlightDesignator.format("lh0018c", false, true), "LH0018C");
    });

    it("lh0018C w/ spaces & padding", () => {
      equal(FlightDesignator.format("lh0018c", true, true), "LH 0018 C");
    });
  });
});
