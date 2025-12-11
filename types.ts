

export interface Station {
  id: string;
  name: string;
  bnName?: string; // Bengali Name
  lat: number;
  lng: number;
  metroStation?: string; // ID of nearest metro station if applicable
}

export interface MetroStation {
  id: string;
  name: string;
  bnName: string;
  lat: number;
  lng: number;
  description: string;
  distanceFromStart?: number;
}

export interface MetroLine {
  id: string;
  name: string;
  bnName: string;
  stations: string[]; // Array of metro station IDs in order
  color: string; // Line color for display
}

export interface BusRoute {
  id: string;
  name: string;
  bnName: string;
  routeString: string;
  stops: string[]; // Array of station IDs
  type: 'Sitting' | 'Semi-Sitting' | 'Local' | 'AC' | 'Metro Rail';
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
  WHY_USE = 'WHY_USE',
  FAQ = 'FAQ',
  HISTORY = 'HISTORY',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  INSTALL_APP = 'INSTALL_APP',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  FOR_AI = 'FOR_AI'
}