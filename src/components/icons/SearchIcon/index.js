import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 20,
  },
}));

const SearchIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 20 20'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g
        id="Welcome"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          id="Fanband-Hawks-Dashboard"
          transform="translate(-1622.000000, -47.000000)"
          stroke="#606060"
          strokeWidth="2"
        >
          <g id="Navbar" transform="translate(314.000000, 23.000000)">
            <g id="search" transform="translate(1309.000000, 25.000000)">
              <circle id="Oval" cx="8" cy="8" r="8"></circle>
              <line x1="18" y1="18" x2="13.65" y2="13.65" id="Path"></line>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default memo(SearchIcon);
