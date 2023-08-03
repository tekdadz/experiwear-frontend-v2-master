import fonts from './fonts';

export default {
  MuiCssBaseline: {
    '@global': {
      '@font-face': fonts,
    },
  },
  MuiCard: {
    root: {
      borderRadius: 8,
      minHeight: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  MuiCardHeader: {
    root: {
      padding: '48px 25px 0px 25px',
    },
    title: {
      display: 'inline-block',
      fontFamily: 'SFProDisplay-BlackItalic',
      fontSize: 16,
      fontWeight: 900,
      letterSpacing: 0.48,
      color: '#01a1c3',
      textTransform: 'uppercase',
    },
    subheader: {
      display: 'inline-block',
      float: 'right',
      color: '#9ea3ba',
      fontFamily: 'SFProText-Regular',
      fontSize: 14,
      letterSpacing: 0.42,
    },
  },
  MuiCardContent: {
    root: {
      padding: 32,
    },
  },
  MuiPaper: {
    root: {
      border: '1px solid #e0e1f2 !important',
      borderRadius: '20px !important',
      boxShadow: 'none !important',
    },
  },
  MuiInputBase: {
    input: {
      '&:-webkit-autofill': {
        boxShadow: '0 0 0 30px white inset !important;',
      },
    },
  },
  MuiTextField: {
    root: {
      '& label, & label.Mui-focused': {
        color: '#d5d5dc',
      },
      '& .MuiInput-underline::before': {
        borderBottomColor: '#d5d5dc',
      },
    },
  },
  MuiOutlinedInput: {
    input: {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  MuiButton: {
    root: {
      textTransform: 'none',
      fontSize: 16,
    },
  },
  MuiCheckbox: {
    colorPrimary: {
      color: '#01a1c3',
      '&.Mui-checked': {
        color: '#01a1c3',
      },
    },
  },
  MuiFormControlLabel: {
    label: {
      fontSize: 14,
      color: '#696974',
      letterSpacing: 0.1,
      userSelect: 'none',
    },
  },
  MuiContainer: {
    root: {
      minHeight: '100%',
      display: 'flex',
    },
  },
  MuiTabs: {
    indicator: {
      backgroundColor: 'unset',
    },
  },
  MuiTab: {
    root: {
      fontFamily: 'SFProDisplay-BlackItalic',
      fontSize: 16,
    },
    textColorInherit: {
      color: '#01a1c3',
      opacity: 0.3,
    },
  },
};
