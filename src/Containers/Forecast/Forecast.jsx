import { Box, Container, Stack, Tab, Tabs } from '@mui/material';
// import HeaderWithButton from '../../util/HeaderWithButton';
import Categories from '../../Components/CategoryDetails/Categories';
import { useState } from 'react';
import CategoryFrequency from '../../Components/ForecastTabs/CategoryFrequency';
import LowItems from '../../Components/ForecastTabs/LowItems';

const Forecast = () => {
  const [tabVal, setTabVal] = useState('one');
  const handleChange = (_, newVal) => setTabVal(newVal);

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing="1rem">
          <HeaderWithButton
            title="Forecast"
            showSecondaryTitle={true}
            showRedirectLink={true}
            redirectTo="/inventories/categories/list"
            secondaryTitle="Create or update categories"
          />
          <Categories />
          <Box sx={{ width: '100%' }}>
            <Tabs value={tabVal} onChange={handleChange} indicatorColor="secondary">
              <Tab value="one" label="Setup thresholds" sx={{ textTransform: 'none' }} />
              <Tab value="two" label="Low on stock" sx={{ textTransform: 'none' }} />
            </Tabs>
          </Box>
          {getContentFromTabs(tabVal)}
        </Stack>
      </Container>
    </Box>
  );
};

/**
 * fn to render the content
 * @param {string} tabVal - the tab value
 */
const getContentFromTabs = (tabVal) => {
  switch (tabVal) {
    case 'one': {
      return <CategoryFrequency />;
    }
    case 'two': {
      return <LowItems />;
    }
    default:
      return null;
  }
};

export default Forecast;
