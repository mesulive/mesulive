import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DialogStory } from "~/stories/atoms/DialogStory";

const meta: ComponentMeta<typeof DialogStory> = {
  title: "atom/Dialog",
  component: DialogStory,
};

export default meta;

const Template: ComponentStory<typeof DialogStory> = ({
  title = "타이틀",
  description = "근로조건의 기준은 인간의 존엄성을 보장하도록 법률로 정한다.\n이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다.\n법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다.\n국회의 폐회중에도 또한 같다.\n" +
    "국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다.\n누구든지 체포 또는 구속의 이유와 변호인의 조력을 받을 권리가 있음을 고지받지 아니하고는 체포 또는 구속을 당하지 아니한다.\n체포 또는 구속을 당한 자의 가족등 법률이 정하는 자에게는 그 이유와 일시·장소가 지체없이 통지되어야 한다.",
}) => <DialogStory title={title} description={description} />;

export const Default = Template.bind({});
Default.args = {};
