import DashboardBanner from "@/components/common/DashboardBanner";
import AnnouncementsCard from "@/components/common/AnnouncementsCard";
import UpdateRequestsCard from "@/components/common/UpdateRequestsCard";
import AnnualUpdateRequestsCard from "@/components/common/AnnualUpdateRequestsCard";
import MonthlyUpdateRequestsCard from "@/components/common/MonthlyUpdateRequestsCard";
import TrendingDiscussionsCard from "@/components/common/TrendingDiscussionsCard";
import RecentMessagesCard from "@/components/common/RecentMessagesCard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardBanner name={"Marvin"} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnnualUpdateRequestsCard />
        <MonthlyUpdateRequestsCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnnouncementsCard />
        <UpdateRequestsCard />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TrendingDiscussionsCard />
        <RecentMessagesCard />
      </div> */}
    </div>
  );
};

export default Dashboard;
