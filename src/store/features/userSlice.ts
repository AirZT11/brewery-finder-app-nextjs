import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"

export interface UserState {
  email: string
  name: string
}

/**
 * Default state object with initial values.
 */
const initialState: UserState = {
  name: "",
  email: "",
}

/**
 * Create a slice as a reducer containing actions.
 */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.name>
    ) => {
      state.name = action.payload
    },
    setEmail: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.email>
    ) => {
      state.email = action.payload
    },
  },
})

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { user: UserState }) => state.user

// Exports all actions
export const { setName, setEmail } = userSlice.actions

export default userSlice.reducer
