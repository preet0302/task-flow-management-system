import SideBar from "../common/SideBar";


const DashBoardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <SideBar />

      {/* Right Content */}
     <div className="flex flex-1 bg-black text-white">
        {children}
      </div>

    </div>
  );
};

export default DashBoardLayout;