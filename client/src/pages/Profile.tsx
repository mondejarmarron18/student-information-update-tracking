import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useUserProfile from "@/hooks/useUserProfile";
import useAcademicProfile from "@/hooks/useAcademicProfile";
import { cn } from "@/lib/utils";
import { HiOutlinePencil } from "react-icons/hi";
import useAccessToken from "@/hooks/useAccessToken";
import { toDateTimeString } from "@/utils/fomatter";
import _ from "lodash";
import { FaPowerOff } from "react-icons/fa";

export default function ProfilePage() {
  const useProfile = useUserProfile();
  const userProfileData = useProfile.data?.data;
  const acadProfile = useAcademicProfile();
  const acadProfileData = acadProfile.data?.data;
  const { decodedAccessToken } = useAccessToken();
  const user = decodedAccessToken();

  const RenderFiled = ({ label, value }: { label: string; value?: string }) => {
    return (
      <div className="flex flex-col gap-1 flex-1">
        <div className="font-medium opacity-50">{label}</div>
        <div>{value || "-"}</div>
      </div>
    );
  };

  return (
    <Tabs defaultValue="account" className="w-full max-w-4xl mx-auto mt-10">
      <TabsList className="flex justify-center mb-4">
        <TabsTrigger value="account" className="flex-1">
          Account
        </TabsTrigger>
        <TabsTrigger value="basic" className="flex-1">
          Personal Information
        </TabsTrigger>
        <TabsTrigger value="academic" className="flex-1">
          Academic Profile
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex gap-4 flex-wrap">
                <RenderFiled label="Email" value={user?.email || "-"} />
                <RenderFiled
                  label="Account Type"
                  value={_.startCase(_.lowerCase(user?.roleId.name)) || "-"}
                />
              </div>
              <div className="flex gap-4 flex-wrap">
                <RenderFiled
                  label="Date Created"
                  value={toDateTimeString(user?.createdAt) || "-"}
                />
                <RenderFiled
                  label="Date Verified"
                  value={toDateTimeString(user?.verifiedAt) || "-"}
                />
              </div>
              <RenderFiled
                label="Last Update"
                value={toDateTimeString(user?.updatedAt) || "-"}
              />
            </CardContent>
          </Card>
          <div className="flex justify-end gap-4">
            <Button variant={"destructive"} onClick={() => {}}>
              <FaPowerOff />
              Logout
            </Button>
          </div>
        </div>
      </TabsContent>

      {/* Basic Information & Address */}
      <TabsContent value="basic">
        <div className="flex flex-col gap-4">
          {" "}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <RenderFiled
                label="First Name"
                value={userProfileData?.firstName || "-"}
              />
              <RenderFiled
                label="Middle Name"
                value={userProfileData?.middleName || "-"}
              />
              <RenderFiled
                label="Last Name"
                value={userProfileData?.lastName || "-"}
              />
              <RenderFiled
                label="Phone Number"
                value={userProfileData?.phoneNumber || "-"}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Address</CardTitle>
            </CardHeader>
            {/* <CardContent className="grid gap-4">
            <RenderFiled
              label="Current Address"
              value={`${data.address.current.street}, ${data.address.current.barangay}, ${data.address.current.city}, ${data.address.current.region}, ${data.address.current.country}`}
            />
            <RenderFiled
              label="Permanent Address"
              value={`${data.address.permanent.street}, ${data.address.permanent.barangay}, ${data.address.permanent.city}, ${data.address.permanent.region}, ${data.address.permanent.country}`}
            />
          </CardContent> */}
          </Card>
          <div className="flex justify-end gap-4">
            {/* <p className="text-sm text-gray-500">
            Updating information may take time as it requires approval by the
            school. Your update request will be sent to the "Update Requests"
            page where you can monitor its status. Once submitted, you will not
            be able to make another update until the previous request has been
            reviewed.
          </p> */}
            <Button onClick={() => {}}>
              <HiOutlinePencil /> Request Update
            </Button>
          </div>
        </div>
      </TabsContent>

      {/* Academic Profile & Guardians */}
      <TabsContent value="academic">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Academic Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <RenderFiled
                label="LRN"
                value={acadProfileData?.learnerReferenceNumber || "-"}
              />
              <RenderFiled
                label="Year Level"
                value={acadProfileData?.yearLevel.name || "-"}
              />
              <RenderFiled
                label="Course"
                value={`${acadProfileData?.course.name} - ${acadProfileData?.course.description}`}
              />
              <RenderFiled
                label="Specialization"
                value={acadProfileData?.specialization.name || "-"}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Guardians</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {acadProfileData?.guardians.map((guardian, index) => (
                <div
                  key={index}
                  className={cn("grid gap-4", {
                    "borer-t": index !== 0,
                  })}
                >
                  <RenderFiled
                    label="Guardian Name"
                    value={`${guardian.firstName} ${guardian.middleName} ${guardian.lastName}`}
                  />
                  <RenderFiled
                    label="Relationship"
                    value={`${guardian.relationship}`}
                  />
                  <RenderFiled
                    label="Email Address"
                    value={`${guardian.email}`}
                  />
                  <RenderFiled
                    label="Phone Number"
                    value={`${guardian.phoneNumber}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex justify-end gap-4">
            <Button onClick={() => {}}>
              <HiOutlinePencil /> Request Update
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
