import {fetchTimeZoneResponseType, timeZoneAPI} from '../api/time-zone-api';
import {AppThunk} from './store';

const initialState: InitialStateType = {
	notes: [],
	filteredNotes: [],
	timeZones: [],
	selectedZone: '',
	zoneForm: '',
	text: '',
	sign: '',
	signForm: '',
	page: 1,
	itemsCount: 6,
	isLoading: false,
	error: ''
};

type InitialStateType = {
	notes: NoteType[]
	filteredNotes: NoteType[]
	timeZones: fetchTimeZoneResponseType
	selectedZone: string
	zoneForm: string
	signForm: string
	text: string
	sign: string
	page: number
	itemsCount: number
	isLoading: boolean
	error: string
}


export const appReducer =
	(state: InitialStateType = initialState,
	 action: AppActionTypes): InitialStateType => {
		switch (action.type) {
			case 'app/SET-IS-LOADING':
			case 'app/SET-TIME-ZONES':
			case 'app/SET-SELECTED-ZONE':
			case 'app/SET-TEXT':
			case 'app/SET-SIGN':
			case 'app/ITEMS-COUNT':
			case 'app/SET-PAGE':
			case 'app/SET-ERROR':
				return {
					...state,
					...action.payload
				};
			case 'app/ADD-NEW-NOTE':
				return {
					...state,
					notes: [
						...state.notes,
						action.payload.note
					]
				};
			case 'app/SET-FILTERED-NOTES':
				const start = action.page === 1 ? 0 : (action.page - 1) * action.itemsCount;
				const end = start + action.itemsCount;
				return {
					...state,
					filteredNotes: state.notes.slice(start, end)
				};
			default:
				return state;
		}
	};

//    ________________________ACTIONS_______________________

const setIsLoading = (isLoading: boolean) => (
	{
		type: 'app/SET-IS-LOADING',
		payload: {
			isLoading
		}
	} as const);

const setTimeZones = (timeZones: fetchTimeZoneResponseType) => (
	{
		type: 'app/SET-TIME-ZONES',
		payload: {
			timeZones
		}
	} as const);

export const setSelectedZone = (selectedZone: string) => (
	{
		type: 'app/SET-SELECTED-ZONE',
		payload: {
			selectedZone
		}
	} as const);

export const setText = (text: string) => (
	{
		type: 'app/SET-TEXT',
		payload: {
			text
		}
	} as const);

export const setSign = (sign: string) => (
	{
		type: 'app/SET-SIGN',
		payload: {
			sign
		}
	} as const);

const addNewNote = (note: NoteType) => (
	{
		type: 'app/ADD-NEW-NOTE',
		payload: {
			note
		}
	} as const);

export const setPage = (page: number) => (
	{
		type: 'app/SET-PAGE',
		payload: {
			page
		}
	} as const);
export const setItemsCount = (itemsCount: number) => (
	{
		type: 'app/ITEMS-COUNT',
		payload: {
			itemsCount
		}
	} as const);

export const setFilteredNotes = (page: number, itemsCount: number) => (
	{
		type: 'app/SET-FILTERED-NOTES',
		page,
		itemsCount
	} as const);
export const setError = (error: string) => (
	{
		type: 'app/SET-ERROR',
		payload: {
			error
		}
	} as const);

//_____________________________THUNKS_____________________________

export const fetchZones = (): AppThunk => async (dispatch) => {
	dispatch(setIsLoading(true));
	try {
		const res = await timeZoneAPI.fetchTimeZones();
		dispatch(setTimeZones(res.data));
		dispatch(setIsLoading(false));
	} catch (err) {
		dispatch(setIsLoading(false));
		dispatch(setError('Ooopps! Error!'));
	}
};

export const fetchTimeAndAddNote = (text: string, sign: string, selectedZone: string): AppThunk => async (dispatch, getState) => {
	dispatch(setIsLoading(true));
	dispatch(setSign(sign));
	dispatch(setSelectedZone(selectedZone));
	dispatch(setText(text));
	console.log('from thunk');
	try {
		const res = await timeZoneAPI.getCurrentTime(selectedZone);
		dispatch(setError('Note created!!'));
		const time = res.data.datetime;
		const id = getState().app.notes.length + 1;
		dispatch(addNewNote({text, sign, time, id}));
		dispatch(setText(''));
		dispatch(setIsLoading(false));
	} catch (err) {
		dispatch(setIsLoading(false));
		dispatch(setText(text));
		dispatch(setError('Ooopps! Error!'));
	}
};

//______________________________TYPES______________________________

export type AppActionTypes =
	| SetTimeZonesAT
	| SetSelectedZoneAT
	| SetTextAT
	| SetSignAT
	| AddNewNoteAT
	| SetIsLoadingAT
	| SetPageAT
	| SetItemsCountAT
	| SetFilteredNotes
	| SetErrorAT

type SetTimeZonesAT = ReturnType<typeof setTimeZones>
type SetSelectedZoneAT = ReturnType<typeof setSelectedZone>
type SetTextAT = ReturnType<typeof setText>
type SetSignAT = ReturnType<typeof setSign>
type SetIsLoadingAT = ReturnType<typeof setIsLoading>
type AddNewNoteAT = ReturnType<typeof addNewNote>
type SetPageAT = ReturnType<typeof setPage>
type SetItemsCountAT = ReturnType<typeof setItemsCount>
type SetFilteredNotes = ReturnType<typeof setFilteredNotes>
type SetErrorAT = ReturnType<typeof setError>

type NoteType = {
	text: string
	sign: string
	time: string
	id: number
}