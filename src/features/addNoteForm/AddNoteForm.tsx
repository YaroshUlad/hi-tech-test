import React, {useEffect} from 'react';

import {fetchTimeAndAddNote} from '../../app/app-reducer';
import {useAppDispatch, useAppSelector} from '../../app/store';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

import {useFormik} from 'formik';
import {validationSchema} from '../../common/validation';
import {CircularProgress} from '@mui/material';

export const AddNoteForm = React.memo((): React.ReactElement => {
	const sign = useAppSelector(state => state.app.sign);
	const zone = useAppSelector(state => state.app.selectedZone);
	const text = useAppSelector(state => state.app.text);
	const timeZones = useAppSelector(state => state.app.timeZones);
	const isLoading = useAppSelector(state => state.app.isLoading);

	const dispatch = useAppDispatch();

	const formik = useFormik({
		initialValues: {
			'text': '',
			'sign': sign,
			'zone': zone
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(fetchTimeAndAddNote(values.text, values.sign, values.zone));
		}
	});

	useEffect(() => {
		formik.resetForm({
			values: {
				'text': text,
				'sign': sign,
				'zone': zone
			}
		});
	}, [text]);

	return (
		<Paper elevation={12} sx={{width: '400px', margin: '60px auto', padding: '20px'}}>
			<h2>Add your note</h2>
			<form onSubmit={formik.handleSubmit}>
				<FormControl fullWidth>
					<TextField variant={'outlined'}
					           sx={{marginBottom: '10px'}}
					           {...formik.getFieldProps('text')}
					           error={formik.touched.text && !!formik.errors.text}
					           label={!!formik.errors.text ? formik.errors.text : 'Note text'}
					           multiline
					           required
					           rows={5}
					/>
					<div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
						<TextField variant={'outlined'}
						           sx={{marginBottom: '10px', marginRight: '10px', width: '58%'}}
						           {...formik.getFieldProps('sign')}
						           error={formik.touched.sign && !!formik.errors.sign}
						           label={!!formik.errors.sign ? formik.errors.sign : 'Sign'}
						           required
						/>
						<FormControl sx={{width: '40%'}}>
							<InputLabel id="demo-simple-select-label"
							            error={formik.touched.zone && !!formik.errors.zone}>
								{!!formik.errors.zone ? formik.errors.zone : 'Time zone'}
							</InputLabel>
							<Select labelId="demo-simple-select-label"

							        {...formik.getFieldProps('zone')}
							        error={formik.touched.zone && !!formik.errors.zone}
							        id="demo-simple-select"
							        label={!!formik.errors.zone ? formik.errors.zone : 'Time zone'}
							>
								{timeZones?.map((el, index) => {
									return (
										<MenuItem key={index}
										          value={el}>{el}</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</div>

					<Button disabled={isLoading}
					        type={'submit'}
					        sx={{marginTop: '20px', width: '50%', alignSelf: 'center'}}
					        variant={'contained'}
					>
						{isLoading ? <CircularProgress size={20}/> : 'Submit'}
					</Button>
				</FormControl>
			</form>
		</Paper>
	);
});
