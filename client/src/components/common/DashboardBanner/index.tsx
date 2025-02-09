import React, { useEffect, useState } from "react";
import { FaSun, FaCloudSun, FaMoon, FaSmileBeam } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { routePaths } from "@/routes";
import useAccessToken from "@/hooks/useAccessToken";
import { role } from "@/constants/role";

interface DashboardBannerProps {
  name?: string; // Make name optional
}

const DashboardBanner: React.FC<DashboardBannerProps> = ({ name }) => {
  const { decodedAccessToken } = useAccessToken();
  const user = decodedAccessToken();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState(
    <FaSmileBeam className="text-primary w-10 h-10" />
  );

  useEffect(() => {
    const hour = new Date().getHours();
    const nameGreeting = name ? `, ${name}` : ""; // Only add the name if it's provided

    if (hour < 12) {
      setGreeting(`Good Morning${nameGreeting}! Ready to learn something new?`);
      setIcon(<FaSun className="text-yellow-500 w-10 h-10" />);
    } else if (hour < 18) {
      setGreeting(
        `Good Afternoon${nameGreeting}! Keep pushing through the day ☕`
      );
      setIcon(<FaCloudSun className="text-orange-400 w-10 h-10" />);
    } else {
      setGreeting(
        `Good Evening${nameGreeting}! It looks like we're still awake huh?`
      );
      setIcon(<FaMoon className="text-indigo-600 w-10 h-10" />);
    }
  }, [name]);

  return (
    <Card className="text-center">
      <CardHeader className="flex items-center">
        {icon}
        <CardTitle className="text-2xl font-bold">{greeting}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <p className="text-gray-600">
          {user?.role?.name === role.STUDENT
            ? "Stay up-to-date with your recent requests. Keep track of all your updates here!"
            : "Stay up-to-date with recent update requests. Keep track of all the students updates here!"}
        </p>
        <Button
          onClick={() => navigate(routePaths.updateRequests.path)}
          className="mt-4"
          variant="outline"
        >
          View Update Requests
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardBanner;
