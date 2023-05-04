import { ProfileAvatar, ProfileContainer, ProfileTitle } from "./styles";

interface ProfileProps {
  name: any;
  email: any;
  avatar: any;
}

export function Profile({ name, email, avatar }: ProfileProps) {
  return (
    <ProfileContainer>
      <ProfileAvatar src={avatar} alt={name} />
      <ProfileTitle>
        <h3>{name}</h3>
        <span>{email}</span>
      </ProfileTitle>
    </ProfileContainer>
  );
}
