import { Image } from "@chakra-ui/react";
import React from "react";

const DummyAvatar = ({ src, boxSize, alt, rounded }) => {
  return (
    <Image
      borderRadius={rounded ? "full" : "none"}
      boxSize={boxSize || "150px"}
      src={src || "https://cdn-icons-png.flaticon.com/512/921/921130.png"}
      alt={alt || "Dummy Icon"}
      cursor="pointer"
    />
  );
};

export default DummyAvatar;
