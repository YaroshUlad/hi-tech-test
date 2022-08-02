import React from 'react';
import Paper from '@mui/material/Paper';

type  NotePropsType = {
	sign: string
	id: number
	time: string
	text: string
}

export const Note = (props: NotePropsType): React.ReactElement => {
	const {sign, id, time, text} = props;

	return (
		<Paper elevation={9} sx={{width: '300px', height: '150px', padding: '10px'}}>
			<div className={'sign'}>{sign}</div>
			<div><h3>Note №{id}</h3></div>
			<div className={'note time'}>{time}</div>
			<p className={'note text'}>{text}</p>
		</Paper>
	);
};
