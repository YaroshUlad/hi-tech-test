import React, {useEffect} from 'react';

import Grid from '@mui/material/Grid';

import {useAppDispatch, useAppSelector} from '../../app/store';
import {setFilteredNotes, setItemsCount, setPage} from '../../app/app-reducer';

import {Note} from './Note';
import {Pagination, SelectChangeEvent} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export const Notes = (): React.ReactElement => {
	const itemsCount = useAppSelector(state => state.app.itemsCount);
	const page = useAppSelector(state => state.app.page);
	const filteredNotes = useAppSelector(state => state.app.filteredNotes);
	const dispatch = useAppDispatch();

	const notes = useAppSelector(state => state.app.notes);
	const pagesCount = notes.length % itemsCount === 0
		? notes.length / itemsCount
		: Math.ceil(notes.length / itemsCount);


	const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		dispatch(setPage(value));
	};
	useEffect(() => {
		dispatch(setFilteredNotes(page, itemsCount));
	}, [page, itemsCount]);
	return (
		<div className={'notesWrap'}>
			<div className={'pagination'}>
				<Select value={itemsCount.toString()}
				        size={'small'}
				        defaultValue={'6'}
				        onChange={(e: SelectChangeEvent) => {
					        dispatch(setItemsCount(+e.target.value));
				        }}
				>
					<MenuItem value={3}>3</MenuItem>
					<MenuItem value={6}>6</MenuItem>
					<MenuItem value={9}>9</MenuItem>
				</Select>
				<Pagination variant={'outlined'}
				            size={'medium'}
				            shape="rounded"
				            page={page}
				            onChange={pageChange}
				            count={pagesCount}/>
			</div>
			<div className={'notes'}>
				<Grid container spacing={1} sx={{width: '1000px'}}>
					{filteredNotes.map(({text, time, sign, id}) => {
						return (
							<Grid item key={id} xs={4}>
								<Note sign={sign} id={id} time={time} text={text}/>
							</Grid>
						);
					})}
				</Grid>
			</div>
		</div>
	);
};