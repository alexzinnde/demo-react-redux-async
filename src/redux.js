import {configureStore, createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import thunk from 'react-thunk'
import axios from 'axios'

export const postLogin = createAsyncThunk('user/login', async (loginCredentials, thunkAPI) => {
	const res = await new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('id_token')
		}, 5000)
	})
	return res
	// const res = await axios.post('/user/login', {
	// 	...loginCredentials
	// })
	// return res
})

const userSlice = createSlice({
	name: 'user',
	initialState: {
		token: '',
		isLoading: 'idle',
		currentRequestId: undefined,
		error: null
	},
	reducers: {
		logout: state => {
			state.token = ''
		},
		login: (state, action) => {
			state.token = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(postLogin.pending, (state, action) => {
				console.log('in postLogin.pending state.isLoading', state.isLoading)
				if (state.isLoading === 'idle') {
					state.isLoading = 'fetching'
					state.currentRequestId = action.meta.requestId
				}
			})
			.addCase(postLogin.fulfilled, (state, action) => {
				if (action.payload.status === 200 && action.payload.token) {
					state.id = action.payload.data.id
				}
				if (action.payload.status === 400) {
					state.error = 'unathorized'
				}
				state.isLoading = 'idle'
			})
			.addCase(postLogin.rejected, (state, action) => {
				state.error = 'something went wrong'
			})
	}
})

const userReducer = userSlice.reducer

export const store = configureStore({
	reducer: {
		user: userReducer
	},
	middleWare: [thunk]
})

export const {logout, login} = userSlice.actions
