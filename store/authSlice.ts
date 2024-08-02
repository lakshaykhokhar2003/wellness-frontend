import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    authState: boolean;
    id: string | null;
    email: string | null;
    token: string | null;
}

const initialState: AuthState = {
    authState: false,
    id: null,
    email: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: string; email: string; token: string }>) => {
            state.authState = true;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.authState = false;
            state.id = null;
            state.email = null;
            state.token = null;
        },
    },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
