import AcademicProfileForm from "@/components/forms/AcademicProfileForm";
import StudentGuardianForm from "@/components/forms/StudentGuardianForm";
import { toast } from "@/hooks/use-toast";
import useAcademicProfile from "@/hooks/useAcademicProfile";
import useRegisterAcademicProfile from "@/hooks/userRegisterAcademicProfile";
import useCreateUpdateRequest, {
  contentType,
} from "@/hooks/useCreateUpdateRequest";
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
  const createUpdateRequest = useCreateUpdateRequest({
    contentType: contentType.acadProfileContent,
  });

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

    if (createUpdateRequest.isSuccess) {
      message =
        "Your update request has been submitted and is pending approval.";
    }

    if (message) {
      toast({
        title: "Academic Profile",
        description: message,
      });
    }
  }, [registerAcademicProfile.isSuccess, createUpdateRequest.isSuccess]);

  const handleSave = (data: IAcademicProfile) => {
    console.log(data);
    // if (isSuccess) {
    //   return createUpdateRequest.mutate(data);
    // }

    // return registerAcademicProfile.mutate(data);
  };

  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <AcademicProfileForm
          values={academicProfile}
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
          values={academicProfile?.guardians?.[0]}
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
