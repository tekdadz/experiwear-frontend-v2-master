import { FormControlLabel, Radio, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  label: {
    color: '#333',
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 16,
  },
  radio: ({ color, size = '1.5rem' }) => ({
    color: theme.palette[color].main,
    fontSize: size,
    '&.Mui-checked': {
      color: theme.palette[color].light,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 'inherit',
    },
  }),
}));

const ExpRadio = (props) => {
  const classes = useStyles(props);

  return (
    <FormControlLabel
      control={
        <Radio {...props} classes={{ root: classes.radio }} color="default" />
      }
      label={props.label}
      classes={{ label: classes.label }}
    />
  );
};

export default ExpRadio;
