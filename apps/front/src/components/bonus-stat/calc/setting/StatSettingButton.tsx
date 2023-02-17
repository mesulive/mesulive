import { DialogTitleWithCloseButton, LightButton } from "@mesulive/ui";
import { Box, Dialog, DialogContent } from "@mui/material";
import { values } from "lodash";
import { useContext } from "react";
import {
  ModalActionContext,
  ModalValueContext,
  withModalProvider,
} from "~/components/common/context/ModalProvider";
import { StatEfficiencyInput } from "~/components/common/header/profile/StatEfficiencyInput";
import { BonusStat } from "~/lib/bonus-stat";
import { PrimaryStat } from "~/lib/maple/types";

export const StatSettingButton = withModalProvider(() => {
  const { openModal } = useContext(ModalActionContext);

  return (
    <>
      <LightButton
        variant="contained"
        onClick={({ currentTarget }) => {
          openModal(currentTarget);
        }}
      >
        스탯 효율 입력
      </LightButton>
      <StatSettingDialog />
    </>
  );
});

export const StatSettingContent = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 16,
    }}
  >
    {values(PrimaryStat.enum)
      .filter((stat) =>
        values(BonusStat.OptionStatMap).some((statArr) =>
          statArr.some((s) => s === stat)
        )
      )
      .map((stat) => (
        <StatEfficiencyInput stat={stat} key={stat} />
      ))}
  </Box>
);

export const StatSettingDialog = () => {
  const { closeModal } = useContext(ModalActionContext);
  const { open } = useContext(ModalValueContext);

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitleWithCloseButton onClose={closeModal}>
        스탯 효율
      </DialogTitleWithCloseButton>
      <DialogContent>
        <StatSettingContent />
      </DialogContent>
    </Dialog>
  );
};
