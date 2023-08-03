import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import ImageUploading from 'react-images-uploading';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    color: '#d5d5dc',
    fontFamiliy: theme.custom.fonts.SFUITextRegular,
    fontSize: 12,
    marginBottom: theme.spacing(1),
  },
  uploadZone: {
    width: (props) => props.width,
    height: (props) => props.height,
    borderRadius: 14,
    border: 'dashed 2px #eaeef4',
    fontFamily: theme.custom.fonts.SFProTextBold,
    fontSize: 12,
    color: '#74809d',
    padding: '31px 12px',
    lineHeight: 'normal',
    textAlign: 'center',
    marginRight: 21,
    marginBottom: 21,
    cursor: 'pointer',
  },
  plusPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: (props) => props.width,
    height: (props) => props.height,
    borderRadius: 14,
    border: 'dashed 3px #00748c',
    fontFamily: theme.custom.fonts.SFProTextBold,
    fontSize: 30,
    color: '#00748c',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
    marginBottom: 21,
  },
  plusPanelDisabled: {
    opacity: 0.2,
    pointerEvents: 'none',
  },
  browse: {
    color: theme.palette.info.main,
  },
  dragging: {},
  previewZone: {
    width: (props) => props.width,
    height: (props) => props.height,
    marginRight: 21,
    marginBottom: 21,
  },
  previewImage: {
    width: (props) => props.width,
    height: (props) => props.height,
    objectFit: 'contain',
  },
}));

const ImageList = ({
  label,
  className,
  dataURLKey = 'url',
  images,
  onChange,
  width = 80,
  height = 160,
  maxNumber = 8,
  ...boxProps
}) => {
  const classes = useStyles({ width, height });

  const DnDPanel = ({ onImageUpload, isDragging, dragProps }) => (
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
        <>
          Drag a <br /> file here <br /> or <br />
          <span className={classes.browse}>browse</span>
          <br />
          for a file <br />
          to <br /> upload.
        </>
      )}
    </div>
  );

  return (
    <Box className={className} {...boxProps}>
      {label && <Typography className={classes.label}>{label}</Typography>}
      <ImageUploading
        multiple
        maxNumber={maxNumber}
        value={images ? images : []}
        onChange={onChange}
        dataURLKey={dataURLKey}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          isDragging,
          dragProps,
        }) => (
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
              <DnDPanel
                onImageUpload={onImageUpload}
                isDragging={isDragging}
                dragProps={dragProps}
              />
            )}
            {imageList.length < maxNumber && (
              <div
                className={clsx(classes.plusPanel, {
                  [classes.plusPanelDisabled]: !imageList.length,
                })}
                onClick={onImageUpload}
              >
                +
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </Box>
  );
};

export default memo(ImageList);
