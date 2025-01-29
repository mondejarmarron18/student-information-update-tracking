import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardBanner from "@/components/common/DashboardBanner";
import AnnouncementsCard from "@/components/common/AnnouncementsCard";
import { Link } from "react-router";
import UpdateRequestsCard from "@/components/common/UpdateRequestsCard";

// Mock Data for Trending Discussions
const trendingDiscussions = [
  {
    id: 1,
    title: "How to prepare for midterm exams?",
    replies: 15,
    upvotes: 30,
    downvotes: 5,
  },
  {
    id: 2,
    title: "Best study techniques for finals",
    replies: 10,
    upvotes: 20,
    downvotes: 2,
  },
  {
    id: 3,
    title: "Are online courses effective?",
    replies: 8,
    upvotes: 25,
    downvotes: 8,
  },
  {
    id: 4,
    title: "New school events coming up",
    replies: 25,
    upvotes: 40,
    downvotes: 3,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardBanner name={"Marvin"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnnouncementsCard />
        <UpdateRequestsCard />
      </div>

      {/* Trending Discussions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="relative">
          <CardHeader>
            <CardTitle>Trending Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            {trendingDiscussions.length === 0 ? (
              <div className="flex items-center justify-center min-h-[200px] text-center text-sm text-gray-500">
                No trending discussions
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Replies</TableHead>
                    <TableHead>Upvotes</TableHead>
                    <TableHead>Downvotes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trendingDiscussions.map((discussion) => (
                    <TableRow key={discussion.id}>
                      <TableCell>
                        <Link
                          to={`/discussion/${discussion.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {discussion.title}
                        </Link>
                      </TableCell>
                      <TableCell>{discussion.replies}</TableCell>
                      <TableCell>{discussion.upvotes}</TableCell>
                      <TableCell>{discussion.downvotes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Message Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center min-h-[200px] text-center text-sm text-gray-500">
              No recent messages
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
