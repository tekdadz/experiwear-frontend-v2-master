import React, { useCallback, useState } from 'react';
import {
  Box,
  Dialog,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
} from '@material-ui/core';
import { FilePicker } from 'components';
import { useDispatch } from 'react-redux';
import { uploadTicketsFromCsv } from 'services/api-tickets';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { setResponseError } from 'redux/actions';
import { usePagination } from 'hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontFamily: theme.custom.fonts.SFProTextSemibold,
    color: '#1e2022',
    marginBottom: 29,
  },
  progressDialog: {
    width: 460,
    border: 'none !important',
    padding: 34,
    backgroundColor: '#444444',
    borderRadius: '4px !important',
    boxShadow: '0 17px 25px 4px rgba(0, 0, 0, 0.11) !important',
  },
  progress: {
    width: '100%',
    backgroundColor: '#868686',
  },
  fileName: {
    margin: '5px 0 0 0',
    color: '#fff',
    fontSize: 13,
    float: 'left',
  },
  closeButton: {
    margin: '-7px -12px -12px -12px',
    color: '#fff',
    fontSize: 16,
    float: 'right',
  },
  bold: {
    fontFamily: theme.custom.fonts.SFProTextSemibold,
    fontSize: 14,
    color: '#000',
  },
  link: {
    color: theme.palette.info.main,
    fontSize: 14,
    textDecoration: 'underline',
  },
}));

const TicketRow = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={4}>
        <p className={classes.bold}>Barcode</p>
        <p className={classes.link}>{data.barcode}</p>
      </Grid>
      <Grid item xs={8} container>
        <Grid item xs={2}>
          <p className={classes.bold}>Section</p>
          <p>{data.section}</p>
        </Grid>
        <Grid item xs={2}>
          <p className={classes.bold}>Row</p>
          <p>{data.row}</p>
        </Grid>
        <Grid item xs={2}>
          <p className={classes.bold}>Seat</p>
          <p>{data.seat}</p>
        </Grid>
        <Grid item xs={3}>
          <p className={classes.bold}>Order</p>
          <p>{data.order}</p>
        </Grid>
        <Grid item xs={3}>
          <p className={classes.bold}>Fanband</p>
          <p>Not assigned</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

const TicketUpload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadingStarted, setUploadingStarted] = useState(false);
  const [file, setFileToUpload] = useState();
  const [uploadedTickets, setUploadedTickets] = useState([]);
  const [cancelToken, setCancelToken] = useState();
  const { paginator, pageRows } = usePagination({ rows: uploadedTickets });

  const handleFiles = useCallback(
    async (files) => {
      const file = files[0];
      setFileToUpload(file);
      setUploadingStarted(true);

      const ctoken = axios.CancelToken.source();
      setCancelToken(ctoken);

      try {
        const uploadedTickets = await uploadTicketsFromCsv(
          file,
          (e) => {
            const prog = !e.total ? 0 : Math.floor((100 * e.loaded) / e.total);
            setUploadingProgress(prog);
          },
          ctoken.token
        );
        setUploadedTickets(uploadedTickets);
      } catch (e) {
        dispatch(setResponseError(e.response));
      }

      setUploadingProgress(0);
      setUploadingStarted(false);
    },
    [dispatch]
  );

  const handleCancelUploading = useCallback(() => {
    cancelToken.cancel();
  }, [cancelToken]);

  return uploadedTickets.length ? (
    <Box display="flex" flexDirection="column" height="100%">
      <p className={classes.label}>Tickets uploaded successfully</p>
      <Box flexGrow={1} height="0px" overflow="auto" mb={2}>
        <Grid container>
          {pageRows.map((ticket, idx) => (
            <Grid item key={idx} xs={12}>
              <TicketRow data={ticket} mb="12px" />
              {idx < pageRows.length - 1 && <Divider />}
            </Grid>
          ))}
        </Grid>
      </Box>
      {paginator}
    </Box>
  ) : (
    <div className={classes.root}>
      <p className={classes.label}>Bulk upload tickets from excel file</p>
      <FilePicker onChange={handleFiles} />
      <Dialog
        open={uploadingStarted}
        classes={{ paper: classes.progressDialog }}
      >
        <LinearProgress
          variant="determinate"
          value={uploadingProgress}
          className={classes.progress}
        />
        <Box>
          <p className={classes.fileName}>{file?.name}</p>
          <IconButton
            className={classes.closeButton}
            onClick={handleCancelUploading}
          >
            <CloseIcon fontSize="inherit" color="inherit" />
          </IconButton>
        </Box>
      </Dialog>
    </div>
  );
};

export default TicketUpload;
