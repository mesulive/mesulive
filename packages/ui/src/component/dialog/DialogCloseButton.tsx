import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Sx } from "../../lib";

export interface DialogCloseButtonProps extends Sx {
  onClose?: () => void;
}

export const DialogCloseButton = ({
  onClose,
  sx: sxProp,
}: DialogCloseButtonProps) => (
  <IconButton sx={sxProp} onClick={onClose} color="grey">
    <CloseRounded sx={{ height: "100%", width: "100%" }} />
  </IconButton>
);
