import { PrimaryStat, PrimaryStatInfoMap } from "~/lib/maple/types";
import { useRecoilState } from "recoil";
import { ProfileState } from "~/lib/profile/states";
import { NumberTextField } from "@mesulive/ui";

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
      value={statEfficiency}
      onNumberChange={setStateEfficiency}
      helperText=""
      label={PrimaryStatInfoMap[stat].text}
      max={999}
    />
  );
};
