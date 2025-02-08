import DashboardBanner from "@/components/common/DashboardBanner";
import AnnouncementsCard from "@/components/common/AnnouncementsCard";
import UpdateRequestsCard from "@/components/common/UpdateRequestsCard";
import UpdateRequestsPassedDaysPie from "@/components/common/UpdateRequestsPassedDaysPie";
import AnnualUpdateRequestsPassedMonthsBar from "@/components/common/AnnualUpdateRequestPassedMonthsBar";
// import TrendingDiscussionsCard from "@/components/common/TrendingDiscussionsCard";
// import RecentMessagesCard from "@/components/common/RecentMessagesCard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardBanner name={"Marvin"} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnnualUpdateRequestsPassedMonthsBar months={12} />
        <UpdateRequestsPassedDaysPie days={60} />
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
