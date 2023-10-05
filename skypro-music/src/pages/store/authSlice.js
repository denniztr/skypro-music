import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getToken = createAsyncThunk(
    'auth/getToken',
    async function({ email, password }, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch('https://skypro-music-api.skyeng.tech/user/token/', {
                method: 'POST',
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
                headers: {
                  "content-type": "application/json",
                },
            });

            if (!response.ok) throw new Error('an Error occurred in getToken function');

            const data = await response.json();
            console.log(data)
            dispatch(setToken({data}))
            
        } catch (error) {
            return rejectWithValue(error.message)
        }

    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
    },
    reducers: {
        setToken: (state,action) => {
            state.token = action.payload;
        },
    },
}); 

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
