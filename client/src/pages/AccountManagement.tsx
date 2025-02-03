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
import UserProfileDialog from "@/components/common/UserProfileDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Label } from "@/components/ui/label";
import AcademicProfileDialog from "@/components/common/AcademicProfileDialog";
import { role } from "@/constants/role";

const AccountManagement = () => {
  const useProfile = useUserProfile();
  const userProfileData = useProfile.data?.data;
  const currentAddress = userProfileData?.address.current;
  const pemanentAddress = userProfileData?.address.permanent;
  const acadProfile = useAcademicProfile();
  const acadProfileData = acadProfile.data?.data;
  const { decodedAccessToken } = useAccessToken();
  const user = decodedAccessToken();
  const [isAcknowledge, setIsAcknowledge] = useState<CheckedState>(false);

  const RenderFiled = ({ label, value }: { label: string; value?: string }) => {
    return (
      <div className="flex flex-col gap-1 flex-1">
        <div className="font-medium opacity-50">{label}</div>
        <div>{value || "-"}</div>
      </div>
    );
  };

  return (
    <Tabs defaultValue="account" className="w-full max-w-5xl mx-auto mt-10">
      <TabsList className="flex justify-center mb-4">
        <TabsTrigger value="account" className="flex-1">
          Account
        </TabsTrigger>
        <TabsTrigger value="basic" className="flex-1">
          Personal Information
        </TabsTrigger>
        {user?.roleId?.name === role.STUDENT && (
          <TabsTrigger value="academic" className="flex-1">
            Academic Profile
          </TabsTrigger>
        )}
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
                  value={_.startCase(_.lowerCase(user?.roleId?.name)) || "-"}
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
        </div>
      </TabsContent>

      {/* Basic Information & Address */}
      <TabsContent value="basic">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {!userProfileData ? (
                <div className="text-center flex items-center justify-center text-gray-500 min-h-[150px]">
                  No data, Please add your basic information
                </div>
              ) : (
                <>
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
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {!userProfileData?.address ? (
                <div className="text-center flex items-center justify-center text-gray-500 min-h-[150px]">
                  No data, Please add your address
                </div>
              ) : (
                <>
                  {" "}
                  <RenderFiled
                    label="Current Address"
                    value={`${currentAddress?.addressLine1}${
                      currentAddress?.addressLine2
                        ? `, ${currentAddress?.addressLine2}`
                        : ""
                    }, ${currentAddress?.city} ${currentAddress?.postalCode}, ${
                      currentAddress?.state
                    }, ${currentAddress?.country}`}
                  />
                  <RenderFiled
                    label="Permanent Address"
                    value={`${pemanentAddress?.addressLine1}${
                      pemanentAddress?.addressLine2
                        ? `, ${pemanentAddress?.addressLine2}`
                        : ""
                    }, ${pemanentAddress?.city} ${
                      pemanentAddress?.postalCode
                    }, ${pemanentAddress?.state}, ${pemanentAddress?.country}`}
                  />
                </>
              )}
            </CardContent>
          </Card>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-start gap-2 text-sm text-gray-500">
              <Checkbox
                id="acknowledge"
                checked={isAcknowledge}
                onCheckedChange={setIsAcknowledge}
              />

              {!userProfileData ? (
                <Label>
                  I acknowledge that adding{" "}
                  <span className="text-black dark:text-white">
                    personal information
                  </span>{" "}
                  for the first time will be applied immediately and appear
                  without requiring approval. However, any future updates to
                  this information will require school approval and will be sent
                  to the "Update Requests" page, where I can monitor their
                  status. I understand the importance of reviewing my
                  information carefully before saving, as further updates cannot
                  be made until the previous request has been reviewed.
                </Label>
              ) : (
                <Label>
                  I acknowledge that updating{" "}
                  <span className="text-black dark:text-white">
                    personal information
                  </span>{" "}
                  may take time as it requires approval by the school. Your
                  update request will be sent to the "Update Requests" page
                  where you can monitor its status. Once submitted, you will not
                  be able to make another update until the previous request has
                  been reviewed.
                </Label>
              )}
            </div>
            <UserProfileDialog
              trigger={
                <Button disabled={!isAcknowledge}>
                  <HiOutlinePencil />
                  {!userProfileData
                    ? "Add Personal Information"
                    : "Request an Update"}
                </Button>
              }
            />
          </div>
        </div>
      </TabsContent>

      {/* Academic Profile & Guardians */}
      {user?.roleId?.name === role.STUDENT && (
        <TabsContent value="academic">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Academic Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {!acadProfileData ? (
                  <div className="text-center flex items-center justify-center text-gray-500 min-h-[150px]">
                    No data, Please add your academic profile
                  </div>
                ) : (
                  <>
                    {" "}
                    <RenderFiled
                      label="LRN"
                      value={acadProfileData?.learnerReferenceNumber || "-"}
                    />
                    <RenderFiled
                      label="Year Level"
                      value={acadProfileData?.yearLevel?.name || "-"}
                    />
                    <RenderFiled
                      label="Course"
                      value={`${acadProfileData?.course?.name} - ${acadProfileData?.course?.description}`}
                    />
                    <RenderFiled
                      label="Specialization"
                      value={acadProfileData?.specialization?.name || "-"}
                    />
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Guardians</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {!acadProfileData?.guardians ? (
                  <div className="text-center flex items-center justify-center text-gray-500 min-h-[150px]">
                    No data, Please add your guardians
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </CardContent>
            </Card>
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <Checkbox
                  id="acknowledge"
                  checked={isAcknowledge}
                  onCheckedChange={setIsAcknowledge}
                />

                {!acadProfileData ? (
                  <Label>
                    I acknowledge that adding{" "}
                    <span className="text-black dark:text-white">
                      academic profile
                    </span>{" "}
                    for the first time will be applied immediately and appear
                    without requiring approval. However, any future updates to
                    this information will require school approval and will be
                    sent to the "Update Requests" page, where I can monitor
                    their status. I understand the importance of reviewing my
                    information carefully before saving, as further updates
                    cannot be made until the previous request has been reviewed.
                  </Label>
                ) : (
                  <Label>
                    I acknowledge that updating{" "}
                    <span className="text-black dark:text-white">
                      academic profile
                    </span>{" "}
                    may take time as it requires approval by the school. Your
                    update request will be sent to the "Update Requests" page
                    where you can monitor its status. Once submitted, you will
                    not be able to make another update until the previous
                    request has been reviewed.
                  </Label>
                )}
              </div>
              <AcademicProfileDialog
                trigger={
                  <Button disabled={!isAcknowledge}>
                    <HiOutlinePencil />{" "}
                    {!acadProfileData
                      ? "Add Academic Profile"
                      : "Request an Update"}
                  </Button>
                }
              />
            </div>
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default AccountManagement;
