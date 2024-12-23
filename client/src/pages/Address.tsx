import AddressForm from "@/components/forms/AddressForm";

const Address = () => {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="w-full max-w-md my-auto">
        <h1 className="text-3xl font-bold mb-4">Address</h1>
        <AddressForm onSubmit={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default Address;
