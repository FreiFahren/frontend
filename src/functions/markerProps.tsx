export interface MarkersProps {
    formSubmitted: boolean;
}

export type MarkerData = {
    timestamp: string;
    station: {
        id: string;
        name: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
    direction: {
        id: string;
        name: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
    line: string;
};
