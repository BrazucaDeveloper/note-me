interface SaveReducerState {
	localSaved: boolean | null
	remoteSaved: boolean | null
}

type SaveReducerAction =
	| { type: 'SET_LOCAL_SAVED'; payload: boolean }
	| { type: 'SET_REMOTE_SAVED'; payload: boolean }
	| { type: 'RESET_SAVED' }

const setLocalSaved = (payload: boolean): SaveReducerAction => ({
	type: 'SET_LOCAL_SAVED',
	payload,
})
const setRemoteSaved = (payload: boolean): SaveReducerAction => ({
	type: 'SET_REMOTE_SAVED',
	payload,
})
const resetSaved = (): SaveReducerAction => ({ type: 'RESET_SAVED' })

const saveReducer = (
	state: SaveReducerState,
	action: SaveReducerAction
): SaveReducerState => {
	switch (action.type) {
		case 'SET_LOCAL_SAVED':
			return { ...state, localSaved: action.payload }
		case 'SET_REMOTE_SAVED':
			return { ...state, remoteSaved: action.payload }
		case 'RESET_SAVED':
			return { localSaved: null, remoteSaved: null }
		default:
			return state
	}
}

export {
	saveReducer,
	setLocalSaved,
	setRemoteSaved,
	resetSaved,
	type SaveReducerState,
}
