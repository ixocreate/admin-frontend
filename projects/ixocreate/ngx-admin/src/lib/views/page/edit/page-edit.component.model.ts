/**
 * Height of the heading around the aside panel in px
 * Needed to calculate the 100vh-[height] for the iframe of the preview
 */
export const HEADING_HEIGHT = 100;
export const FOOTER_HEIGHT = 170;

/**
 * The types of displays that exists
 */
export type DisplayTypes = 'MOBILE' | 'TABLET' | 'DESKTOP';

/**
 * Define a Key-Value pair for each IFramePreview, the numer is in px
 */
export type ScreenSizes = { [key in DisplayTypes]: number };
/**
 * Size of the corresponding displays in pixels
 */
const pixelValues: ScreenSizes = {
  MOBILE: 300,
  TABLET: 600,
  DESKTOP: 1000
};

/**
 * Returns the pixel representation of a display type
 *
 * @param size see {@link DisplayTypes}
 */
export function screensInPixels(size: DisplayTypes) {
  return pixelValues[size];
}
