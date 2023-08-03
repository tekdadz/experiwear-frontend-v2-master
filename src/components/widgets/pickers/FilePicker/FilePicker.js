import React from 'react';
import { makeStyles } from '@material-ui/core';
import { CloudIcon } from 'components';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 14,
    border: 'dashed 2px #01a1c3',
    color: theme.palette.info.main,
    padding: '24px 50px',
  },
  dragDrop: {
    textAlign: 'center',
    color: '#43434a',
    fontSize: 18,
    '&>span': {
      color: theme.palette.info.main,
    },
  },
}));

const FilePicker = ({ onChange }) => {
  const classes = useStyles();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onChange,
  });

  return (
    <div {...getRootProps()} className={classes.root}>
      <input {...getInputProps()} />
      <CloudIcon />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className={classes.dragDrop}>
          Drag and drop here <br />
          or <br />
          <span>browse</span>
        </p>
      )}
    </div>
  );
};

export default FilePicker;
