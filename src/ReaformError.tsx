import { Ref } from './Ref';

export interface ReaformErrorProps {
  propKey: string;
  reaformRef: Ref<any> | undefined;
  children?: React.ReactNode;
}

export const ReaformError = ({
  propKey,
  reaformRef,
  children,
}: ReaformErrorProps & React.PropsWithChildren<any>) => {
  if (reaformRef?.validation[propKey] && reaformRef?.touched[propKey]) {
    return children || null;
  } else {
    return null;
  }
};
