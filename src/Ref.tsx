import { ChangeEvent } from 'react';

export interface Ref<I> {
  values: Record<keyof I, any>;
  touched: Record<keyof I, boolean>;
  validation: Record<keyof I, string | undefined>;
  valid: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
  onTouched: (event: ChangeEvent<HTMLInputElement>) => any;
}
