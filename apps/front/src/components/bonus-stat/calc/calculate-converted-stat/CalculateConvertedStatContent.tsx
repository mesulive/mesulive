import { COLORS, Flex, NumberTextField } from "@mesulive/ui";
import { Box, Typography } from "@mui/material";
import Color from "color";
import { values } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { BonusStat } from "~/lib/bonus-stat";
import { BonusStatState } from "~/lib/bonus-stat/state";
import { PrimaryStat, PrimaryStatInfoMap } from "~/lib/maple/types";
import { setMaxFractionDigits } from "~/lib/math/util";
import { ProfileState } from "~/lib/profile/states";

export const CalculateConvertedStatContent = () => (
  <Flex direction="column" gap={16}>
    <CalculatedStat />
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
          <ActualStatInput stat={stat} key={stat} />
        ))}
    </Box>
  </Flex>
);

const CalculatedStat = () => {
  const calculatedStatFigure = useRecoilValue(
    BonusStatState.calculatedStatFigureSelector
  );

  return (
    <Flex direction="row" align="end" gap={4} justify="center">
      <Typography
        sx={{
          color: COLORS.MAIN_LIGHT,
          lineHeight: "normal",
          fontSize: 36,
          fontWeight: "bold",
        }}
      >
        {setMaxFractionDigits(4)(calculatedStatFigure)}
      </Typography>
      <Typography sx={{ fontWeight: 600, color: COLORS.GRAY_3, mb: 2 }}>
        급
      </Typography>
    </Flex>
  );
};

interface ActualStatInputProps {
  stat: PrimaryStat;
}

const ActualStatInput = ({ stat }: ActualStatInputProps) => {
  const [actualStat, setActualStat] = useRecoilState(
    BonusStatState.actualStatFigureAtoms(stat)
  );
  const statValuable = useRecoilValue(ProfileState.statValuableSelectors(stat));

  return (
    <NumberTextField
      variant="filled"
      value={actualStat}
      onNumberChange={setActualStat}
      helperText=""
      label={PrimaryStatInfoMap[stat].text}
      max={999}
      maxFractionDigits={4}
      sx={{
        ...(statValuable && {
          "& .MuiFilledInput-root": {
            backgroundColor: COLORS.MAIN_LIGHTER,

            "&:hover": {
              backgroundColor: Color(COLORS.MAIN_LIGHTER)
                .darken(0.05)
                .toString(),
            },
          },
          "& .MuiInputLabel-root": {
            color: COLORS.MAIN,
          },
        }),
      }}
    />
  );
};
