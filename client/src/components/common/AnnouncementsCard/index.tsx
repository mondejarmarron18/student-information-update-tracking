import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCalendarAlt, FaInfoCircle, FaBell } from "react-icons/fa"; // Event, Info, and Reminder icons
import { useState } from "react";
import { cn } from "@/lib/utils";

type AnnouncementItem = {
  id: string;
  type: "event" | "info" | "reminder";
  message: string;
};

// Announcement Item Component
const AnnouncementItem = ({ type, message }: AnnouncementItem) => {
  let icon, iconColor;
  switch (type) {
    case "event":
      icon = <FaCalendarAlt className="w-4 h-4" />;
      iconColor = "text-blue-500";
      break;
    case "info":
      icon = <FaInfoCircle className="w-4 h-4" />;
      iconColor = "text-green-500";
      break;
    case "reminder":
      icon = <FaBell className="w-4 h-4" />;
      iconColor = "text-yellow-500";
      break;
    default:
      icon = <FaBell className="w-4 h-4" />;
      iconColor = "text-gray-500";
  }

  return (
    <div className={`flex items-center p-4 rounded-lg mb-2 bg-gray-500/15`}>
      <div className={cn("mr-3", iconColor)}>{icon}</div>
      <p className="text-sm flex-1">{message}</p>
    </div>
  );
};

// AnnouncementsCard Component
const AnnouncementsCard = () => {
  const [announcements] = useState<AnnouncementItem[]>([
    {
      id: "1",
      type: "event",
      message:
        "Join us for the Annual Tech Conference on January 20, 2025. Don't miss out!",
    },
    {
      id: "2",
      type: "info",
      message:
        "New course offerings for the spring semester have been published. Check your portal!",
    },
    {
      id: "3",
      type: "reminder",
      message:
        "Assignment deadline for 'Introduction to Coding' is approaching. Submit by January 10, 2025.",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        {announcements.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px] text-center text-sm text-gray-500">
            No announcements available
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <AnnouncementItem
                key={announcement.id}
                id={announcement.id}
                type={announcement.type}
                message={announcement.message}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnnouncementsCard;
