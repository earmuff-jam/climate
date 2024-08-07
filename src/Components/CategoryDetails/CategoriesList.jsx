import { Box, Container } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import { AddRounded } from '@mui/icons-material';
import CategoryDetails from './CategoryDetails';
import { useState } from 'react';
import SimpleModal from '../../util/SimpleModal';
import AddCategory from '../AddCategory/AddCategory';

const CategoriesList = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const handleAddCategory = () => setDisplayModal(!displayModal);

  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="xl">
        <HeaderWithButton
          title="Categories"
          primaryButtonTextLabel="Add Category"
          primaryStartIcon={<AddRounded />}
          handleClickPrimaryButton={handleAddCategory}
          showRedirectLink={false}
          secondaryTitle="Select total items in each category(s) to view all associated items"
        />
        <CategoryDetails />
        {displayModal && (
          <SimpleModal title="Add New Category" handleClose={() => setDisplayModal(false)}>
            <AddCategory handleCloseAddCategory={() => setDisplayModal(false)} />
          </SimpleModal>
        )}
      </Container>
    </Box>
  );
};

export default CategoriesList;
