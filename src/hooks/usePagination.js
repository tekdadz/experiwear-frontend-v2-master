import React, { useEffect } from 'react';
import { TablePagination } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setLoadingStatus } from 'redux/actions';

const usePagination = ({ count = 0, action = null, rows = [] }) => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const skip = React.useMemo(() => page * rowsPerPage, [page, rowsPerPage]);
  const pageRows = React.useMemo(
    () => rows.slice(skip, skip + rowsPerPage),
    [skip, rowsPerPage, rows]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (action) {
      (async () => {
        dispatch(setLoadingStatus(true));
        await dispatch(action({ skip, take: rowsPerPage }));
        dispatch(setLoadingStatus(false));
      })();
    }
  }, [dispatch, action, skip, rowsPerPage]);

  const paginator = React.useMemo(
    () => (
      <TablePagination
        component="div"
        count={rows.length || count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    ),
    [page, rowsPerPage, count, rows]
  );

  return { paginator, pageRows, page, rowsPerPage, skip, take: rowsPerPage };
};

export default usePagination;
