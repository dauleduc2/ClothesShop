import { Size } from './../Model/Size';

export interface SizeState {
    data: Size[];
}

export interface AddSizeErrorMessageDTO {
    name: string;
    general: string;
}
