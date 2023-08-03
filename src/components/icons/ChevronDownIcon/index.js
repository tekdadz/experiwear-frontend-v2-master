import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 13,
  },
}));

const ChevronDownIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 13 8'}
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
          transform="translate(-235.000000, -182.000000)"
          stroke="#606060"
          strokeWidth="2"
        >
          <g id="Dashboard" transform="translate(24.000000, 166.098361)">
            <g id="chevron-down" transform="translate(212.000000, 16.639344)">
              <polyline
                id="Path"
                points="0 0.262295082 5.5 6.26229508 11 0.262295082"
              ></polyline>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default memo(ChevronDownIcon);
