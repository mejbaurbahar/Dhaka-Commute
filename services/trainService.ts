/**
 * Train Service
 * Interfaces with backend train API endpoints for Bangladesh Railway data
 * Covers 367 trains including Intercity, Mail/Express, Commuter, and Local trains
 */

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'https://koyjabo-backend.onrender.com/api';

// ==================== TYPES ====================

export interface TrainClass {
    AC_B?: string;
    AC_SEAT?: string;
    AC_CHAIR?: string;
    S_CHAIR?: string;
    SHOVAN?: string;
    SNIGDHA?: string;
    SHULOV?: string;
    F_SEAT?: string;
    F_BERTH?: string;
}

export interface Train {
    trainNumber: string;
    trainName: string;
    type: 'Intercity' | 'Mail/Express' | 'Commuter' | 'Local' | 'Shuttle';
    route: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    frequency: string;
    classes: string[];
    offDays: string;
    stops?: string[];
    fare?: string;
    category?: string;
    searchDate?: string;
}

export interface TrainSearchResponse {
    from: string;
    to: string;
    date: string;
    totalResults: number;
    trains: Train[];
    bookingURL: string;
    note: string;
}

export interface TrainDetailsResponse {
    train: Train;
    bookingURL: string;
}

export interface IntercityTrainsResponse {
    totalCount: number;
    trains: Train[];
    lastUpdated: string;
}

export interface StationTrainsResponse {
    station: string;
    totalTrains: number;
    trains: Train[];
}

export interface TrainStatistics {
    metadata: {
        totalTrains: number;
        intercityTrains: number;
        mailExpressTrains: number;
        commuterTrains: number;
        localShuttleTrains: number;
        totalStations: number;
        totalRouteKm: number;
    };
    zones: {
        eastern: {
            name: string;
            routeKm: number;
            gauge: string;
            divisions: string[];
        };
        western: {
            name: string;
            routeKm: number;
            gauge: string;
            divisions: string[];
        };
    };
    majorStations: string[];
    bookingSources: {
        official: string;
        mobileApp: string;
        methods: string[];
        advanceBooking: string;
    };
    lastUpdated: string;
}

export interface SuggestionsResponse {
    query: string;
    suggestions: string[];
}

export interface PopularRoutesResponse {
    routes: {
        [key: string]: {
            from: string;
            to: string;
            trainCount: number;
            trains: Train[];
        };
    };
    totalRoutes: number;
}

export interface ChatTrainResponse {
    from: string;
    to: string;
    totalTrains: number;
    response: string; // Bengali formatted text
    rawData: Train[];
    bookingURL: string;
}

// ==================== API FUNCTIONS ====================

