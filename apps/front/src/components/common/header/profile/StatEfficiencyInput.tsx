import { PrimaryStat, PrimaryStatInfoMap } from "~/lib/maple/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProfileState } from "~/lib/profile/states";
import { NumberTextField } from "@mesulive/ui";

interface Props {
  stat: PrimaryStat;
}

export const StatEfficiencyInput = ({ stat }: Props) => {
  const username = useRecoilValue(ProfileState.currentUsernameAtom) ?? "";
  const [statEfficiency, setStateEfficiency] = useRecoilState(
    ProfileState.statEfficiencySelectors({ username, key: stat })
  );

  if (!username) return null;

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
