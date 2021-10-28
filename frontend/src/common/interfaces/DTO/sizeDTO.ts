import { Size } from '../Model/Size';

export interface AddSizeDTO extends Pick<Size, 'name'> {}
export interface AdminRemoveSizeDTO {
    ID: number;
}
