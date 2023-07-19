import { CSSProperties } from 'react';
import {
  AlignItemsTypes,
  DisplayTypes,
  FlexDirectionTypes,
  JustifyContentTypes,
  PositionTypes,
  ResponsiveSizeTypes,
} from '../../types/style';

export interface LayoutProps {
  display?: DisplayTypes;
  flexDirection?: FlexDirectionTypes;
  justifyContent?: JustifyContentTypes;
  alignItems?: AlignItemsTypes;
  position?: PositionTypes;
  margin?: string;
  padding?: string;
  xs?: ResponsiveSizeTypes;
  sm?: ResponsiveSizeTypes;
  md?: ResponsiveSizeTypes;
  lg?: ResponsiveSizeTypes;
  xl?: ResponsiveSizeTypes;
  children: React.ReactNode;
  ow?: CSSProperties;
}
