import { BoldTypes, ColorTypes, TypographyTypes } from '../../types/style';

export interface TypographyProps {
  type: TypographyTypes;
  color?: ColorTypes;
  bold?: BoldTypes;
  margin?: string;
  children: React.ReactNode;
  textAlign?: 'left' | 'right' | 'center';
}
