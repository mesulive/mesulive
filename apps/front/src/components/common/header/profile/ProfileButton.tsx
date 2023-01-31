import { PASTEL_LIGHTNESS } from "@mesulive/shared";
import { COLORS, DefaultProfile, Flex, sx } from "@mesulive/ui";
import { ArrowDropDown } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Color from "color";
import { useContext } from "react";
import { useRecoilValue } from "recoil";
import {
  ModalActionContext,
  withModalProvider,
} from "~/components/common/context/ModalProvider";
import { ProfileSettingPopover } from "~/components/common/header/profile/ProfileSettingPopover";
import { ProfileState } from "~/lib/profile/states";

export const ProfileButton = withModalProvider(() => {
  const currentUsername = useRecoilValue(ProfileState.currentUsernameAtom);
  const profile = useRecoilValue(ProfileState.profileAtoms(currentUsername));

  const { openModal } = useContext(ModalActionContext);

  return (
    <>
      <Button
        sx={styles.button}
        onClick={({ currentTarget }) => {
          openModal(currentTarget);
        }}
      >
        <Flex direction="row" align="center" sx={styles.flex}>
          <DefaultProfile
            sx={styles.icon}
            color={
              currentUsername
                ? profile.profileColor
                : Color.hsl(0, 0, PASTEL_LIGHTNESS).toString()
            }
          />
          <Typography sx={styles.usernameTypo}>
            {currentUsername ?? "(설정안함)"}
          </Typography>
          <ArrowDropDown sx={styles.icon} />
        </Flex>
      </Button>
      <ProfileSettingPopover />
    </>
  );
});

const styles = {
  button: sx({
    color: COLORS.GRAY_1,

    "&:hover": {
      backgroundColor: COLORS.GRAY_7,
    },
    "& .MuiTouchRipple-root": {
      color: COLORS.GRAY_5,
    },
  }),
  flex: sx({
    gap: 8,
  }),
  usernameTypo: sx((theme) => ({
    fontSize: 12,
    width: 64,

    [theme.breakpoints.up("tablet")]: {
      fontSize: 14,
      width: 84,
    },
  })),
  icon: sx((theme) => ({
    width: 24,
    height: 24,
    borderRadius: "8px",

    [theme.breakpoints.up("tablet")]: {
      width: 32,
      height: 32,
    },
  })),
};
