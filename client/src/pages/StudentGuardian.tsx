import StudentGuardianForm from "@/components/forms/StudentGuardianForm";

const StudentGuardian = () => {
  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Student Guardian</h1>
        <StudentGuardianForm onSubmit={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default StudentGuardian;
