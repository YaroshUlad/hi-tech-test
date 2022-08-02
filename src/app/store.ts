import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppActionTypes, appReducer} from "./app-reducer";
import {loadState, saveState} from "./localStorage";

const rootReducer = combineReducers({
    app: appReducer
});

const persistedState = loadState();

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    saveState(store.getState());
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    RootActionsType>;

type AppDispatch = ThunkDispatch<AppRootStateType, any, RootActionsType>;
type RootActionsType = AppActionTypes;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;