import { DialogTitleWithCloseButton, ScreenType } from "@mesulive/ui";
import { Button, Dialog, DialogContent } from "@mui/material";
import { useContext } from "react";
import { CalculateConvertedStatContent } from "~/components/bonus-stat/calc/calculate-converted-stat/CalculateConvertedStatContent";
import {
  ModalActionContext,
  ModalValueContext,
  withModalProvider,
} from "~/components/common/context/ModalProvider";
import { useScreenType } from "~/lib/hooks/window";

export const CalculateConvertedStatButton = withModalProvider(() => {
  const { openModal } = useContext(ModalActionContext);
  const screenType = useScreenType();

  if (screenType >= ScreenType.laptop) {
    return null;
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          openModal();
        }}
        sx={(theme) => ({
          [theme.breakpoints.up("laptop")]: {
            display: "none",
          },
        })}
      >
        스탯 환산치 계산
      </Button>
      <CalculateConvertedStatDialog />
    </>
  );
});

const CalculateConvertedStatDialog = () => {
  const { open } = useContext(ModalValueContext);
  const { closeModal } = useContext(ModalActionContext);

  return (
    <Dialog open={open}>
      <DialogTitleWithCloseButton onClose={closeModal}>
        스탯 환산치 계산
      </DialogTitleWithCloseButton>
      <DialogContent>
        <CalculateConvertedStatContent />
      </DialogContent>
    </Dialog>
  );
};
