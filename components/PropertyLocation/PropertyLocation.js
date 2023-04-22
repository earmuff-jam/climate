import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledAccordion = styled(Accordion)({
  width: '40%',
  margin: '0 auto',
  borderRadius: '20px',
  backgroundColor: '#f5f5f5',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '& .MuiAccordionSummary-expandIcon': {
    color: '#000000',
  },
});

const StyledAccordionDetails = styled(AccordionDetails)({
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  padding: '16px',
});

const PropertyLocation = () => {
  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Item 1</Typography>
        <Typography>+$10</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Typography>
          This is the details of item 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur
          leo sit amet blandit mattis. Nulla facilisi. Donec placerat ipsum eu est malesuada, ut suscipit ex
          ullamcorper.
        </Typography>
      </StyledAccordionDetails>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Item 2</Typography>
        <Typography>+$20</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Typography>
          This is the details of item 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur
          leo sit amet blandit mattis. Nulla facilisi. Donec placerat ipsum eu est malesuada, ut suscipit ex
          ullamcorper.
        </Typography>
      </StyledAccordionDetails>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Item 3</Typography>
        <Typography>+$30</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Typography>
          This is the details of item 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur
          leo sit amet blandit mattis. Nulla facilisi. Donec placerat ipsum eu est malesuada, ut suscipit ex
          ullamcorper.
        </Typography>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
}

export default PropertyLocation;
