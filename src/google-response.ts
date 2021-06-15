export type GoogleResponse = {
  results: Result[];
  status: "OK" | "ZERO_RESULTS";
};

type Result = {
  geometry: Geometry;
};

type Geometry = {
  location: GeometryLocation;
  location_type: string;
};

type GeometryLocation = {
  lat: number;
  lng: number;
};
