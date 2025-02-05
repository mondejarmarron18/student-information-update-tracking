// import DatePicker from "@/components/common/DatePicker";
import AnnouncementDialog from "@/components/common/AnnouncementDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import _ from "lodash";
// import { useState } from "react";

const announcements = [
  {
    id: "1",
    type: "event",
    title: "Tech Conference",
    description:
      "Join us for the Annual Tech Conference on January 20, 2025. Don't miss out!",
    when: "January 20, 2025",
    link: {
      href: "#",
      text: "Learn More",
    },
  },
  {
    id: "2",
    type: "info",
    title: "New Course Offerings",
    message:
      "New course offerings for the spring semester have been published. Check your portal!",
    when: "January 10, 2025",
    link: {
      href: "#",
      text: "Learn More",
    },
  },
  {
    id: "3",
    type: "reminder",
    title: "Assignment Deadline",
    message:
      "Assignment deadline for 'Introduction to Coding' is approaching. Submit by January 10, 2025.",
    link: {
      href: "#",
      text: "Learn More",
    },
  },
];

const tabs = [
  {
    id: "announcements",
    title: "Announcements",
    announcements,
  },
  {
    id: "events",
    title: "Events",
    announcements: announcements.filter(({ type }) => type === "event"),
  },
  {
    id: "news",
    title: "News",
    announcements: announcements.filter(({ type }) => type === "news"),
  },
  {
    id: "reminders",
    title: "Reminders",
    announcements: announcements.filter(({ type }) => type === "reminder"),
  },
];

const Announcements = () => {
  //   const [dateFilter, setDateFilter] = useState<{
  //     startDate?: Date;
  //     endDate?: Date;
  //   }>();

  //   const handleOnChangeDateFilter = (
  //     name: "startDate" | "endDate",
  //     value?: Date
  //   ) => {
  //     setDateFilter((prev) => ({ ...prev, [name]: value }));
  //   };

  return (
    <div className="space-y-4">
      {/* <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <span>Filter by Date: </span>
          <DatePicker
            value={dateFilter?.startDate}
            onSelect={(value) => handleOnChangeDateFilter("startDate", value)}
            className="max-w-[200px]"
          />
          <span>to</span>
          <DatePicker
            value={dateFilter?.endDate}
            onSelect={(value) => handleOnChangeDateFilter("endDate", value)}
            className="max-w-[200px]"
            fromDate={dateFilter?.startDate}
          />
        </div>
        <Button>Add Announcement</Button>
      </div> */}
      <Tabs defaultValue="announcements" className="space-y-4">
        <div className="flex gap-2 flex-wrap justify-between">
          <TabsList>
            {tabs.map(({ id, title }) => (
              <TabsTrigger key={id} value={id}>
                {title}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnnouncementDialog trigger={<Button>Add Announcement</Button>} />
        </div>
        {tabs.map(({ id, announcements }) => (
          <TabsContent key={id} value={id} className="space-y-4">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription className="flex">
                      {_.startCase(_.lowerCase(announcement.type))}{" "}
                      {!!announcement.when && `| ${announcement.when}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.message}</p>
                    <a href={announcement.link.href}>
                      {announcement.link.text}
                    </a>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No announcements found</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Announcements;
