import { COLORS, NumberTextField } from "@mesulive/ui";
import Color from "color";
import { useRecoilState } from "recoil";
import { PrimaryStat, PrimaryStatInfoMap } from "~/lib/maple/types";
import { ProfileState } from "~/lib/profile/states";

interface Props {
  stat: PrimaryStat;
}

// TODO ProfileButton 사용하게 되면 주석 되살리기

export const StatEfficiencyInput = ({ stat }: Props) => {
  // const username = useRecoilValue(ProfileState.currentUsernameAtom) ?? "";
  const [statEfficiency, setStateEfficiency] = useRecoilState(
    ProfileState.statEfficiencySelectors({ username: "", key: stat })
  );

  // if (!username) return null;

  return (
    <NumberTextField
      variant="filled"
      value={statEfficiency}
      onNumberChange={setStateEfficiency}
      helperText=""
      label={PrimaryStatInfoMap[stat].text}
      max={999}
      maxFractionDigits={4}
      sx={{
        ...(statEfficiency !== undefined &&
          statEfficiency !== 0 && {
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
