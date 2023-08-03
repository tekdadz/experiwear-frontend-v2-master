import { Tab, Tabs } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import { useMemo, useState } from 'react';
import { FHCard, FHCardHeader, FHCardContent, FanbandTable } from 'components';
import { FANBAND_LABELS, FANBAND_TYPES } from 'utils/constants';
import { useAsyncAction } from 'hooks';
import { getFanbands } from 'redux/actions';
import { useSelector } from 'react-redux';

const Fanbands = () => {
  const [tab, setTab] = useState(FANBAND_TYPES.provisioned);
  const fanbands = useSelector((state) => state.main.fanbands.results);
  const provisionedFanbands = useMemo(
    () => fanbands.filter((f) => f.phone),
    [fanbands]
  );
  const nonProvisionedFanbands = useMemo(
    () => fanbands.filter((f) => !f.phone),
    [fanbands]
  );

  useAsyncAction(getFanbands(), !fanbands.length);

  return (
    <FHCard>
      <FHCardHeader
        title={
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
            <Tab
              value={FANBAND_TYPES.provisioned}
              label={FANBAND_LABELS[FANBAND_TYPES.provisioned]}
            />
            <Tab
              value={FANBAND_TYPES.nonProvisioned}
              label={FANBAND_LABELS[FANBAND_TYPES.nonProvisioned]}
            />
            <Tab
              value={FANBAND_TYPES.all}
              label={FANBAND_LABELS[FANBAND_TYPES.all]}
            />
          </Tabs>
        }
      />
      <FHCardContent>
        <TabContext value={tab}>
          <TabPanel value={FANBAND_TYPES.provisioned}>
            <FanbandTable fanbands={provisionedFanbands} />
          </TabPanel>
          <TabPanel value={FANBAND_TYPES.nonProvisioned}>
            <FanbandTable fanbands={nonProvisionedFanbands} />
          </TabPanel>
          <TabPanel value={FANBAND_TYPES.all}>
            <FanbandTable fanbands={fanbands} />
          </TabPanel>
        </TabContext>
      </FHCardContent>
    </FHCard>
  );
};

export default Fanbands;
