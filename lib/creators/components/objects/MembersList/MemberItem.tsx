import DEFAULT_IMAGE from "public/images/img_default_avatar.png";
import { useState } from "react";

import Image from "next/image";

import { Flex, Box, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { theme } from "@/common/theme";

import ConnectModal from "../ConnectModal";

export type IMemberItemProps = {
  image?: string;
  name?: string;
};

const { space } = theme;

export function MemberItem({ name, image }: IMemberItemProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const src = !image || image === null ? DEFAULT_IMAGE : image;
  return (
    <>
      <ConnectModal
        name={name}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
      <Flex flexDirection="column" alignItems="center">
        <Box
          overflow="hidden"
          h={150}
          w={150}
          position="relative"
          borderRadius="50%"
          mb={space.xxs}
        >
          <Image
            objectFit="cover"
            layout="fill"
            src={src as string}
            alt="user"
          />
        </Box>
        {name && (
          <Text textAlign="center" textStyle="title">
            {name}
          </Text>
        )}
        <Text mb={space.xxs} textAlign="center">
          Founder
        </Text>
        <Button
          variant="nav-button"
          text="Connect"
          onClick={() => setShowModal(true)}
        />
      </Flex>
    </>
  );
}
