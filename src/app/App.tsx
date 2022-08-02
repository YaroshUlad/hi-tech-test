import React, {useEffect} from 'react';
import {Router} from './routes/Router';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from './store';
import {fetchZones, setError} from './app-reducer';
import LinearProgress from '@mui/material/LinearProgress';
import {Alert, ButtonGroup, Snackbar} from '@mui/material';
import Button from '@mui/material/Button';

const App = () => {
	const isLoading = useAppSelector(state => state.app.isLoading);
	const dispatch = useAppDispatch();
	const error = useAppSelector(state => state.app.error);

	useEffect(() => {
		dispatch(fetchZones());
	}, []);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(setError(''));
	};

	return (
		<div>
			{isLoading && <LinearProgress/>}
			<div className={'nav'}>
				<ButtonGroup variant="contained" aria-label="outlined primary button group">
					<Button><NavLink to={'/add-new-note'}>Create note</NavLink></Button>
					<Button><NavLink to={'/notes'}>Notes view</NavLink></Button>
				</ButtonGroup>
			</div>
			<hr/>
			<Router/>
			<Snackbar open={ !!error} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="info" sx={{width: '100%'}}>
					{error}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default App;