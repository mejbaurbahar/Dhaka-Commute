import { UserLocation } from '../../types';
import { isNativePlatform } from '../utils/platformDetect';

/**
 * Native geolocation via @capacitor/geolocation — used in the Android app build.
 * Dynamic import so the web bundle never includes the plugin.
 * Returns null when not on native, permission denied, or the plugin fails —
 * callers fall back to the browser API.
 */
export const getNativeLocation = async (): Promise<UserLocation | null> => {
  if (!isNativePlatform()) return null;
  try {
    const { Geolocation } = await import('@capacitor/geolocation');
    const permission = await Geolocation.requestPermissions();
    if (permission.location !== 'granted') return null;
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 30000,
    });
    return { lat: position.coords.latitude, lng: position.coords.longitude };
  } catch {
    return null;
  }
};
