export enum TransportMode {
  BUS = 'BUS', // Intercity Bus
  TRAIN = 'TRAIN',
  AIR = 'AIR',
  LOCAL_BUS = 'LOCAL_BUS',
  RICKSHAW = 'RICKSHAW',
  WALK = 'WALK',
  CNG = 'CNG',
  METRO_RAIL = 'METRO_RAIL',
  FERRY = 'FERRY'
}

export interface Schedule {
  operator: string;
  type: string; // e.g., "AC Scania", "Non-AC"
  departureTime: string;
  arrivalTime: string;
  price: string;
  counter: string;
  contactNumber?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface WeatherInfo {
  temperature: string;
  condition: string; // "Sunny", "Rainy", "Cloudy"
  icon: 'SUN' | 'CLOUD' | 'RAIN' | 'WIND';
  advice: string; // "Pack an umbrella", "Wear sunglasses"
}

export interface RouteStep {
  mode: TransportMode;
  from: string;
  to: string;
  instruction: string;
  duration: string;
  distance?: string;
  cost?: string;
  startCoordinates?: Coordinates;
  endCoordinates?: Coordinates;
  details?: {
    busName?: string; // For Local Bus e.g., "Boishaki"
    busCounter?: string; // For Intercity
    counterPhone?: string;
    trainName?: string;
    flightName?: string;
    departureTime?: string;
    arrivalTime?: string;
    operator?: string;
    ticketType?: string;
    schedules?: Schedule[]; // List of available options for this leg
  };
}

export interface TravelOption {
  id: string;
  type: 'AIR' | 'BUS' | 'TRAIN' | 'FERRY';
  title: string;
  summary: string;
  totalDuration: string;
  totalCostRange: string;
  destinationWeather?: WeatherInfo; // New Weather Field
  steps: RouteStep[];
  recommended?: boolean;
}

export interface RoutingResponse {
  origin: string;
  destination: string;
  options: TravelOption[];
}