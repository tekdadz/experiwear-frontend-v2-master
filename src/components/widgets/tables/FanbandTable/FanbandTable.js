import { Grid, Divider } from '@material-ui/core';
import { FanbandItem } from 'components';

const FanbandTable = ({ fanbands = [] }) => {
  return (
    <Grid container spacing={3}>
      {fanbands.map((fanband, idx) => (
        <Grid item key={idx} xs={12}>
          <FanbandItem data={fanband} mb={3} />
          {idx < fanbands.length - 1 && <Divider />}
        </Grid>
      ))}
    </Grid>
  );
};

export default FanbandTable;
