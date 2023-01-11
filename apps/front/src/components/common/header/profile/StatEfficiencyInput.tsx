import { PrimaryStat, PrimaryStatInfoMap } from "~/lib/maple/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProfileState } from "~/lib/profile/states";
import { NumberTextField } from "@mesulive/ui";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

interface Props {
  stat: PrimaryStat;
}

const MAX_INPUT = 999;

export const StatEfficiencyInput = ({ stat }: Props) => {
  const username = useRecoilValue(ProfileState.currentUsernameAtom) ?? "";
  const [statEfficiency, setStateEfficiency] = useRecoilState(
    ProfileState.statEfficiencySelectors({ username, key: stat })
  );

  if (!username) return null;

  return (
    <NumberTextField
      value={statEfficiency}
      onChange={({ target: { value } }) => {
        pipe(
          value,
          O.fromPredicate((v) => !!v),
          O.map(Number),
          O.filter((v) => !Number.isNaN(v)),
          O.filter((v) => v <= MAX_INPUT),
          O.toUndefined,
          setStateEfficiency
        );
      }}
      helperText=""
      label={PrimaryStatInfoMap[stat].text}
    />
  );
};
