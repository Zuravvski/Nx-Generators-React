import {
  fetchRolesDataAccess,
  rolesDataAccessAdapter,
  rolesDataAccessReducer,
} from './roles-data-access.slice';

describe('rolesDataAccess reducer', () => {
  it('should handle initial state', () => {
    const expected = rolesDataAccessAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(rolesDataAccessReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchRolesDataAccesss', () => {
    let state = rolesDataAccessReducer(
      undefined,
      fetchRolesDataAccess.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = rolesDataAccessReducer(
      state,
      fetchRolesDataAccess.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = rolesDataAccessReducer(
      state,
      fetchRolesDataAccess.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
