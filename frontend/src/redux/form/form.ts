import { sizeThunk } from './../size/sizeThunk';
import { colorThunk } from './../color/colorThunk';
import { createSlice } from '@reduxjs/toolkit';
import { FormState } from '../../common/interfaces/Redux/form';
import {
    defaultAddColor,
    defaultAddSize,
    defaultAddType,
    defaultRegisterUser,
    defaultUpdateUser,
    defautLoginUser,
} from '../common/defaultValue';
import { userThunk } from '../user/userThunk';
import { formThunk } from './formThunk';
import { typeThunk } from '../type/typeThunk';

const initialState: FormState = {
    login: defautLoginUser,
    register: defaultRegisterUser,
    updateUser: defaultUpdateUser,
    addColor: defaultAddColor,
    addSize: defaultAddSize,
    addType: defaultAddType,
};
export const form = createSlice({
    name: 'form',
    initialState,
    reducers: {
        resetState: () => {
            return {
                ...initialState,
            };
        },
        resetLoginForm: (state) => {
            return {
                ...state,
                login: { ...defautLoginUser },
            };
        },
        resetRegisterForm: (state) => {
            return {
                ...state,
                register: { ...defaultRegisterUser },
            };
        },
        resetUpdateUserForm: (state) => {
            return {
                ...state,
                updateUser: { ...defaultUpdateUser },
            };
        },
        resetAddColorForm: (state) => {
            return {
                ...state,
                addColor: {
                    ...defaultAddColor,
                },
            };
        },
        resetAddTypeForm: (state) => {
            return {
                ...state,
                addType: {
                    ...defaultAddType,
                },
            };
        },
        resetAddSizeForm: (state) => {
            return {
                ...state,
                addSize: {
                    ...defaultAddType,
                },
            };
        },
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(formThunk.login.fulfilled, (state) => {
            return {
                ...state,
                login: {
                    ...initialState.login,
                },
            };
        });
        builder.addCase(formThunk.login.rejected, (state, { payload }) => {
            if (payload) {
                return {
                    ...state,
                    login: {
                        ...payload,
                    },
                };
            }
        });
        //register
        builder.addCase(formThunk.register.fulfilled, (state) => {
            return {
                ...state,
                register: {
                    ...initialState.register,
                },
            };
        });
        builder.addCase(formThunk.register.rejected, (state, { payload }) => {
            if (payload) {
                return {
                    ...state,
                    register: {
                        ...payload,
                    },
                };
            }
        });
        //update
        builder.addCase(userThunk.updateUser.rejected, (state, { payload }) => {
            if (payload) {
                return {
                    ...state,
                    updateUser: {
                        ...payload,
                    },
                };
            }
        });
        //add color
        builder.addCase(colorThunk.adminAddNewColor.rejected, (state, { payload }) => {
            if (payload) {
                return {
                    ...state,
                    addColor: {
                        ...payload,
                    },
                };
            }
        });
        //add type
        builder.addCase(typeThunk.adminAddNewType.rejected, (state, { payload }) => {
            if (payload) {
                return {
                    ...state,
                    addType: {
                        ...payload,
                    },
                };
            }
        });
        //add size
        builder.addCase(sizeThunk.adminAddNewSize.rejected, (state, { payload }) => {
            if (payload) {
                return {
                    ...state,
                    addSize: {
                        ...payload,
                    },
                };
            }
        });
    },
});

export const formAction = { ...form.actions };
export default form.reducer;
