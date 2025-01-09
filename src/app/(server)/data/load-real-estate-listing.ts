
import frontImage from './images/front.jpg';
import bedroomImage from './images/bedroom.jpg';
import backImage from './images/back.jpg';
import { RealEstateListing } from '../../../lib/types';

export async function loadRealEstateListing(): Promise<RealEstateListing> {
  const url = new URL('./real-estate-listing.json', import.meta.url);

  const listing = (await fetch(url).then(res =>
    res.json()
  )) as RealEstateListing;

  listing.images = [frontImage.src, bedroomImage.src, backImage.src];

  return listing;
}
