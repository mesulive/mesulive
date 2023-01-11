import {
  ComponentType,
  createContext,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { MultiProvider, WithEmotionProps } from "@mesulive/shared";

export interface IPopoverAction {
  openPopover: (target: HTMLElement) => void;
  closePopover: () => void;
}

export interface IPopoverValue {
  anchorEl: HTMLElement | null;
  open: boolean;
}

export const PopoverActionContext = createContext<IPopoverAction>({
  openPopover: () => {
    /* Do nothing */
  },
  closePopover: () => {
    /* Do nothing */
  },
});

export const PopoverValueContext = createContext<IPopoverValue>({
  anchorEl: null,
  open: false,
});

export const PopoverProvider = ({ children }: { children: ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const actions = useMemo<IPopoverAction>(
    () => ({
      openPopover: (target: HTMLElement) => {
        setAnchorEl(target);
      },
      closePopover: () => setAnchorEl(null),
    }),
    []
  );

  const values = useMemo<IPopoverValue>(
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
