import { Box, Popover } from "@mui/material";
import { useContext } from "react";
import {
  ModalActionContext,
  ModalValueContext,
} from "~/components/common/context/ModalProvider";
import { PrimaryStat } from "~/lib/maple/types";
import { values } from "lodash";
import { StatEfficiencyInput } from "~/components/common/header/profile/StatEfficiencyInput";

export const ProfileSettingPopover = () => {
  const { open, anchorEl } = useContext(ModalValueContext);
  const { closeModal } = useContext(ModalActionContext);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={closeModal}
      PaperProps={{
        sx: {
          maxHeight: 300,
          overflowY: "auto",
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(40%, auto))",
          gap: 16,
        }}
      >
        {values(PrimaryStat.enum).map((stat) => (
          <StatEfficiencyInput stat={stat} key={stat} />
        ))}
      </Box>
    </Popover>
  );
};
