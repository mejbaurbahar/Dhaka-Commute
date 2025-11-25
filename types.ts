

export interface Station {
  id: string;
  name: string;
  bnName?: string; // Bengali Name
  lat: number;
  lng: number;
}

export interface BusRoute {
  id: string;
  name: string;
  bnName: string;
  routeString: string;
  stops: string[]; // Array of station IDs
  type: 'Sitting' | 'Semi-Sitting' | 'Local' | 'AC';
  hours: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface RouteSearchResult {
  bus: BusRoute;
  matchType: 'direct' | 'partial';
}

export enum AppView {
  HOME = 'HOME',
  BUS_DETAILS = 'BUS_DETAILS',
  LIVE_NAV = 'LIVE_NAV',
  AI_ASSISTANT = 'AI_ASSISTANT',
  ABOUT = 'ABOUT',
  SETTINGS = 'SETTINGS',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR'
}