import { ProfileButton } from "@mesulive/front/src/components/common/header/profile/ProfileButton";
import { ProfileState } from "@mesulive/front/src/lib/profile/states";
import { ComponentMeta } from "@storybook/react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const meta: ComponentMeta<typeof ProfileButton> = {
  title: "Organism/ProfileButton",
  component: ProfileButton,
};

export default meta;

export const NoUsername = () => <ProfileButton />;

export const WithUsername = () => {
  const setUsername = useSetRecoilState(ProfileState.currentUsernameAtom);

  useEffect(() => {
    setUsername("쿠라테");
  }, [setUsername]);

  return <ProfileButton />;
};
