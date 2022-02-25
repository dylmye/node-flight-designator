export interface IFlightDesignator {
  airlineCode?: string;
  flightNumber?: number;
  operationalSuffix?: string;

  /** Determine whether the input is a valid flight designator */
  readonly isValid: () => boolean;
  /** Parses a flight designator */
  readonly parse: (value: string) => this | null;
  /** Format the flight designator */
  readonly toString: (spaces: boolean, pad: boolean) => string;
}

/** Validator object for Flight Designators */
export default class FlightDesignator implements IFlightDesignator {
  airlineCode?: string;
  flightNumber?: number;
  operationalSuffix?: string;

  constructor(airline?: string, number?: string, suffix?: string) {
    if (!(this instanceof FlightDesignator))
      return new FlightDesignator(airline, number, suffix);

    this.airlineCode = airline;
    this.flightNumber = number ? parseInt(number, 10) : undefined;
    this.operationalSuffix = suffix || "";
  }

  /**
   * Flight designator pattern (IATA/ICAO)
   * NOTE: This pattern DOES NOT validate the flight number
   * (i.e. it does match invalid '0000' flight numbers)
   *
   * @static
   * @readonly
   */
  static readonly pattern: RegExp =
    /^([A-Z0-9]{2}[A-Z]?)\s*([0-9]{1,4})\s*([A-Z]?)$/i;

  /** IATA/ICAO airline code pattern
   * @static
   * @readonly
   */
  static readonly airlinePattern: RegExp = /^([A-Z0-9]{2}[A-Z]?)$/i;

  /**
   * Flight number pattern
   * NOTE: This regular expression checks for two things
   * by utilizing a lookahead: The first group checks (via the lookahead)
   * if the number is non-zero, the second whether it is between 1-4 chars long
   *
   * @static
   * @readonly
   */
  static readonly flightPattern: RegExp =
    /(?=^0*[1-9][0-9]*\s*[A-Z]?$)(?:^([0-9]{1,4})\s*([A-Z]?)$)/;

  /** Operational suffix test pattern
   * @static
   * @readonly
   */
  static readonly suffixPattern: RegExp = /^[A-Z]$/i;

  /** Determine whether the input is a valid flight designator
   * @static
   */
  static readonly isValid = (designator: string): boolean => {
    const parts = (designator + "").match(FlightDesignator.pattern);
    return parts != null && FlightDesignator.isValidFlightNumber(parts[2]);
  };

  /** Determines whether the input is a valid airline code
   * @static
   */
  static readonly isValidAirlineCode = (airlineCode: string): boolean =>
    this.airlinePattern.test(airlineCode);

  /** Determines whether the input is a valid flight number
   * @static
   */
  static readonly isValidFlightNumber = (flightNumber: string): boolean =>
    this.flightPattern.test(flightNumber);

  /** Determine whether the input is a valid operational suffix
   * @static
   */
  static readonly isValidSuffix = (suffix?: string | null): boolean => {
    return suffix == null || suffix === ""
      ? true
      : this.suffixPattern.test(suffix);
  };

  /** Parses a flight designator
   * @static
   */
  static readonly parse = (value: string): FlightDesignator | null => {
    try {
      return new FlightDesignator().parse(value);
    } catch (e: any) {
      return null;
    }
  };

  /** Parses and formats a flight designator */
  static readonly format = (
    value: string,
    spaces = false,
    pad = false
  ): string | undefined => {
    return this.parse(value)?.toString(spaces, pad);
  };

  readonly isValid = () => {
    return (
      !!this.airlineCode &&
      this.flightNumber !== undefined &&
      !Number.isNaN(this.flightNumber) &&
      FlightDesignator.isValidAirlineCode(this.airlineCode) &&
      FlightDesignator.isValidFlightNumber(
        (this.flightNumber as number).toString()
      ) &&
      FlightDesignator.isValidSuffix(this.operationalSuffix)
    );
  };

  readonly parse = (value: string) => {
    const parts = (value + "").match(FlightDesignator.pattern);

    if (parts == null || !FlightDesignator.isValidFlightNumber(parts[2]))
      throw new Error('Invalid flight designator "' + value + '"');

    this.operationalSuffix = parts.pop();
    this.flightNumber = parseInt(parts.pop() as string, 10);
    this.airlineCode = parts.pop();

    return this;
  };

  readonly toString = (spaces = false, pad = false) => {
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
}

function zeroPad(str: string): string {
  str = str + "";
  while (str.length < 4) str = "0" + str;
  return str;
}
