import type { TConstructorItems } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  price: number;
  orderModalData: {
    number: number;
  } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
