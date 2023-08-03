import { Tab, Tabs, Card, CardContent } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import { useState } from 'react';
import { TicketTable, TicketForm, TicketUpload } from 'components';
import { useDispatch } from 'react-redux';
import { insertTicket } from 'redux/actions/tickets';

const Tickets = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('tab-table');

  const handleSubmit = async (data) => {
    await dispatch(insertTicket(data));
  };

  return (
    <Card>
      <CardContent>
        <Tabs value={tab} onChange={(e, t) => setTab(t)}>
          <Tab value="tab-table" label="TICKETS" />
          <Tab value="tab-create" label="NEW TICKETS" />
          <Tab value="tab-upload" label="UPLOAD TICKETS" />
        </Tabs>
        <TabContext value={tab}>
          <TabPanel value="tab-table">
            <TicketTable />
          </TabPanel>
          <TabPanel value="tab-create">
            <TicketForm onSubmit={handleSubmit} />
          </TabPanel>
          <TabPanel value="tab-upload">
            <TicketUpload />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
};

export default Tickets;