export const trainService = {
    /**
     * Search for trains between two stations
     * @param from - Origin station name (e.g., "Dhaka", "Benapole")
     * @param to - Destination station name (e.g., "Chittagong", "Khulna")
     * @param date - Optional travel date (YYYY-MM-DD format)
     */
    async searchTrains(from: string, to: string, date?: string): Promise<TrainSearchResponse> {
        try {
            const params = new URLSearchParams({ from, to });
            if (date) params.append('date', date);

            const response = await fetch(`${API_BASE}/trains/search?${params}`);

            if (!response.ok) {
                if (response.status === 400) {
                    const error = await response.json();
                    throw new Error(error.message || 'Invalid search parameters');
                }
                throw new Error(`HTTP ${response.status}: Failed to search trains`);
            }

            return await response.json();
        } catch (error) {
            console.error('Train search error:', error);
            throw error;
        }
    },

    /**
     * Get all intercity trains in Bangladesh
     */
    async getAllIntercity(): Promise<IntercityTrainsResponse> {
        try {
            const response = await fetch(`${API_BASE}/trains/intercity`);

            if (!response.ok) {
                throw new Error('Failed to fetch intercity trains');
            }

            return await response.json();
        } catch (error) {
            console.error('Intercity trains error:', error);
            throw error;
        }
    },

    /**
     * Get detailed information about a specific train
     * @param identifier - Train number (e.g., "701") or train name (e.g., "Subarna Express")
     */
    async getTrainDetails(identifier: string): Promise<TrainDetailsResponse | null> {
        try {
            const encodedId = encodeURIComponent(identifier);
            const response = await fetch(`${API_BASE}/trains/details/${encodedId}`);

            if (response.status === 404) {
                return null; // Train not found
            }

            if (!response.ok) {
                throw new Error('Failed to fetch train details');
            }

            return await response.json();
        } catch (error) {
            console.error('Train details error:', error);
            throw error;
        }
    },

    /**
     * Get all trains departing from a specific station
     * @param station - Station name (e.g., "Dhaka", "Chittagong")
     */
    async getFromStation(station: string): Promise<StationTrainsResponse> {
        try {
            const encodedStation = encodeURIComponent(station);
            const response = await fetch(`${API_BASE}/trains/station/${encodedStation}`);

            if (!response.ok) {
                throw new Error('Failed to fetch station trains');
            }

            return await response.json();
        } catch (error) {
            console.error('Station trains error:', error);
            throw error;
        }
    },

    /**
     * Get comprehensive Bangladesh Railway statistics
     */
    async getStatistics(): Promise<TrainStatistics> {
        try {
            const response = await fetch(`${API_BASE}/trains/statistics`);

            if (!response.ok) {
                throw new Error('Failed to fetch train statistics');
            }

            return await response.json();
        } catch (error) {
            console.error('Train statistics error:', error);
            throw error;
        }
    },

    /**
     * Get station name suggestions for autocomplete
     * @param query - Search query (minimum 2 characters)
     */
    async getSuggestions(query: string): Promise<SuggestionsResponse> {
        if (query.length < 2) {
            return { query, suggestions: [] };
        }

        try {
            const response = await fetch(`${API_BASE}/trains/suggest?q=${encodeURIComponent(query)}`);

            if (!response.ok) {
                return { query, suggestions: [] };
            }

            return await response.json();
        } catch (error) {
            console.error('Train suggestions error:', error);
            return { query, suggestions: [] };
        }
    },

    /**
     * Get trains for popular routes (pre-configured)
     */
    async getPopularRoutes(): Promise<PopularRoutesResponse> {
        try {
            const response = await fetch(`${API_BASE}/trains/popular-routes`);

            if (!response.ok) {
                throw new Error('Failed to fetch popular routes');
            }

            return await response.json();
        } catch (error) {
            console.error('Popular routes error:', error);
            throw error;
        }
    },

    /**
     * Get train information in conversational Bengali format
     * Perfect for chat interfaces
     * @param from - Origin station
     * @param to - Destination station
     */
    async getChatTrainInfo(from: string, to: string): Promise<ChatTrainResponse> {
        try {
            const response = await fetch(`${API_BASE}/ai/chat/train`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from, to })
            });

            if (!response.ok) {
                throw new Error('Failed to get train chat info');
            }

            return await response.json();
        } catch (error) {
            console.error('Train chat info error:', error);
            throw error;
        }
    }
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Format train duration for display
 * @param duration - Duration string (e.g., "6h 5m")
 */
export function formatDuration(duration: string): string {
    return duration;
}

/**
 * Get human-readable class names
 */
export function getClassDisplay(classCode: string): string {
    const classNames: { [key: string]: string } = {
        'AC_B': 'AC Birth',
        'AC_SEAT': 'AC Seat',
        'AC_CHAIR': 'AC Chair',
        'S_CHAIR': 'Snigdha Chair',
        'SHOVAN': 'Shovan',
        'SNIGDHA': 'Snigdha',
        'SHULOV': 'Shulov',
        'F_SEAT': 'First Class Seat',
        'F_BERTH': 'First Class Berth'
    };
    return classNames[classCode] || classCode;
}

/**
 * Format train type for display with icon
 */
export function getTrainTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
        'Intercity': '🚄',
        'Mail/Express': '🚂',
        'Commuter': '🚃',
        'Local': '🚆',
        'Shuttle': '🚈'
    };
    return icons[type] || '🚂';
}

/**
 * Check if date is valid for train booking
 * Bangladesh Railway allows 7-10 days advance booking
 */
export function isValidBookingDate(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 10);

    return date >= today && date <= maxDate;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Format date in Bengali
 */
export function formatDateBengali(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default trainService;
