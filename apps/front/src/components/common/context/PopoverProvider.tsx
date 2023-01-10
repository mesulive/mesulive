import {
  ComponentType,
  createContext,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { MultiProvider, WithEmotionProps } from "@mesulive/shared";

export interface IPopoverAction {
  open: (target: HTMLElement) => void;
  close: () => void;
}

export interface IPopoverValue {
  anchorEl: HTMLElement | null;
  open: boolean;
}

export const PopoverActionContext = createContext<IPopoverAction>({
  open: () => {
    /* Do nothing */
  },
  close: () => {
    /* Do nothing */
  },
});

export const PopoverValueContext = createContext<IPopoverValue>({
  anchorEl: null,
  open: false,
});

export const PopoverProvider = ({ children }: { children: ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const actions = useMemo(
    () => ({
      open: (target: HTMLElement) => {
        setAnchorEl(target);
      },
      close: () => setAnchorEl(null),
    }),
    []
  );

  const values = useMemo(
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
        <PopoverActionContext.Provider value={actions} />,
        // eslint-disable-next-line react/jsx-key
        <PopoverValueContext.Provider value={values} />,
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
      <PopoverProvider>
        <Component {...props} />
      </PopoverProvider>
    );
