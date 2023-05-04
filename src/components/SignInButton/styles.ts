import { styled } from "@/styles/stitches.config";

export const ButtonContainer = styled("button", {
  all: "unset",
  backgroundColor: "$gray600",
  padding: "$2 $6",
  borderRadius: "$full",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$2",

  cursor: "pointer",
  transition: "opacity 0.5s ease-out",

  "&:hover": {
    opacity: 0.8,
  },
});
