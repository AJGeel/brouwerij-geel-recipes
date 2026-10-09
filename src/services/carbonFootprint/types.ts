export type ApiResponse = {
  bytes: number;
  green: boolean;
  gco2e: number;
  rating: string;
  cleanerThan: number;
};

export type GreenCheckResponse = {
  green: boolean;
};

export type Footprint = {
  co2: number;
  percentage: number;
};

export type FootprintError = {
  wasSuccessful: false;
  reason: string;
};

export type FootprintResult = Footprint & {
  wasSuccessful: true;
};
