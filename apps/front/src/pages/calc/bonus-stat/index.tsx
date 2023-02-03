import { Flex, PageTitle } from "@mesulive/ui";
import { Box } from "@mui/material";
import { CalculateConvertedStatSection } from "~/components/bonus-stat/calc/calculate-converted-stat";
import { ResultSection } from "~/components/bonus-stat/calc/result";
import { SettingSection } from "~/components/bonus-stat/calc/setting";
import { GlobalProvider } from "~/components/common/context/GlobalProvider";
import { MultiProvider } from "~/components/common/context/MultiProvider";
import { PageContainer, SectionContainer } from "~/components/common/layout";
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
      <PageContainer>
        <Box>
          <PageTitle>추가옵션 기댓값 계산기</PageTitle>
        </Box>
        <SectionContainer>
          <Flex direction="column" gap={16}>
            <SettingSection />
            <CalculateConvertedStatSection />
          </Flex>
          <ResultSection />
        </SectionContainer>
      </PageContainer>
    </MultiProvider>
  );
};

export default Home;
