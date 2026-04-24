import DashBoardLayout from "../../Layout/DashBoardLayout";

import UserStats from "../../components/user/UserStats";

const User = () => {
  return (
    <DashBoardLayout>
      
      <div className="flex-1">
        <UserStats />
      </div>

      

    </DashBoardLayout>
  );
};

export default User;