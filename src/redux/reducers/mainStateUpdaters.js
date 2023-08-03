export const INITIAL_MAIN_STATE = {
  fanbands: {
    results: [],
    take: 0,
    total: 0,
    statistics: {},
  },
  tickets: {
    results: [],
    take: 0,
    total: 0,
    uploadingProgress: 0,
    uploadedTickets: [],
  },
};

export const setTicketsUpdater = (state, { payload }) => ({
  ...state,
  tickets: {
    ...state.tickets,
    ...payload,
  },
});

export const setTicketsUploadingProgressUpdater = (state, { payload }) => ({
  ...state,
  tickets: {
    ...state.tickets,
    uploadingProgress: payload,
  },
});

export const setUploadedTicketsUpdater = (state, { payload }) => ({
  ...state,
  tickets: {
    ...state.tickets,
    uploadedTickets: payload,
  },
});

export const setFanbandsUpdater = (state, { payload }) => ({
  ...state,
  fanbands: {
    ...state.fanbands,
    ...payload,
  },
});

export const setFanbandsStatisticsUpdater = (state, { payload }) => ({
  ...state,
  fanbands: {
    ...state.fanbands,
    statistics: {
      ...state.fanbands.statistics,
      ...payload,
    },
  },
});
