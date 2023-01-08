import { ComponentMeta } from "@storybook/react";
import { ProfileButton } from "@mesulive/front/src/components/common/header/profile/ProfileButton";
import { useSetRecoilState } from "recoil";
import { ProfileState } from "@mesulive/front/src/lib/profile/states";
import { useEffect } from "react";

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
