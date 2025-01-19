import AcademicProfileForm from "@/components/forms/AcademicProfileForm";
import StudentGuardianForm from "@/components/forms/StudentGuardianForm";
import { toast } from "@/hooks/use-toast";
import useAcademicProfile from "@/hooks/useAcademicProfile";
import useRegisterAcademicProfile from "@/hooks/userRegisterAcademicProfile";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { cn } from "@/lib/utils";
import { IAcademicProfile } from "@/types/academicProfile.type";
import { useEffect, useState } from "react";

const AcademicProfile = () => {
  const { data, error, isSuccess } = useAcademicProfile();
  const [academicProfile, setAcademicProfile] = useState<
    IAcademicProfile | undefined
  >();
  const [formIndex, setFormIndex] = useState(0);
  const registerAcademicProfile = useRegisterAcademicProfile();
  const updateUserProfile = useUpdateUserProfile();

  useEffect(() => {
    if (data) {
      setAcademicProfile(data.data);
    }
    if (error) if (error && error?.status !== 404) toast(error);
  }, [data, error]);

  useEffect(() => {
    let message: string = "";

    if (registerAcademicProfile.isSuccess) {
      message = "Your personal information has been saved.";
    }

    if (updateUserProfile.isSuccess) {
      message =
        "Your update request has been submitted and is pending approval.";
    }

    if (message) {
      toast({
        title: "Personal Profile",
        description: message,
      });
    }
  }, [registerAcademicProfile.isSuccess, updateUserProfile.isSuccess]);

  const handleSave = (data: IAcademicProfile) => {
    // if (isSuccess) {
    //   return updateUserProfile.mutate(data);
    // }

    return registerAcademicProfile.mutate(data);
  };

  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* <UserProfileForm
          onSubmitLabel="Next"
          values={userProfile}
          onSubmit={(val) => {
            setUserProfile(val as IUserProfile);
            setFormIndex((prev) => prev + 1);
          }}
          className={cn({
            hidden: formIndex !== 0,
          })}
        /> */}
        {/* <AddressForm
          values={userProfile?.address}
          
          
         
          onSubmitLoading={registerUserProfile.isPending}
          onSubmit={(val) => {
            handleSave({ ...userProfile, address: val } as IUserProfile);
          }}
          className={cn({
            hidden: formIndex !== 1,
          })}
        /> */}

        <AcademicProfileForm
          onSubmit={(val) => {
            setAcademicProfile(val as IAcademicProfile);
            setFormIndex((prev) => prev + 1);
          }}
          onSubmitLabel="Next"
          className={cn({
            hidden: formIndex !== 0,
          })}
        />
        <StudentGuardianForm
          onSubmit={(val) => {
            handleSave({
              ...academicProfile,
              guardians: [val],
            } as IAcademicProfile);
          }}
          onCancel={() => setFormIndex((prev) => prev - 1)}
          onSubmitLoading={registerAcademicProfile.isPending}
          onSubmitLabel={isSuccess ? "Update" : "Save"}
          className={cn({
            hidden: formIndex !== 1,
          })}
          onCancelLabel="Previous"
        />
      </div>
    </div>
  );
};

export default AcademicProfile;
