import React, { FunctionComponent, useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

import { RealEstateListingDetails } from '../real-estate-listing-details/real-estate-listing-details';
import { RealEstateGallery } from '../real-estate-gallery/real-estate-gallery';

import './custom-advanced-marker.css';
import { RealEstateListing } from '@/lib/types';
import { RealEstateIcon } from '../icons/real-estate-icon';
import { cn } from '@/lib/utils';

interface Props {
    realEstateListing: RealEstateListing;
}

export const CustomAdvancedMarker: FunctionComponent<Props> = ({
    realEstateListing
}) => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const position = {
        lat: realEstateListing.details.latitude,
        lng: realEstateListing.details.longitude
    };

    const renderCustomPin = () => {
        return (
            <>
                <div className="custom-pin">
                    <button className="close-button">
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    <div className="image-container">
                        <RealEstateGallery
                            images={realEstateListing.images}
                            isExtended={clicked}
                        />
                        <span className="icon">
                            <RealEstateIcon />
                        </span>
                    </div>

                    <RealEstateListingDetails details={realEstateListing.details} />
                </div>

                <div className="tip" />
            </>
        );
    };

    return (
        <>
            <AdvancedMarker
                position={position}
                title={'AdvancedMarker with custom html content.'}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={cn('real-estate-marker', { clicked, hovered })}
                onClick={() => setClicked(!clicked)}>
                {renderCustomPin()}
            </AdvancedMarker>
        </>
    );
};
