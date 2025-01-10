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
  // Mock Data - Recent Update Requests
  const updateRequests = [
    { form: "Academic Profile", updatedFields: 3, status: "Pending" },
    { form: "Personal Profile", updatedFields: 5, status: "Approved" },
    { form: "Academic Profile", updatedFields: 2, status: "Rejected" },
    { form: "Personal Profile", updatedFields: 1, status: "Pending" },
    { form: "Academic Profile", updatedFields: 4, status: "Approved" },
  ];

  // Take only the most recent request for each form (using the last occurrence in the list)
  const recentUpdates = updateRequests.reduce((acc, request) => {
    if (
      !acc[request.form] ||
      acc[request.form].updatedFields < request.updatedFields
    ) {
      acc[request.form] = request;
    }
    return acc;
  }, {} as Record<string, { form: string; updatedFields: number; status: string }>);

  // Convert to an array of the most recent updates for rendering
  const recentUpdatesList = Object.values(recentUpdates);

  return (
    <div className="space-y-6">
      <DashboardBanner name={"Marvin"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnnouncementsCard />
        <Card>
          <CardHeader>
            <CardTitle>Recent Update Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {recentUpdatesList.length === 0 ? (
              <div className="flex items-center justify-center min-h-[200px] text-center text-sm text-gray-500">
                No recent updates
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form Name</TableHead>
                    <TableHead>Fields Updated</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUpdatesList.map((request) => (
                    <TableRow key={request.form}>
                      <TableCell>{request.form}</TableCell>
                      <TableCell>{request.updatedFields}</TableCell>
                      <TableCell>{request.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
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
