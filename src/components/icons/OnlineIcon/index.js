import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 62,
    height: 62,
  },
}));

const OnlineIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 62 62'}
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
          transform="translate(-1146.000000, -145.000000)"
        >
          <g
            id="Subscribers-Card"
            transform="translate(1113.895908, 120.000000)"
          >
            <g id="online" transform="translate(32.104092, 25.000000)">
              <circle id="Oval" fill="#DEFBD1" cx="31" cy="31" r="31"></circle>
              <g
                id="users"
                transform="translate(17.000000, 20.000000)"
                stroke="#00920F"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path
                  d="M20,22 L20,19.6666667 C20,17.0893378 17.7614237,15 15,15 L5,15 C2.23857625,15 0,17.0893378 0,19.6666667 L0,22"
                  id="Path"
                ></path>
                <circle id="Oval" cx="10" cy="5" r="5"></circle>
                <path
                  d="M28,22 L28,19.6149915 C27.9981871,17.4411966 26.3533317,15.5434483 24,15"
                  id="Path"
                ></path>
                <path
                  d="M19,0 C21.3537328,0.526261689 23,2.3783123 23,4.5 C23,6.6216877 21.3537328,8.47373831 19,9"
                  id="Path"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default memo(OnlineIcon);
