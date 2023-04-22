import React from "react";
import Button from "../Button/Button";
import { useRouter } from "next/router";

function BackButton({ css, children }) {
  const router = useRouter();
  return (
    <Button css={css} onClick={() => router.back()}>
      {children ? children : "← Back"}
    </Button>
  );
}

export default BackButton;
