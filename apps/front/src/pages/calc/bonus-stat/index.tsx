import { Flex, PageTitle } from "@mesulive/ui";
import { Box } from "@mui/material";
import { ResultSection } from "~/components/bonus-stat/calc/result/ResultSection";
import { SettingSection } from "~/components/bonus-stat/calc/setting";
import { GlobalProvider } from "~/components/common/context/GlobalProvider";
import { MultiProvider } from "~/components/common/context/MultiProvider";
import { BonusStat } from "~/lib/bonus-stat";
import { FlowProvider } from "~/lib/flow/flowProvider";

const Home = () => {
  return (
    <MultiProvider
      providers={[
        <GlobalProvider scope={BonusStat.PAGE_KEY} key="global" />,
        <FlowProvider key="flow" />,
      ]}
    >
      <Flex gap={16}>
        <Box>
          <PageTitle>추가옵션 기댓값 계산기</PageTitle>
        </Box>
        <SettingSection />
        <ResultSection />
      </Flex>
    </MultiProvider>
  );
};

export default Home;
