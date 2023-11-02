import {
	ActionCreator,
	AnyAction,
	PayloadAction,
	ThunkAction,
	configureStore,
	createSlice,
} from "@reduxjs/toolkit";
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";
import {HYDRATE, createWrapper} from "next-redux-wrapper";
import {useDispatch} from "react-redux";

export const pageSlice = createSlice({
	name: "page",

	initialState: {name: "", },

	reducers: {
		
		setName(state, {payload}: PayloadAction<{title: string; subtitle: string}>) {
			state.name += 1;
			Object.assign(state, payload);
		},
		
	},

	extraReducers(builder) {
		builder.addCase<typeof HYDRATE, PayloadAction<AppState, typeof HYDRATE>>(
			HYDRATE,
			(state, {payload}) => ({...state, ...payload.page})
		);
	},
});



export const selectPage = (state: AppState) => state[pageSlice.name];

const makeStore = wrapMakeStore(() =>
	configureStore({
		reducer: {
			[pageSlice.name]: pageSlice.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(
				nextReduxCookieMiddleware({
					subtrees: [
						`${pageSlice.name}.counter`,
						{
							subtree: `${pageSlice.name}.locale`,
							cookieName: "NEXT_LOCALE",
							serializationFunction: String,
							deserializationFunction: String,
							
						},
					],
				})
			),
	})
);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunkAction<ReturnType = Promise<void>> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	AnyAction
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});







