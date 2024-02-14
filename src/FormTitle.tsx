import { Typography, TypographyProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface Props {
  color?: TypographyProps['color'];
  fontWeight?: TypographyProps['fontWeight'];
}

const FormTitle: FC<PropsWithChildren<Props>> = props => (
  <Typography
    fontWeight={props.fontWeight ?? 'bold'}
    variant='subtitle1'
    color={props.color ?? 'primary'}
  >
    {props.children}
  </Typography>
);

export default FormTitle;
