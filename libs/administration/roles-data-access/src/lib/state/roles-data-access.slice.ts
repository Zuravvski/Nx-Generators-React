import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const ROLES_DATA_ACCESS_FEATURE_KEY = 'rolesDataAccess';

/*
 * Update these interfaces according to your requirements.
 */
export interface RolesDataAccessEntity {
  id: number;
}

export interface RolesDataAccessState
  extends EntityState<RolesDataAccessEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const rolesDataAccessAdapter =
  createEntityAdapter<RolesDataAccessEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchRolesDataAccess())
 * }, [dispatch]);
 * ```
 */
export const fetchRolesDataAccess = createAsyncThunk(
  'rolesDataAccess/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getRolesDataAccesss()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialRolesDataAccessState: RolesDataAccessState =
  rolesDataAccessAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const rolesDataAccessSlice = createSlice({
  name: ROLES_DATA_ACCESS_FEATURE_KEY,
  initialState: initialRolesDataAccessState,
  reducers: {
    add: rolesDataAccessAdapter.addOne,
    remove: rolesDataAccessAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolesDataAccess.pending, (state: RolesDataAccessState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchRolesDataAccess.fulfilled,
        (
          state: RolesDataAccessState,
          action: PayloadAction<RolesDataAccessEntity[]>
        ) => {
          rolesDataAccessAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchRolesDataAccess.rejected,
        (state: RolesDataAccessState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const rolesDataAccessReducer = rolesDataAccessSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(rolesDataAccessActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const rolesDataAccessActions = rolesDataAccessSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllRolesDataAccess);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = rolesDataAccessAdapter.getSelectors();

export const getRolesDataAccessState = (
  rootState: unknown
): RolesDataAccessState => rootState[ROLES_DATA_ACCESS_FEATURE_KEY];

export const selectAllRolesDataAccess = createSelector(
  getRolesDataAccessState,
  selectAll
);

export const selectRolesDataAccessEntities = createSelector(
  getRolesDataAccessState,
  selectEntities
);
