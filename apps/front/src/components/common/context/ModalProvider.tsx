import {
  ComponentType,
  createContext,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { MultiProvider, WithEmotionProps } from "@mesulive/shared";

export interface IModalAction {
  openModal: (target: HTMLElement | null) => void;
  closeModal: () => void;
}

export interface IModalValue {
  anchorEl: HTMLElement | null;
  open: boolean;
}

export const ModalActionContext = createContext<IModalAction>({
  openModal: () => {
    /* Do nothing */
  },
  closeModal: () => {
    /* Do nothing */
  },
});

export const ModalValueContext = createContext<IModalValue>({
  anchorEl: null,
  open: false,
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const actions = useMemo<IModalAction>(
    () => ({
      openModal: (target: HTMLElement | null) => {
        setAnchorEl(target);
      },
      closeModal: () => setAnchorEl(null),
    }),
    []
  );

  const values = useMemo<IModalValue>(
    () => ({
      anchorEl,
      open: !!anchorEl,
    }),
    [anchorEl]
  );

  return (
    <MultiProvider
      providers={[
        // eslint-disable-next-line react/jsx-key
        <ModalActionContext.Provider value={actions} />,
        // eslint-disable-next-line react/jsx-key
        <ModalValueContext.Provider value={values} />,
      ]}
    >
      {children}
    </MultiProvider>
  );
};

export const withPopoverProvider =
  <T,>(Component: ComponentType<WithEmotionProps<T>>) =>
  (props: WithEmotionProps<T>) =>
    (
      <ModalProvider>
        <Component {...props} />
      </ModalProvider>
    );
