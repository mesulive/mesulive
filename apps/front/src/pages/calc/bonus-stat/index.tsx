import { Flex, PageTitle } from "@mesulive/ui";
import { Box } from "@mui/material";
import Head from "next/head";
import { CalculateConvertedStatSection } from "~/components/bonus-stat/calc/calculate-converted-stat";
import { ResultSection } from "~/components/bonus-stat/calc/result";
import { SettingSection } from "~/components/bonus-stat/calc/setting";
import { GlobalProvider } from "~/components/common/context/GlobalProvider";
import { MultiProvider } from "~/components/common/context/MultiProvider";
import { PageContainer, SectionContainer } from "~/components/common/layout";
import { BonusStat } from "~/lib/bonus-stat";
import { FlowProvider } from "~/lib/flow/flowProvider";

const BonusStatCalc = () => {
  return (
    <>
      <Head>
        <title>메이플스토리 추가옵션 계산기</title>
        <meta name="description" content="메이플스토리 추가옵션 계산기" />
        <meta property="og:title" content="메이플스토리 추가옵션 계산기" />
        <meta
          property="og:description"
          content="메이플스토리 추가옵션 계산기"
        />
        <meta
          name="keyword"
          content="메이플, 환불, 추옵, 계산기, 시뮬, 시뮬레이터"
        />
      </Head>
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
    </>
  );
};

export default BonusStatCalc;
