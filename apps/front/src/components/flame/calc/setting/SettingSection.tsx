import { SectionBox, SectionTitle, sx } from "@mesulive/ui";
import { Box } from "@mui/material";
import { AimStatInput } from "~/components/flame/calc/setting/AimStatInput";
import { BossDropCheckbox } from "~/components/flame/calc/setting/BossDropCheckbox";
import { EquipLevelInput } from "~/components/flame/calc/setting/EquipLevelInput";
import { EquipTypeSelect } from "~/components/flame/calc/setting/EquipTypeSelect";
import { MethodSelect } from "~/components/flame/calc/setting/MethodSelect";
import { WeaponTypeSelect } from "~/components/flame/calc/setting/WeaponTypeSelect";

export const SettingSection = () => {
  return (
    <SectionBox gap={16}>
      <SectionTitle>설정</SectionTitle>
      <Box sx={styles.inputContainer}>
        <EquipTypeSelect />
        <WeaponTypeSelect />
        <MethodSelect />
        <EquipLevelInput />
        <AimStatInput />
        <BossDropCheckbox sx={{ mb: 20 }} />
      </Box>
    </SectionBox>
  );
};

const styles = {
  inputContainer: sx({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16,
  }),
  weaponTypeSelect: sx({
    gridColumn: "2 / 3",
  }),
};
