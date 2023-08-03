import React, { useCallback, useState } from 'react';
import {
  Box,
  Grid,
  Divider,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import { TicketItem } from 'components';
import { useAsyncAction, usePagination } from 'hooks';
import { getFanbands, getTickets } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'utils/helpers';
import SearchIcon from '@material-ui/icons/Search';

const TicketTable = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { results: tickets, total } = useSelector(
    (state) => state.main.tickets
  );

  const { skip, take, paginator } = usePagination({
    count: total,
    action: getTickets,
  });

  const handleSearch = useCallback(() => {
    dispatch(getTickets({ phoneNumber: search, skip, take }));
  }, [search, skip, take, dispatch]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  // fetch fanbands for ticket items
  useAsyncAction(getFanbands(), isEmpty(tickets));

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box flexGrow={1} overflow="auto" height="0">
        <Grid container>
          <Grid item xs={12}>
            <OutlinedInput
              placeholder="Search by phone number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              onKeyDown={handleKeyDown}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          {tickets.map((ticket, idx) => (
            <Grid item key={idx} xs={12}>
              <TicketItem data={ticket} py={2} />
              {idx < tickets.length - 1 && <Divider />}
            </Grid>
          ))}
        </Grid>
      </Box>
      {paginator}
    </Box>
  );
};

export default TicketTable;
