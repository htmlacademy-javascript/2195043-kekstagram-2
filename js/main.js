import { CONFIG } from './config.js';
import { generatePhotoArray } from './photos.js';

const PHOTO_ARRAY_SIZE = 25;

generatePhotoArray({ size: PHOTO_ARRAY_SIZE, config: CONFIG });
