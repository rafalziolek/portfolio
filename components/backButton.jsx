import { useRouter } from "next/router";
import { styled } from "../stitches.confing";

const Button = styled("button", {
  $$Background: "$gray00",
  $$Opacity: "0.8",
  border: "none",
  // boxShadow: "0 0 0 1px rgba(107,107,107,$$Opacity)",
  fontSize: "$caption",
  lineHeight: "$compact",
  fontWeight: "$heading",
  color: "rgba(0,0,0,1)",
  padding: "11px $4 13px $4",
  display: "block",
  textDecoration: "none",
  borderRadius: "$radius$pill",
  background: "rgba(225,225,225,0.40)",
  backdropFilter: "blur(35px)",
  display: "flex",
  gap: "$xs",
  alignItems: "center",
  "&:hover": {
    color: "$black",
    background: "white",
    boxShadow: "0 0 0 1px black",
    "&:before": {
      color: "black",
    },
  },
});

export default function BackButton({ children }) {
  const router = useRouter();

  return (
    <Button type="button" onClick={() => router.back()}>
      {children}
    </Button>
  );
}
