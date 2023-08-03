import { Grid, Divider } from '@material-ui/core';
import { QuickPollSampleItem } from 'components';

const QuickPollSampleTable = ({ answers = [] }) => {
  return (
    <Grid container>
      {answers.map((answer, idx) => (
        <Grid item key={idx} xs={12}>
          <QuickPollSampleItem data={answer} my={2} />
          {idx < answers.length - 1 && <Divider />}
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickPollSampleTable;
