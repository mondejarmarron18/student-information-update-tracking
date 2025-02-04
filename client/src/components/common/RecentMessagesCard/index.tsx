import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentMessagesCard = () => {
  return (
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
  );
};

export default RecentMessagesCard;
