
import React, { useMemo } from 'react';
import { X, Phone, Shield, Activity, Flame, MapPin, Navigation2 } from 'lucide-react';
import { UserLocation } from '../types';
import { NATIONAL_HELPLINES } from '../data/emergencyHelplines';
import { findNearestEmergencyServicesByType, formatDistance, NearestEmergencyService } from '../services/emergencyService';

interface EmergencyHelplineModalProps {
    isOpen: boolean;
    onClose: () => void;
    userLocation: UserLocation | null;
    currentLocationName?: string;
}

const EmergencyHelplineModal: React.FC<EmergencyHelplineModalProps> = ({
    isOpen,
    onClose,
    userLocation,
    currentLocationName
}) => {
    const nearestServices = useMemo(() => {
        if (!userLocation) return null;
        return findNearestEmergencyServicesByType(userLocation, 2);
    }, [userLocation]);

    if (!isOpen) return null;

    const getServiceIcon = (type: string) => {
        switch (type) {
            case 'police':
                return <Shield className="w-5 h-5" />;
            case 'hospital':
                return <Activity className="w-5 h-5" />;
            case 'fire':
                return <Flame className="w-5 h-5" />;
            default:
                return <Phone className="w-5 h-5" />;
        }
    };

    const getServiceColor = (type: string) => {
        switch (type) {
            case 'police':
                return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'hospital':
                return 'bg-green-50 text-green-600 border-green-200';
            case 'fire':
                return 'bg-red-50 text-red-600 border-red-200';
            default:
                return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    const handleCall = (number: string) => {
        window.location.href = `tel:${number}`;
    };

    const renderServiceCard = (service: NearestEmergencyService) => {
        const colorClass = getServiceColor(service.type);

        return (
            <div
                key={service.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className={`p-1.5 rounded-lg border ${colorClass}`}>
                                {getServiceIcon(service.type)}
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm">{service.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{service.bnName}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{service.area} • {formatDistance(service.distance)} away</span>
                        </div>
                    </div>
                    <button
                        onClick={() => handleCall(service.phone)}
                        className="shrink-0 bg-dhaka-green hover:bg-green-600 text-white p-3 rounded-xl transition-colors shadow-sm active:scale-95"
                        aria-label={`Call ${service.name}`}
                    >
                        <Phone className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div
                className="bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-bottom-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200 shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-dhaka-red" />
                            Emergency Helplines
                        </h2>
                        {currentLocationName && (
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <Navigation2 className="w-3 h-3" />
                                Near {currentLocationName}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {/* National Helplines */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                            <Shield className="w-4 h-4 text-dhaka-red" />
                            National Emergency Numbers
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                            {NATIONAL_HELPLINES.map((helpline) => (
                                <div
                                    key={helpline.id}
                                    className="bg-gradient-to-r from-dhaka-red/5 to-transparent border border-red-100 rounded-xl p-3 flex items-center justify-between"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 text-sm">{helpline.name}</h4>
                                        <p className="text-xs text-gray-500">{helpline.bnName}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{helpline.description}</p>
                                    </div>
                                    <button
                                        onClick={() => handleCall(helpline.number)}
                                        className="shrink-0 bg-dhaka-red hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm active:scale-95 flex items-center gap-2"
                                    >
                                        <Phone className="w-4 h-4" />
                                        {helpline.number}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Location-based Services */}
                    {userLocation && nearestServices && (
                        <>
                            {/* Police Stations */}
                            {nearestServices.police.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-blue-600" />
                                        Nearest Police Stations
                                    </h3>
                                    <div className="space-y-2">
                                        {nearestServices.police.map(renderServiceCard)}
                                    </div>
                                </div>
                            )}

                            {/* Hospitals */}
                            {nearestServices.hospital.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-green-600" />
                                        Nearest Hospitals
                                    </h3>
                                    <div className="space-y-2">
                                        {nearestServices.hospital.map(renderServiceCard)}
                                    </div>
                                </div>
                            )}

                            {/* Fire Stations */}
                            {nearestServices.fire.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                                        <Flame className="w-4 h-4 text-red-600" />
                                        Nearest Fire Stations
                                    </h3>
                                    <div className="space-y-2">
                                        {nearestServices.fire.map(renderServiceCard)}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {!userLocation && (
                        <div className="text-center py-8 text-gray-500">
                            <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm">Location not available</p>
                            <p className="text-xs mt-1">Enable location to see nearby emergency services</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0 rounded-b-3xl md:rounded-b-2xl">
                    <p className="text-xs text-center text-gray-500">
                        In case of emergency, call <span className="font-bold text-dhaka-red">999</span> immediately
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmergencyHelplineModal;
