import { Color } from './../Model/Color';
export interface AddColorDTO extends Pick<Color, 'name' | 'hexCode'> {}

export interface AddColorErrorMessageDTO {
    name: string;
    hexCode: string;
    general: string;
}

export interface RemoveColorDTO extends Pick<Color, 'name'> {}

export interface AdminRemoveColorDTO {
    ID: number;
}
