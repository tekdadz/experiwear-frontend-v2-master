import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import ImageUploading from 'react-images-uploading';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  label: {
    color: '#d5d5dc',
    fontFamiliy: theme.custom.fonts.SFUITextRegular,
    fontSize: 12,
    marginBottom: theme.spacing(1),
  },
  uploadZone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: (props) => props.width,
    height: (props) => props.height,
    borderRadius: 14,
    border: 'dashed 2px #eaeef4',
    fontFamily: theme.custom.fonts.SFProTextBold,
    fontSize: 16,
    color: '#74809d',
    padding: 50,
  },
  browse: {
    color: theme.palette.info.main,
  },
  dragging: {},
  previewZone: {
    width: (props) => props.width,
    height: (props) => props.height,
  },
  previewImage: {
    width: 'auto',
    height: (props) => props.height,
  },
}));

const ExpImageField = ({
  label,
  className,
  dataURLKey = 'url',
  image,
  onChange,
  width = 350,
  height = 160,
  ...boxProps
}) => {
  const classes = useStyles({ width, height });

  return (
    <Box className={clsx(classes.root, className)} {...boxProps}>
      <Typography className={classes.label}>{label}</Typography>
      <ImageUploading
        value={image ? [image] : []}
        onChange={(imgList) => onChange(imgList[0])}
        dataURLKey={dataURLKey}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className={classes.root}>
            {imageList.length ? (
              imageList.map((image, index) => (
                <div
                  key={index}
                  className={classes.previewZone}
                  onClick={() => onImageUpdate(index)}
                >
                  <img
                    src={image[dataURLKey]}
                    className={classes.previewImage}
                  />
                </div>
              ))
            ) : (
              <div
                className={clsx(classes.uploadZone, {
                  [classes.dragging]: isDragging,
                })}
                onClick={onImageUpload}
                {...dragProps}
              >
                {isDragging ? (
                  <span>Drop file here.</span>
                ) : (
                  <span>
                    Drag a file here or
                    <span className={classes.browse}>&nbsp;browse&nbsp;</span>
                    for a file to upload.
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </Box>
  );
};

export default memo(ExpImageField);
