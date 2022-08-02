import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {AddNoteForm} from '../../features/addNoteForm/AddNoteForm';
import {Page404} from '../../common/Page404';
import {Notes} from '../../features/notes/Notes';


export const Router = () => {
	return (
		<Routes>
			<Route path={'/add-new-note'} element={<AddNoteForm/>}/>
			<Route path={'/'} element={<Navigate to={'/add-new-note'}/>}/>
			<Route path={'/notes'} element={<Notes/>}/>
			<Route path={'/404'} element={<Page404/>}/>
			<Route path={'*'} element={<Navigate to={'/404'}/>}/>
		</Routes>
	);
};
