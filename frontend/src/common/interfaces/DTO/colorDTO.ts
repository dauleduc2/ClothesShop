import { Color } from './../Model/Color';
export interface AddColorDTO extends Pick<Color, 'name' | 'hexCode'> {}
