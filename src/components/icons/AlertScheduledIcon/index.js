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

const AlertScheduledIcon = ({ className, viewBox, ...rest }) => {
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
          transform="translate(-1404.000000, -1044.000000)"
        >
          <g id="Activity-Card" transform="translate(1381.000000, 891.000000)">
            <g id="list-2" transform="translate(23.000000, 143.000000)">
              <g
                id="Scheduled-Alert-Icon"
                transform="translate(0.000000, 10.000000)"
              >
                <circle
                  id="Oval"
                  fill="#FF9F43"
                  cx="19.5"
                  cy="19.5"
                  r="19.5"
                ></circle>
                <g
                  id="info-"
                  transform="translate(11.000000, 11.000000)"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <circle id="Oval" cx="9" cy="9" r="9"></circle>
                  <line x1="9.5" y1="13" x2="9.5" y2="9" id="Path"></line>
                  <line x1="9.5" y1="5.5" x2="9.5" y2="5.5" id="Path"></line>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default memo(AlertScheduledIcon);
