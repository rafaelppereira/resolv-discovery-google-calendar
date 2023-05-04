import { GoogleChromeLogo } from "phosphor-react";
import { ButtonContainer } from "./styles";
import { signIn } from "next-auth/react";

export function SignInButton() {
  async function handleConnectCalendar() {
    await signIn("google");
  }

  return (
    <ButtonContainer onClick={handleConnectCalendar}>
      <GoogleChromeLogo /> Entrar no Google
    </ButtonContainer>
  );
}
