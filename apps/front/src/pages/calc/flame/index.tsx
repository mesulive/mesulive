import { Flex, PageTitle } from "@mesulive/ui";
import { Box } from "@mui/material";
import { GlobalProvider } from "~/components/common/context/GlobalProvider";
import { MultiProvider } from "~/components/common/context/MultiProvider";
import { ResultSection } from "~/components/flame/calc/result/ResultSection";
import { SettingSection } from "~/components/flame/calc/setting";
import { Flame } from "~/lib/flame";
import { FlowProvider } from "~/lib/flow/flowProvider";

const Home = () => {
  return (
    <MultiProvider
      // eslint-disable-next-line react/jsx-key
      providers={[<GlobalProvider scope={Flame.PAGE_KEY} />, <FlowProvider />]}
    >
      <Flex gap={16}>
        <Box>
          <PageTitle>환생의 불꽃 기댓값 계산기</PageTitle>
        </Box>
        <SettingSection />
        <ResultSection />
      </Flex>
    </MultiProvider>
  );
};

export default Home;
