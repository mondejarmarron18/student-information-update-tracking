import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Link } from "react-router";

const TrendingDiscussionsCard = () => {
  const discussions = [
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

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Trending Discussions</CardTitle>
      </CardHeader>
      <CardContent>
        {discussions.length === 0 ? (
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
              {discussions.map((discussion) => (
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
  );
};

export default TrendingDiscussionsCard;
