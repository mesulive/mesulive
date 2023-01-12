import { Flex, SectionBox, SectionTitle, sx } from "@mesulive/ui";
import { Box } from "@mui/material";
import { AimStatInput } from "~/components/flame/calc/setting/AimStatInput";
import { BossDropCheckbox } from "~/components/flame/calc/setting/BossDropCheckbox";
import { EquipLevelInput } from "~/components/flame/calc/setting/EquipLevelInput";
import { EquipTypeSelect } from "~/components/flame/calc/setting/EquipTypeSelect";
import { MethodSelect } from "~/components/flame/calc/setting/MethodSelect";
import { WeaponGradeSelect } from "~/components/flame/calc/setting/WeaponGradeSelect";

export const SettingSection = () => {
  return (
    <SectionBox gap={16}>
      <SectionTitle>설정</SectionTitle>
      <Box sx={styles.inputContainer}>
        <EquipTypeSelect />
        <BossDropCheckbox />
        <EquipLevelInput />
        <MethodSelect />
        <Flex direction="row" sx={{ gridColumn: "1 / 3" }} gap={16}>
          <WeaponGradeSelect sx={{ flex: 1 }} />
          <AimStatInput sx={{ flex: 1 }} />
        </Flex>
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
