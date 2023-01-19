import { SectionBox, SectionTitle, sx } from "@mesulive/ui";
import { Box } from "@mui/material";
import { AimStatInput } from "~/components/flame/calc/setting/AimStatInput";
import { BossDropCheckbox } from "~/components/flame/calc/setting/BossDropCheckbox";
import { EquipLevelInput } from "~/components/flame/calc/setting/EquipLevelInput";
import { EquipTypeSelect } from "~/components/flame/calc/setting/EquipTypeSelect";
import { StatSettingButton } from "~/components/flame/calc/setting/StatSettingButton";
import { WeaponGradeSelect } from "~/components/flame/calc/setting/WeaponGradeSelect";

export const SettingSection = () => {
  return (
    <SectionBox>
      <SectionTitle>설정</SectionTitle>
      <Box sx={styles.inputContainer}>
        <EquipTypeSelect />
        <BossDropCheckbox />
        <EquipLevelInput />
        <WeaponGradeSelect />
        <AimStatInput />
      </Box>
      <StatSettingButton />
    </SectionBox>
  );
};

const styles = {
  inputContainer: sx({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16,

    "& > *:nth-child(2n+1):nth-last-of-type(1)": {
      gridColumn: "span 2",
    },
  }),
  weaponTypeSelect: sx({
    gridColumn: "2 / 3",
  }),
};
