import { DialogTitle } from "@mui/material";
import { ReactNode } from "react";
import { Flex } from "../box";
import { DIALOG_HEADER_HEIGHT } from "./constant";
import { DialogCloseButton, DialogCloseButtonProps } from "./DialogCloseButton";

export interface DialogTitleWithCloseButtonProps
  extends DialogCloseButtonProps {
  children?: ReactNode;
}

export const DialogTitleWithCloseButton = ({
  children,
  onClose,
}: DialogTitleWithCloseButtonProps) => (
  <Flex sx={{ position: "relative", height: DIALOG_HEADER_HEIGHT }}>
    <DialogTitle sx={{ height: "100%" }}>
      {children}
      <DialogCloseButton
        onClose={onClose}
        sx={{
          position: "absolute",
          right: 0,
          height: DIALOG_HEADER_HEIGHT,
          width: DIALOG_HEADER_HEIGHT,
          p: 4,
        }}
      />
    </DialogTitle>
  </Flex>
);
