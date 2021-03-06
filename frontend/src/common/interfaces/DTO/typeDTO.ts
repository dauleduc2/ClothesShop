import { Type } from '../Model/Type';

export interface AddTypeDTO extends Pick<Type, 'name'> {}
export interface AdminRemoveTypeDTO {
    ID: number;
}
