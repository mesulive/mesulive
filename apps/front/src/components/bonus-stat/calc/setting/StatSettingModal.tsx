import { values } from "@mesulive/shared";
import {
  Box,
  Dialog,
  DialogContent,
  Popover,
  PopoverProps,
} from "@mui/material";
import { useContext } from "react";
import {
  ModalActionContext,
  ModalValueContext,
} from "~/components/common/context/ModalProvider";
import { StatEfficiencyInput } from "~/components/common/header/profile/StatEfficiencyInput";
import { PrimaryStat } from "~/lib/maple/types";

// TODO ProfileButton 사용하게 되면 이 파일 삭제

interface StatSettingPopoverProps
  extends Omit<PopoverProps, "open" | "anchorEl" | "onClose"> {}

export const StatSettingContent = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 16,
    }}
  >
    {values(PrimaryStat.enum).map((stat) => (
      <StatEfficiencyInput stat={stat} key={stat} />
    ))}
  </Box>
);

export const StatSettingPopover = ({ ...props }: StatSettingPopoverProps) => {
  const { closeModal } = useContext(ModalActionContext);
  const { open, anchorEl } = useContext(ModalValueContext);
  return (
    <Popover open={open} onClose={closeModal} anchorEl={anchorEl} {...props}>
      <StatSettingContent />
    </Popover>
  );
};

export const StatSettingDialog = () => {
  const { closeModal } = useContext(ModalActionContext);
  const { open } = useContext(ModalValueContext);

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogContent>
        <StatSettingContent />
      </DialogContent>
    </Dialog>
  );
};
