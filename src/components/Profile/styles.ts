import { styled } from "@/styles/stitches.config";

export const ProfileContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$6",
});

export const ProfileAvatar = styled("img", {
  width: 60,
  height: 60,
  borderRadius: "$full",
  border: "2px solid $gray200",
});

export const ProfileTitle = styled("div", {
  lineHeight: "$shorter",

  span: {
    fontSize: "$sm",
    opacity: 0.7,
  },
});
