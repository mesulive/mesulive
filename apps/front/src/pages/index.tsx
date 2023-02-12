import { COLORS, Flex, SectionBox } from "@mesulive/ui";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Character from "~/assets/character.png";
import Cube from "~/assets/cube.svg";
import Flame from "~/assets/flame.svg";
import Logo from "~/assets/logo.svg";
import RebootIcon from "~/assets/reboot-icon.png";
import Star from "~/assets/star.svg";
import {
  MainLinkButton,
  MainLinkButtonProps,
} from "~/components/common/button";
import { PageContainer } from "~/components/common/layout";

const LinkButtonPropsList: MainLinkButtonProps[] = [
  {
    color: COLORS.SECONDARY,
    text: "추가옵션 기댓값 계산기",
    subText: "NEW",
    Icon: Flame,
    link: "/calc/bonus-stat",
  },
  {
    color: "#E89002",
    text: "큐브 기댓값 계산기",
    subText: "큐브매수통",
    Icon: Cube,
    external: true,
    link: "https://cubemesu.co",
  },
  {
    color: COLORS.MAIN,
    text: "스타포스 시뮬레이터",
    subText: "점검 중",
    disabled: true,
    Icon: Star,
    external: true,
    link: "https://classic.mesu.live/sim/starforce",
    target: "_self",
  },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>메수라이브 - 메이플 시뮬레이터, 계산기</title>
        <meta
          name="description"
          content="메수라이브, 각종 메이플 시뮬레이터와 기댓값 계산기"
        />
        <meta
          property="og:title"
          content="메수라이브 - 메이플 시뮬레이터, 계산기"
        />
        <meta
          property="og:description"
          content="메수라이브, 각종 메이플 시뮬레이터와 기댓값 계산기"
        />
        <meta
          name="keyword"
          content="메이플스토리, 환불, 계산기, 시뮬, 시뮬레이터, 큐브, 큐브매수통, 메수라이브, 추옵"
        />
      </Head>
      <PageContainer>
        <SectionBox gap={0}>
          <Flex
            sx={(theme) => ({
              height: 32,
              [theme.breakpoints.up("laptop")]: {
                height: 48,
              },
            })}
          >
            <Logo css={{ height: "inherit" }} />
          </Flex>
          <Typography
            sx={(theme) => ({
              textAlign: "center",
              color: COLORS.GRAY_3,
              fontSize: 12,
              mt: 4,
              [theme.breakpoints.up("laptop")]: {
                fontSize: 14,
              },
            })}
          >
            메이플스토리의 각종 확률형 시스템에 대한 기댓값 계산기와 시뮬레이션
            웹서비스입니다.
            <br />
            문의는 help@mesu.live로 부탁드립니다.
          </Typography>
          <Box
            sx={(theme) => ({
              mt: 16,
              display: "grid",
              gridTemplateColumns: "repeat(1fr)",
              gap: 16,

              [theme.breakpoints.up("tablet")]: {
                gridTemplateRows: "repeat(2, 1fr)",
                gridTemplateColumns: "repeat(2, 1fr)",
                "& > *:nth-of-type(2n+1):nth-last-of-type(1)": {
                  gridColumn: "span 2",
                },
              },
            })}
          >
            {LinkButtonPropsList.map((props, i) => (
              <MainLinkButton {...props} key={i} />
            ))}
          </Box>
          <Flex direction="column" align="center" sx={{ mt: 16 }}>
            <a
              href="https://maple.gg/u/%EC%BF%A0%EB%9D%BC%ED%85%8C"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={Character} alt="쿠라테" />
              <Flex direction="row" align="center">
                <Typography sx={{ fontSize: 13 }}>제작자: 쿠라테</Typography>
                <Image
                  src={RebootIcon}
                  alt="reboot-icon"
                  css={{ marginLeft: 4 }}
                />
              </Flex>
            </a>
          </Flex>
        </SectionBox>
      </PageContainer>
    </>
  );
};

export default Home;
