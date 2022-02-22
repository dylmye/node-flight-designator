export interface IFlightDesignator {
  airlineCode?: string;
  flightNumber?: number;
  operationalSuffix?: string;

  /**
   * Flight designator pattern (IATA/ICAO)
   * NOTE: This pattern DOES NOT validate the flight number
   * (i.e. it does match invalid '0000' flight numbers)
   */
  readonly pattern: RegExp;
  /** IATA/ICAO airline code pattern */
  readonly airlinePattern: RegExp;
  /**
   * Flight number pattern
   * NOTE: This regular expression checks for two things
   * by utilizing a lookahead: The first group checks (via the lookahead)
   * if the number is non-zero, the second whether it is between 1-4 chars long
   */
  readonly flightPattern: RegExp;
  /** Operational suffix test pattern */
  readonly suffixPattern: RegExp;
  /** Determine whether the input is a valid flight designator */
  readonly isValid: boolean;
  /** Determines whether the input is a valid airline code */
  readonly isValidAirlineCode: (airlineCode: string) => boolean;
  /** Determines whether the input is a valid flight number */
  readonly isValidFlightNumber: (flightNumber: string) => boolean;
  /** Determine whether the input is a valid operational suffix */
  readonly isValidSuffix: (suffix: string) => boolean;
  /** Parses a flight designator */
  readonly parse: (value: string) => this | null;
  /** Format the flight designator */
  readonly toString: (spaces: boolean, pad: boolean) => string;
  /** Parses and formats a flight designator */
  readonly format: (
    value: string,
    spaces: boolean,
    pad: boolean
  ) => string | undefined;
}

/** Validator object for Flight Designators */
export default class FlightDesignator implements IFlightDesignator {
  airlineCode?: string;
  flightNumber?: number;
  operationalSuffix?: string;

  constructor(airline: string, number: string, suffix: string) {
    if (!(this instanceof FlightDesignator))
      return new FlightDesignator(airline, number, suffix);

    this.airlineCode = airline;
    this.flightNumber = parseInt(number, 10);
    this.operationalSuffix = suffix || "";
  }

  readonly pattern = /^([A-Z0-9]{2}[A-Z]?)\s*([0-9]{1,4})\s*([A-Z]?)$/i;
  readonly airlinePattern = /^([A-Z0-9]{2}[A-Z]?)$/i;
  readonly flightPattern =
    /(?=^0*[1-9][0-9]*\s*[A-Z]?$)(?:^([0-9]{1,4})\s*([A-Z]?)$)/;
  readonly suffixPattern = /^[A-Z]$/i;

  get isValid() {
    return (
      !!this.airlineCode &&
      !isNaN(this.flightNumber as any) &&
      !!this.operationalSuffix &&
      this.isValidAirlineCode(this.airlineCode) &&
      this.isValidFlightNumber((this.flightNumber as number).toString()) &&
      this.isValidSuffix(this.operationalSuffix)
    );
  }

  readonly isValidAirlineCode = (airlineCode: string) =>
    this.airlinePattern.test(airlineCode);

  readonly isValidFlightNumber = (flightNumber: string) =>
    this.flightPattern.test(flightNumber);

  readonly isValidSuffix = (suffix: string) => {
    return suffix == null || suffix === ""
      ? true
      : this.suffixPattern.test(suffix);
  };

  readonly toString = (spaces: boolean, pad: boolean) => {
    if (!this.flightNumber || !this.airlineCode) {
      return "";
    }

    var parts = [
      this.airlineCode.toUpperCase(),
      pad ? zeroPad(this.flightNumber.toString()) : this.flightNumber,
    ];

    if (this.operationalSuffix) {
      parts.push(this.operationalSuffix.toUpperCase());
    }

    return parts.join(spaces ? " " : "");
  };

  readonly parse = (value: string) => {
    try {
      var parts = (value + "").match(this.pattern);

      if (parts == null || !this.isValidFlightNumber(parts[2])) {
        throw new Error('Invalid flight designator "' + value + '"');
      }

      this.operationalSuffix = parts.pop();
      this.flightNumber = parseInt(parts.pop() as string, 10);
      this.airlineCode = parts.pop();

      return this;
    } catch (e) {
      return null;
    }
  };

  readonly format = (value: string, spaces: boolean, pad: boolean) => {
    return this.parse(value)?.toString(spaces, pad);
  };
}

function zeroPad(str: string): string {
  str = str + "";
  while (str.length < 4) str = "0" + str;
  return str;
}
