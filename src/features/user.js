import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    first_name: "",
    last_name: "",
    bio: "",
    username: "",
    email: "",
    admin: false,
    articles: [],
    // token: ""
}
export const userSlice = createSlice({
    name: "user",
    initialState: initialStateValue,

    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },

        logout: (state) => {
            state.value = initialStateValue
        },

    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer