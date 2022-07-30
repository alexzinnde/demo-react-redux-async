import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logout, login, postLogin} from './redux'

const App = () => {
	const dispatch = useDispatch()
	const {token, isLoading, currentRequestId} = useSelector(state => state.user)

	const handleClick = () => {
		console.log('clicked')
		if (token) {
			dispatch(logout())
		} 
		else {
			console.log('dispatch login')
			dispatch(postLogin({email: 'some@user.com', password: 'Password'})).unwrap().then((data) => {
				console.log('data:', data)
				dispatch(login(data))
			})
		}
	}

	return (
		<div style={{height: '500px', display: 'flex', justifyContent: 'center'}}>
			<div style={{margin: 'auto'}}>
				<p>token: {token}</p>
				<p>currentRequestId: {currentRequestId}</p>
				<p>isLoading: {isLoading}</p>
				<button onClick={handleClick}>{token ? 'Logout' : 'Login'}</button>
			</div>
		</div>
	)
}

export default App
