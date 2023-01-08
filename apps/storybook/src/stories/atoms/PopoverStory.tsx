import { useState } from "react";
import { Button, Popover, PopoverProps, Typography } from "@mui/material";
import { SectionTitle } from "@mesulive/ui";

export interface PopoverStoryProps
  extends Pick<PopoverProps, "anchorOrigin" | "transformOrigin"> {}

export const PopoverStory = ({
  anchorOrigin,
  transformOrigin,
}: PopoverStoryProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;

  return (
    <>
      <Button
        variant="contained"
        onClick={({ currentTarget }) => {
          setAnchorEl(currentTarget);
        }}
      >
        팝업 열기
      </Button>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <SectionTitle>로렘 잎숨</SectionTitle>
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {`각급 선거관리위원회는 선거인명부의 작성등 선거사무와 국민투표사무에 관하여 관계 행정기관에 필요한 지시를 할 수 있다. 정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여 정당운영에 필요한 자금을 보조할 수 있다.

모든 국민의 재산권은 보장된다. 그 내용과 한계는 법률로 정한다. 대한민국의 국민이 되는 요건은 법률로 정한다. 헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는 헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이 있어야 한다.`}
        </Typography>
      </Popover>
    </>
  );
};
