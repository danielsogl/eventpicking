import { ImageInfo } from './image-info';

/**
 * Event picture interface
 * @author Daniel Sogl
 */
export interface EventPicture {
  /** Image info */
  info: ImageInfo;
  /** Image name */
  name: string;
  /** Preview url */
  preview: string;
  /** Ratings */
  ratings: number;
  /** Thumbnail url */
  thumbnail: string;
  /** Image Id */
  id: string;
  /** Selected */
  selected?: boolean;
  /** Amount */
  amount?: number;
}
