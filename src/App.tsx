import { ThemeProvider } from '@emotion/react';
import { Button, createTheme } from '@mui/material';
import { FC, useState } from 'react';
import FileUploadForm from './FileUploadForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000435',
    },
    secondary: {
      main: '#8B8000',
    },
    success: {
      main: '#00FF00',
    },
  },
});

const App: FC = () => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant='contained' onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        <FileUploadForm open={modalOpen} setOpen={setModalOpen} />
      </div>
    </ThemeProvider>
  );
};

export default App;
