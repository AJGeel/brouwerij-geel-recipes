export type ApiResponse = {
  c: number;
  p: number;
  url: string;
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
