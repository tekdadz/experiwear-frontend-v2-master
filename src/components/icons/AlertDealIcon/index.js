import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 39,
    height: 39,
  },
}));

const AlertDealIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 39 39'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g
        id="Welcome"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Fanband-Hawks-Dashboard"
          transform="translate(-1404.000000, -960.000000)"
        >
          <g id="Activity-Card" transform="translate(1381.000000, 891.000000)">
            <g id="list-1" transform="translate(23.000000, 59.000000)">
              <g
                id="Deal-Alert-icon"
                transform="translate(0.000000, 10.000000)"
              >
                <circle
                  id="Oval"
                  fill="#7E72F2"
                  cx="19.5"
                  cy="19.5"
                  r="19.5"
                ></circle>
                <g
                  id="plus"
                  transform="translate(13.000000, 13.000000)"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <line x1="7" y1="0" x2="7" y2="14" id="Path"></line>
                  <line x1="0" y1="7" x2="14" y2="7" id="Path"></line>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default memo(AlertDealIcon);
