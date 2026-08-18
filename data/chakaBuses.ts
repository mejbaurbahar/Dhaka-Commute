/**
 * ঢাকার চাকা (Dhaka Chaka) fleet snapshot — 31 numbered buses + 2 route plans.
 *
 * Source: DTCA live feed (all-vehicle-location + route-plans/route-details),
 * captured via buskothay.com browser session on 2026-08-18 ~20:30. The upstream
 * DTCA API blocks server-side sessions (403 even with valid credentials —
 * tokens are bound to the browser TLS session), so this snapshot is the
 * fallback data shown when the live feed is unavailable. The live section
 * (DTCABusListSection) keeps polling independently; when upstream recovers it
 * replaces this list.
 *
 * Snapshot, not live — UI must label it as such.
 */

export interface ChakaBusStop {
  name: string;
  lat: number;
  lng: number;
  order: number;
  /** Scheduled arrival from the DTCA route plan, e.g. 10:05 AM */
  arrival: string;
}

export interface ChakaRoutePlan {
  routeId: number;
  /** Official DTCA route name, e.g. Notun Bazar - Gulshan 2 - Banani */
  name: string;
  origin: string;
  destination: string;
  totalDistanceKm: number;
  stops: ChakaBusStop[];
}

export interface ChakaBusSnapshotEntry {
  /** DTCA device identifier (v_identifier) */
  id: string;
  /** Vehicle registration number, e.g. Dhaka Metro-BA-12-0175 */
  vrn: string;
  /** Bondstein tag, e.g. TMV 43971 */
  bstId: string;
  /** Which DTCA route plan this bus runs (see CHAKA_ROUTE_PLANS) */
  routeId: number;
  status: 'online' | 'offline';
  engineOn: boolean;
  speedKmh: number;
  /** Nearest landmark from the vehicle's last GPS ping */
  landmark: string | null;
  lat: number | null;
  lng: number | null;
  /** Server timestamp of the last GPS ping */
  lastSeen: string;
}

export interface ChakaBusSnapshot {
  capturedAt: string;
  capturedAtLabel: { en: string; bn: string };
  source: string;
  buses: ChakaBusSnapshotEntry[];
}

export const CHAKA_ROUTE_PLANS: ChakaRoutePlan[] = [
  { routeId: 30, name: "Gulshan 2 - Tejgaon - Gulshan 2", origin: "Gulshan 2 - Tejgaon", destination: "- Gulshan 2", totalDistanceKm: 8.46, stops: [
    { name: "DCC", lat: 23.793758182032047, lng: 90.41494846343994, order: 1, arrival: "10:05 AM" },
    { name: "Agora", lat: 23.788574742848997, lng: 90.41665434837341, order: 2, arrival: "10:15 AM" },
    { name: "Gulshan 1", lat: 23.77961122483529, lng: 90.4169225692749, order: 3, arrival: "10:25 AM" },
    { name: "Police Plaza", lat: 23.77353374556769, lng: 90.41617155075073, order: 4, arrival: "10:35 AM" },
    { name: "Shanta Tower", lat: 23.77019775821902, lng: 90.40869746645099, order: 5, arrival: "10:45 AM" },
    { name: "Nabisco Mor", lat: 23.76991559599552, lng: 90.40185123682022, order: 6, arrival: "10:55 AM" },
    { name: "Shanta Tower", lat: 23.770483083055453, lng: 90.4074537165619, order: 7, arrival: "11:05 AM" },
    { name: "Police Plaza", lat: 23.7741473973176, lng: 90.41602671146393, order: 8, arrival: "11:15 AM" },
    { name: "Gulshan 1", lat: 23.78093664704591, lng: 90.4165256023407, order: 9, arrival: "11:25 AM" },
    { name: "Agora", lat: 23.788221319012838, lng: 90.41648268699646, order: 10, arrival: "11:35 AM" },
    { name: "DCC", lat: 23.79392997808644, lng: 90.41457563638687, order: 11, arrival: "11:45 AM" },
  ] },
  { routeId: 32, name: "Notun Bazar - Gulshan 2 - Banani - Gulshan 2 - Notun Bazar", origin: "Notun Bazar - Banani", destination: "- Notun Bazar", totalDistanceKm: 6.82, stops: [
    { name: "Notun Bazar", lat: 23.797535188601085, lng: 90.42310506105423, order: 1, arrival: "10:05 AM" },
    { name: "Gulshan 2", lat: 23.794386463641732, lng: 90.41347861289978, order: 2, arrival: "10:15 AM" },
    { name: "Banani", lat: 23.79432019970902, lng: 90.40138453245163, order: 3, arrival: "10:25 AM" },
    { name: "Banani", lat: 23.794479723934238, lng: 90.40168762207031, order: 4, arrival: "10:35 AM" },
    { name: "Gulshan 2", lat: 23.79516199456447, lng: 90.41488945484161, order: 5, arrival: "10:45 AM" },
    { name: "Notun Bazar", lat: 23.797733975379092, lng: 90.42317748069763, order: 6, arrival: "10:55 AM" },
  ] },
];

