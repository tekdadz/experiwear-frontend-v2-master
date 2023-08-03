import { FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    color: '#333',
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 16,
  },
  checkbox: ({ color, size = '1.5rem' }) => ({
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

const ExpCheckbox = (props) => {
  const classes = useStyles(props);

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          classes={{ root: classes.checkbox }}
          color="default"
        />
      }
      label={props.label}
      classes={{ label: classes.label }}
    />
  );
};

export default ExpCheckbox;
