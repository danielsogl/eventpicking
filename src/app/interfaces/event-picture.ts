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
}
/**
 * Image info interface
 * @author Daniel Sogl
 */
export interface ImageInfo {
  /** Image height */
  height: number;
  /** Image size */
  size: number;
  /** Image type */
  type: string;
  /** Image width */
  width: number;
}
