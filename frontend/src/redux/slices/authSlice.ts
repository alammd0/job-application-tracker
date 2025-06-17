import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface authState {
    user : string | null,
    loading : boolean ,
    token : string | null,
}

// Initialize state 
const initialState : authState = {
    user : null ,
    loading : false,
    token : localStorage.getItem("token")
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setUser(state, action : PayloadAction<string | null>){
            state.user = action.payload
        },

        setLoading(state, action : PayloadAction<boolean>){
            state.loading = action.payload
        },

        setToken(state, action : PayloadAction<string | null>){
            state.token = action.payload
        },

        logOutUser(state){
            state.token = null,
            state.user = null
        }
    }
})

export const {setUser, setLoading, setToken, logOutUser} = authSlice.actions;
export default authSlice.reducer; 