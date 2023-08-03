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

const AlertSurveyIcon = ({ className, viewBox, ...rest }) => {
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
          transform="translate(-1404.000000, -1128.000000)"
        >
          <g id="Activity-Card" transform="translate(1381.000000, 891.000000)">
            <g id="list-3" transform="translate(23.000000, 227.000000)">
              <g
                id="Survey-Alert-Icon"
                transform="translate(0.000000, 10.000000)"
              >
                <circle
                  id="Oval"
                  fill="#28C76F"
                  cx="19.5"
                  cy="19.5"
                  r="19.5"
                ></circle>
                <g
                  id="check"
                  transform="translate(12.000000, 14.000000)"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <polyline id="Path" points="16 0 5 11 0 6"></polyline>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default memo(AlertSurveyIcon);
