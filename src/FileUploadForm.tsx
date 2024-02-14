import ArticleIcon from '@mui/icons-material/Article';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import styles from './FileUploadForm.module.scss';
import FormTitle from './FormTitle';
import createUploadTrigger from './createUploadTrigger';

type ClientSelect = 'Single' | 'Multiple';
type Clients = { title: string; clients?: string[] }[];

const IMPORT_NAMES = ['Import Name 1', 'Import Name 2'];
const CLIENT_SELECT_OPTIONS = ['Single', 'Multiple'];

// this would be a result from a api call im assuming
const CLIENTS: Clients = [
  {
    title: 'Testing Center 1',
    clients: ['Client A', 'Client B'],
  },
  {
    title: 'Testing Center 2',
    clients: ['Client C', 'Client D'],
  },
  {
    title: 'Testing Center 3',
  },
  {
    title: 'Testing Center 4',
  },
];

interface Props {
  open: boolean;
  setOpen: (value: boolean) => any;
}

const FileUploadForm: FC<Props> = props => {
  const [importName, setImportName] = useState<string>('');
  const [client, setClient] = useState<ClientSelect>('Multiple');
  const [socialDistance, setSocialDistance] = useState<boolean>(true);
  const [tolerance, setTolerance] = useState<boolean>(true);
  const [uploadSnackOpen, setUploadSnackOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const onFileUploadClick = createUploadTrigger(file => {
    setSelectedFile(file);
  });

  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
      <DialogTitle>
        <Typography color='primary' fontWeight='bold' className={styles.documentTitle} variant='h4'>
          Document Upload
        </Typography>
        <div className={styles.divider} />
      </DialogTitle>
      <DialogContent className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.leftPanel}>
            <TextField
              fullWidth
              select
              value={importName}
              size='small'
              label='Select Import Name'
              onChange={e => setImportName(e.target.value)}
            >
              {IMPORT_NAMES.map(v => (
                <MenuItem value={v} key={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
            <div className={styles.divider} />
            <FormTitle>Select a manifset that you'd like to import</FormTitle>
            <div className={styles.uploadBox}>
              <div className={styles.innerUploadBox}>
                <ArticleIcon color='secondary' />
                <Typography>
                  Drag & Drop Here Or{' '}
                  <Link fontWeight='bold' onClick={() => onFileUploadClick()}>
                    Browse
                  </Link>
                </Typography>
              </div>
              <Button onClick={() => setUploadSnackOpen(true)} variant='contained'>
                Upload Manifest
              </Button>
            </div>
            <div className={styles.divider} />
            {selectedFile ? (
              <>
                <div className={styles.uploadedFile}>
                  <ArticleIcon color='secondary' />
                  <Typography>{selectedFile.name}</Typography>
                </div>
                <div className={styles.divider} />
              </>
            ) : null}
            <FormTitle>Location Checking:</FormTitle>
            <FormTitle fontWeight='normal' color='green'>
              All Available!
            </FormTitle>
            <div className={styles.divider} />
            <FormTitle>Tolerance Window:</FormTitle>
            <div className={styles.toleranceWindowContainer}>
              <Switch value={tolerance} onChange={e => setTolerance(e.target.checked)} />
              <Typography>{`Toggle ${tolerance ? 'ON' : 'OFF'}`}</Typography>
            </div>
          </div>
          <div className={styles.widthGap} />

          <div className={styles.rightPanel}>
            <FormTitle>Split schedule using social distancing?</FormTitle>
            <RadioGroup
              value={`${socialDistance}`}
              onChange={e => setSocialDistance(e.target.value === 'true')}
              row
            >
              <FormControlLabel value={'true'} control={<Radio />} label='Yes' />
              <FormControlLabel value={'false'} control={<Radio />} label='No' />
            </RadioGroup>
            <div className={styles.divider} />
            <FormTitle>Location Checking:</FormTitle>
            <FormTitle fontWeight='normal' color='green'>
              All Available!
            </FormTitle>
            <div className={styles.divider} />
            <FormTitle>Client:</FormTitle>
            <RadioGroup
              value={client}
              onChange={e => setClient(e.target.value as ClientSelect)}
              row
            >
              {CLIENT_SELECT_OPTIONS.map(value => (
                <FormControlLabel value={value} control={<Radio />} label={value} />
              ))}
            </RadioGroup>
            {CLIENTS.map(v => (
              <div className={styles.clientItem}>
                <Typography>{v.title}</Typography>
                <TextField
                  select
                  value={importName}
                  size='small'
                  onChange={e => setImportName(e.target.value)}
                >
                  {(v.clients || []).map(v => (
                    <MenuItem value={v} key={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.errorMessage}>
          <FormTitle>Data in the import file is corret. Please press continue to import.</FormTitle>
        </div>
        <div className={styles.buttonContainer}>
          <Button fullWidth variant='contained' color='primary'>
            Continue Import
          </Button>
          <div className={styles.widthGap} />
          <Button fullWidth variant='outlined' color='secondary'>
            Cancel
          </Button>
        </div>
      </DialogContent>
      <Snackbar
        open={uploadSnackOpen}
        autoHideDuration={6000}
        onClose={() => setUploadSnackOpen(false)}
        message='Note archived'
      >
        <Alert severity='success' variant='filled' onClose={() => setUploadSnackOpen(false)}>
          Manifest uploaded
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default FileUploadForm;
