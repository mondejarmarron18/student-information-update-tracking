import AcademicProfileForm from "@/components/forms/AcademicProfileForm";

const AcademicProfile = () => {
  return (
    <div className="flex h-full justify-center items-center p-4">
      <div className="w-full max-w-md">
        <AcademicProfileForm onSubmit={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default AcademicProfile;
