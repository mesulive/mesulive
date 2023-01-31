import { MultiProvider, WithEmotionProps } from "@mesulive/shared";
import {
  ComponentType,
  createContext,
  ReactNode,
  useMemo,
  useState,
} from "react";

export interface IModalAction {
  openModal: (target?: HTMLElement) => void;
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
  const [open, setOpen] = useState(false);

  const actions = useMemo<IModalAction>(
    () => ({
      openModal: (target?: HTMLElement) => {
        setOpen(true);
        if (target) {
          setAnchorEl(target);
        }
      },
      closeModal: () => {
        setOpen(false);
        setAnchorEl(null);
      },
    }),
    []
  );

  const values = useMemo<IModalValue>(
    () => ({
      anchorEl,
      open: open || !!anchorEl,
    }),
    [anchorEl, open]
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

export const withModalProvider =
  <T,>(Component: ComponentType<WithEmotionProps<T>>) =>
  (props: WithEmotionProps<T>) =>
    (
      <ModalProvider>
        <Component {...props} />
      </ModalProvider>
    );
