import { Type } from './../Model/Type';

export interface TypeState {
    data: Type[];
}
export interface AddTypeErrorMessageDTO {
    name: string;
    general: string;
}
