import { forwardRef, useEffect, useMemo } from "react";
import { mergeRefs } from "react-merge-refs";

import { Grid, Box, BoxProps } from "@/common/components/atoms";
import AppNavbar from "@/common/components/objects/AppNavBar/v2";
import Banner from "@/common/components/objects/Banner";
import useInfoCraterDialog from "@/common/components/objects/InfoDialogCrater/provider";

import { useBaseLayout } from "./provider";

type IBaseLayoutProps = BoxProps & {
  aside?: React.ReactNode;
};

const BaseLayout = forwardRef<HTMLDivElement, IBaseLayoutProps>(
  ({ aside, children, ...rest }, ref) => {
    const { scrollRef } = useBaseLayout();
    const { dialogRef } = useInfoCraterDialog();
    const gridTemplateAreas = useMemo(() => {
      if (aside) {
        return [
          `
          "navbar"
          "content"
        `,
          `
          "navbar navbar"
          "banner banner"
          "aside content"
        `,
        ];
      }

      return [
        `
        "navbar"
        "content"
      `,
      ];
    }, [aside]);

    const gridTemplateColumns = useMemo(() => {
      if (aside) {
        return ["minmax(0, 1fr)", "max-content minmax(0, 1fr)"];
      }

      return ["minmax(0, 1fr)"];
    }, [aside]);

    useEffect(() => {
      if (typeof window === "undefined") return;

      function onResize(): void {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, []);

    return (
      <Grid>
        <Grid
          gridTemplateAreas={gridTemplateAreas}
          h="calc(var(--vh, 1vh) * 100)"
          gridTemplateColumns={gridTemplateColumns}
          gridTemplateRows={["max-content 1fr", "max-content max-content 1fr"]}
          overflow="hidden"
        >
          <AppNavbar />
          {aside && <Box gridArea="aside">{aside}</Box>}
          <Banner
            content="Letter to the Crater Community"
            onClickLink={() => {
              dialogRef.current?.showModal();
            }}
          />
          <Box
            gridArea="content"
            {...rest}
            ref={mergeRefs([scrollRef, ref])}
            as="main"
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    );
  }
);

BaseLayout.displayName = "BaseLayout";

BaseLayout.defaultProps = {
  aside: undefined,
};

export default BaseLayout;
