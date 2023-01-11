import { Box, Popover } from "@mui/material";
import { useContext } from "react";
import {
  PopoverActionContext,
  PopoverValueContext,
} from "~/components/common/context/PopoverProvider";
import { PrimaryStat } from "~/lib/maple/types";
import { values } from "@mesulive/shared";
import { StatEfficiencyInput } from "~/components/common/header/profile/StatEfficiencyInput";

export const ProfileSettingPopover = () => {
  const { open, anchorEl } = useContext(PopoverValueContext);
  const { closePopover } = useContext(PopoverActionContext);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={closePopover}
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
