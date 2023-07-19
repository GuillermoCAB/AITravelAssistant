export interface ButtonProps {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'regular' | 'large';
  disabled?: boolean;
  variant?: 'solid' | 'outlined';
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}