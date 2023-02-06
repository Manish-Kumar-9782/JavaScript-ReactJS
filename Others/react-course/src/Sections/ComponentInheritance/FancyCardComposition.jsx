import React from "react";
import FancyCard from "./FancyCard";
import UserAvatar from "./UserAvatar";
import UserAvatarGroup from "./UserAvatarGroup";
import userlogo1 from "../../Images/users/532666.jpg";
import userlogo2 from "../../Images/users/551903.jpg";
import userlogo3 from "../../Images/users/657079 (1).jpg";
import userlogo4 from "../../Images/users/cropped-1366-768-600255.jpg";
const FancyCardComposition = () => {
  return (
    <div>
      <FancyCard
        title="Fancy Card"
        description="this is a fancy card that can be used to display a
        fancy title and description"
        author="Manish Kumar"
      >
        <UserAvatarGroup>
          <UserAvatar src={userlogo1} pos={0} />
          <UserAvatar src={userlogo2} pos={1} />
          <UserAvatar src={userlogo3} pos={2} />
          <UserAvatar src={userlogo4} pos={3} />
        </UserAvatarGroup>
      </FancyCard>
    </div>
  );
};

export default FancyCardComposition;
