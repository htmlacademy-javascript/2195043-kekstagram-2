import { CONFIG } from './config.js';
import { createPictureCollection } from './pictures.js';
import {renderPictures} from './render-pictures.js';
import { openModalHandler } from './modal-window';

const PICTURES_COUNT = 25;

const pictureTemplateElement = document.querySelector('#picture')?.content?.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const pictures = createPictureCollection({ count: PICTURES_COUNT, config: CONFIG });
renderPictures(pictures, pictureTemplateElement, picturesContainerElement, openModalHandler);
