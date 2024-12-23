import AcademicProfileForm from "@/components/forms/AcademicProfileForm";

const AcademicProfile = () => {
  return (
    <div className="flex h-full justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">AcademicProfile</h1>
        <AcademicProfileForm onSubmit={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default AcademicProfile;