export const CHAKA_BUS_SNAPSHOT: ChakaBusSnapshot = {
  capturedAt: '2026-08-18 20:30',
  capturedAtLabel: { en: 'Snapshot: 18 Aug 2026, 8:30 PM', bn: 'স্ন্যাপশট: ১৮ আগস্ট ২০২৬, রাত ৮:৩০' },
  source: 'DTCA live feed via buskothay.com',
  buses: [
    { id: "865784056488524", vrn: "Dhaka Metro-BA-12-0103", bstId: "TMV 43951", routeId: 32, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788258, lng: 90.422806, lastSeen: "2026-08-18 20:29:07" },
    { id: "865784056499539", vrn: "Dhaka Metro-BA-12-0104", bstId: "TMV 43950", routeId: 32, status: "online", engineOn: true, speedKmh: 11, landmark: "Lake Shore Dr", lat: 23.788338, lng: 90.42262, lastSeen: "2026-08-18 20:20:10" },
    { id: "865784056498432", vrn: "Dhaka Metro-BA-12-0105", bstId: "TMV 43942", routeId: 32, status: "online", engineOn: false, speedKmh: 1, landmark: "Lake Shore Dr", lat: 23.788319, lng: 90.42274, lastSeen: "2026-08-18 20:24:51" },
    { id: "865784056507240", vrn: "Dhaka Metro-BA-12-0109", bstId: "TMV 43959", routeId: 32, status: "online", engineOn: true, speedKmh: 18, landmark: "Natun Bazar", lat: 23.7963, lng: 90.42371, lastSeen: "2026-08-18 20:29:08" },
    { id: "865784056500278", vrn: "Dhaka Metro-BA-12-0110", bstId: "TMV 43965", routeId: 32, status: "online", engineOn: true, speedKmh: 15, landmark: "Standard Bank Limited, Gulshan Ave", lat: 23.793657, lng: 90.41469, lastSeen: "2026-08-18 20:28:57" },
    { id: "865784056505335", vrn: "Dhaka Metro-BA-12-0112", bstId: "TMV 43957", routeId: 32, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788473, lng: 90.422806, lastSeen: "2026-08-18 08:14:28" },
    { id: "865784056496899", vrn: "Dhaka Metro-BA-12-0117", bstId: "TMV 43970", routeId: 32, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788286, lng: 90.42282, lastSeen: "2026-08-18 20:26:51" },
    { id: "865784056500328", vrn: "Dhaka Metro-BA-12-0121", bstId: "TMV 43963", routeId: 30, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788403, lng: 90.42282, lastSeen: "2026-08-18 20:29:01" },
    { id: "865784056499422", vrn: "Dhaka Metro-BA-12-0122", bstId: "TMV 43976", routeId: 30, status: "online", engineOn: true, speedKmh: 11, landmark: "Gulshan Police Station", lat: 23.791565, lng: 90.41569, lastSeen: "2026-08-18 20:28:37" },
    { id: "865784056507273", vrn: "Dhaka Metro-BA-12-0124", bstId: "TMV 43958", routeId: 32, status: "online", engineOn: false, speedKmh: 4, landmark: "Lake Shore Dr", lat: 23.788313, lng: 90.42277, lastSeen: "2026-08-18 19:56:14" },
    { id: "865784056499513", vrn: "Dhaka Metro-BA-12-0125", bstId: "TMV 43952", routeId: 30, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788477, lng: 90.42275, lastSeen: "2026-08-18 17:40:31" },
    { id: "865784056500286", vrn: "Dhaka Metro-BA-12-0165", bstId: "TMV 43967", routeId: 32, status: "online", engineOn: true, speedKmh: 23, landmark: "8 Road No 6, Gulshan", lat: 23.77098, lng: 90.41125, lastSeen: "2026-08-18 20:28:57" },
    { id: "865784056499547", vrn: "Dhaka Metro-BA-12-0166", bstId: "TMV 43960", routeId: 32, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788225, lng: 90.42288, lastSeen: "2026-08-18 20:29:00" },
    { id: "865784056500351", vrn: "Dhaka Metro-BA-12-0167", bstId: "TMV 43978", routeId: 32, status: "online", engineOn: true, speedKmh: 7, landmark: "Shanta Properties Limited, Tejgaon", lat: 23.770695, lng: 90.40629, lastSeen: "2026-08-18 20:28:39" },
    { id: "865784056498143", vrn: "Dhaka Metro-BA-12-0168", bstId: "TMV 43943", routeId: 32, status: "online", engineOn: true, speedKmh: 9, landmark: "Gulshan Road no. 28", lat: 23.78324, lng: 90.416794, lastSeen: "2026-08-18 20:28:59" },
    { id: "865784056500385", vrn: "Dhaka Metro-BA-12-0169", bstId: "TMV 43977", routeId: 32, status: "online", engineOn: false, speedKmh: 0, landmark: "Natun Bazar", lat: 23.797306, lng: 90.42347, lastSeen: "2026-08-18 20:23:43" },
    { id: "865784056506200", vrn: "Dhaka Metro-BA-12-0170", bstId: "TMV 43979", routeId: 32, status: "online", engineOn: true, speedKmh: 22, landmark: "Banani Road#11", lat: 23.790972, lng: 90.40062, lastSeen: "2026-08-18 20:29:04" },
    { id: "865784056484853", vrn: "Dhaka Metro-BA-12-0172", bstId: "TMV 43941", routeId: 32, status: "online", engineOn: true, speedKmh: 9, landmark: "Gulshan Road no. 35", lat: 23.794405, lng: 90.41297, lastSeen: "2026-08-18 20:29:09" },
    { id: "865784056507265", vrn: "Dhaka Metro-BA-12-0173", bstId: "TMV 43947", routeId: 32, status: "online", engineOn: true, speedKmh: 14, landmark: "Gulshan 2, GP Bus Stand ", lat: 23.79447, lng: 90.41361, lastSeen: "2026-08-18 20:28:46" },
    { id: "865784056499489", vrn: "Dhaka Metro-BA-12-0175", bstId: "TMV 43971", routeId: 32, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788235, lng: 90.422806, lastSeen: "2026-08-18 20:29:10" },
    { id: "865784056505400", vrn: "Dhaka Metro-BA-12-0278", bstId: "TMV 43948", routeId: 32, status: "online", engineOn: true, speedKmh: 18, landmark: "Womens World, Banani", lat: 23.794363, lng: 90.40181, lastSeen: "2026-08-18 20:28:47" },
    { id: "865784056500260", vrn: "Dhaka Metro-BA-12-0279", bstId: "TMV 43964", routeId: 32, status: "online", engineOn: true, speedKmh: 12, landmark: "Gulshan Road no. 35", lat: 23.794346, lng: 90.4131, lastSeen: "2026-08-18 20:28:36" },
    { id: "865784056505350", vrn: "Dhaka Metro-BA-12-0280", bstId: "TMV 43955", routeId: 30, status: "online", engineOn: true, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788485, lng: 90.42261, lastSeen: "2026-08-18 20:28:55" },
    { id: "865784056500344", vrn: "Dhaka Metro-BA-12-0281", bstId: "TMV 43973", routeId: 32, status: "online", engineOn: true, speedKmh: 15, landmark: "Hotel Sweet Dream, Banani", lat: 23.793535, lng: 90.407616, lastSeen: "2026-08-18 20:29:07" },
    { id: "865784056500294", vrn: "Dhaka Metro-BA-12-0282", bstId: "TMV 43968", routeId: 30, status: "online", engineOn: true, speedKmh: 0, landmark: "Womens World, Banani", lat: 23.794413, lng: 90.40163, lastSeen: "2026-08-18 20:29:04" },
    { id: "865784056507257", vrn: "Dhaka Metro-BA-12-0376", bstId: "TMV 43954", routeId: 32, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788445, lng: 90.42284, lastSeen: "2026-08-18 18:04:37" },
    { id: "865784056505384", vrn: "Dhaka Metro-BA-12-0444", bstId: "TMV 43946", routeId: 32, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788342, lng: 90.42282, lastSeen: "2026-08-18 20:16:32" },
    { id: "865784056499554", vrn: "Dhaka Metro-BA-12-0463", bstId: "TMV 43940", routeId: 32, status: "online", engineOn: false, speedKmh: 1, landmark: "Lake Shore Dr", lat: 23.78849, lng: 90.42285, lastSeen: "2026-08-18 17:30:17" },
    { id: "865784056505327", vrn: "Dhaka Metro-BA-12-2284", bstId: "TMV 43945", routeId: 30, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.788351, lng: 90.42277, lastSeen: "2026-08-18 19:19:14" },
    { id: "865784056824439", vrn: "Dhaka Metro-BA-15-6754", bstId: "TMV 48728", routeId: 30, status: "online", engineOn: false, speedKmh: 0, landmark: "Lake Shore Dr", lat: 23.78844, lng: 90.4227, lastSeen: "2026-08-18 20:28:22" },
    { id: "865784056505343", vrn: "Dhaka Metro-BA-15-6755", bstId: "TMV 43956", routeId: 30, status: "online", engineOn: false, speedKmh: 0, landmark: "Westin Hotel, Gulshan, Dhaka", lat: 23.793562, lng: 90.41484, lastSeen: "2026-08-18 20:28:46" },
  ],
};
