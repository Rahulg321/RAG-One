import React, { useCallback } from 'react';
import {
    AdvancedMarker,
    AdvancedMarkerAnchorPoint,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { CastleIcon } from '@/components/icons/castle-icon';

type TreeMarkerProps = {
    position: google.maps.LatLngLiteral;
    featureId: string;
    onMarkerClick?: (
        marker: google.maps.marker.AdvancedMarkerElement,
        featureId: string
    ) => void;
};

export const CastleFeatureMarker = ({
    position,
    featureId,
    onMarkerClick
}: TreeMarkerProps) => {
    const [markerRef, marker] = useAdvancedMarkerRef();
    const handleClick = useCallback(
        () => onMarkerClick && onMarkerClick(marker!, featureId),
        [onMarkerClick, marker, featureId]
    );

    return (
        <AdvancedMarker
            ref={markerRef}
            position={position}
            onClick={handleClick}
            anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
            className={'marker feature'}>
            <CastleIcon />
        </AdvancedMarker>
    );
};
