import { SectionBox, SectionTitle, sx } from "@mesulive/ui";
import { Box } from "@mui/material";
import { AimStatInput } from "~/components/bonus-stat/calc/setting/AimStatInput";
import { BossDropCheckbox } from "~/components/bonus-stat/calc/setting/BossDropCheckbox";
import { CalculateConvertedStatButton } from "~/components/bonus-stat/calc/setting/CalculateConvertedStatButton";
import { EquipLevelInput } from "~/components/bonus-stat/calc/setting/EquipLevelInput";
import { EquipTypeSelect } from "~/components/bonus-stat/calc/setting/EquipTypeSelect";
import { StatSettingButton } from "~/components/bonus-stat/calc/setting/StatSettingButton";
import { WeaponGradeSelect } from "~/components/bonus-stat/calc/setting/WeaponGradeSelect";

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
      <CalculateConvertedStatButton />
    </SectionBox>
  );
};

const styles = {
  inputContainer: sx({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16,

    "& > *:nth-of-type(2n+1):nth-last-of-type(1)": {
      gridColumn: "span 2",
    },
  }),
  weaponTypeSelect: sx({
    gridColumn: "2 / 3",
  }),
};
