import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useUserProfile from "@/hooks/useUserProfile";
import useAcademicProfile from "@/hooks/useAcademicProfile";
import { cn } from "@/lib/utils";
import { toDateTimeString } from "@/utils/fomatter";
import _ from "lodash";
import { role } from "@/constants/role";
import useUserAccount from "@/hooks/useUserAccount";
import { useParams } from "react-router";

const UserAccount = () => {
  const { userAccountId } = useParams();
  const userAccount = useUserAccount({
    userAccountId: userAccountId || "",
  });
  const useAccountData = userAccount.data?.data;
  const useProfile = useUserProfile();
  const userProfileData = useProfile.data?.data;
  const currentAddress = userProfileData?.address.current;
  const pemanentAddress = userProfileData?.address.permanent;
  const acadProfile = useAcademicProfile();
  const acadProfileData = acadProfile.data?.data;

  const RenderFiled = ({ label, value }: { label: string; value?: string }) => {
    return (
      <div className="flex flex-col gap-1 flex-1">
        <div className="font-medium opacity-50">{label}</div>
        <div>{value || "-"}</div>
      </div>
    );
  };

  return (
    <div
      defaultValue="account"
      className={cn("w-full max-w-5xl mx-auto gap-4 flex flex-col")}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Account</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex gap-4 flex-wrap">
            <RenderFiled label="Email" value={useAccountData?.email || "-"} />
            <RenderFiled
              label="Account Type"
              value={
                _.startCase(_.lowerCase(useAccountData?.roleId?.name)) || "-"
              }
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <RenderFiled
              label="Date Created"
              value={toDateTimeString(useAccountData?.createdAt) || "-"}
            />
            <RenderFiled
              label="Date Verified"
              value={toDateTimeString(useAccountData?.verifiedAt) || "-"}
            />
          </div>
          <RenderFiled
            label="Last Update"
            value={toDateTimeString(useAccountData?.updatedAt) || "-"}
          />
        </CardContent>
      </Card>

      {/* Basic Information & Address */}
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
        <CardContent className="grid gap-4">
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
            }, ${pemanentAddress?.city} ${pemanentAddress?.postalCode}, ${
              pemanentAddress?.state
            }, ${pemanentAddress?.country}`}
          />
        </CardContent>
      </Card>
      {useAccountData?.roleId?.name === role.STUDENT && (
        <>
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
                value={acadProfileData?.yearLevel?.name || "-"}
              />
              <RenderFiled
                label="Course"
                value={`${acadProfileData?.course?.name || "-"} ${
                  acadProfileData?.course?.description
                    ? `- ${acadProfileData?.course?.description}`
                    : ""
                }`}
              />
              <RenderFiled
                label="Specialization"
                value={acadProfileData?.specialization?.name || "-"}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Guardians</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {acadProfileData?.guardians?.length ? (
                acadProfileData?.guardians.map((guardian, index) => (
                  <div
                    key={index}
                    className={cn("grid gap-4", {
                      "borer-t": index !== 0,
                    })}
                  >
                    <RenderFiled
                      label="Guardian Name"
                      value={`${guardian.firstName || "-"} ${
                        guardian.middleName || "-"
                      } ${guardian.lastName || "-"}`}
                    />
                    <RenderFiled
                      label="Relationship"
                      value={guardian.relationship || "-"}
                    />
                    <RenderFiled
                      label="Email Address"
                      value={guardian.email || "-"}
                    />
                    <RenderFiled
                      label="Phone Number"
                      value={guardian.phoneNumber || "-"}
                    />
                  </div>
                ))
              ) : (
                <div className="grid gap-4">
                  <RenderFiled label="Guardian Name" value={"-"} />
                  <RenderFiled label="Relationship" value={"-"} />
                  <RenderFiled label="Email Address" value={"-"} />
                  <RenderFiled label="Phone Number" value={"-"} />
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default UserAccount;
