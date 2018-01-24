import { Address } from './address';

/**
 * Photographer profile interface
 * @author Daniel Sogl
 */
export interface PhotographerProfile {
  /** About */
  about?: string;
  /** Address */
  address?: Address;
  /** Email */
  email?: string;
  /** Facebook */
  facebook?: string;
  /** Instagram */
  instagram?: string;
  /** Location */
  location: {
    /** Latitute */
    lat: number;
    /** Longitude */
    lng: number;
  };
  /** Name */
  name?: string;
  /** Phone */
  phone?: string;
  /** Photo URL */
  photoUrl?: string;
  /** Premium user */
  premium: boolean;
  /** Tumbler */
  tumbler?: string;
  /** Twitter */
  twitter?: string;
  /** UID */
  uid?: string;
  /** Website */
  website?: string;
  /** ProfileUrl */
  profileUrl: string;
}
