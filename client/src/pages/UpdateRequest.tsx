import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { MdArrowBackIos } from "react-icons/md";

// Dummy data for the update request
const dummyUpdateRequest = {
  content: {
    previous: {
      firstName: "John",
      middleName: "Doe",
      lastName: "Smith",
      phoneNumber: "+1234567890",
      address: {
        current: "123 Old Street, City, Country",
        permanent: "456 New Avenue, City, Country",
      },
    },
    current: {
      firstName: "Jane",
      middleName: "A.",
      lastName: "Doe",
      phoneNumber: "+0987654321",
      address: {
        current: "789 New Street, City, Country",
        permanent: "123 Old Avenue, City, Country",
      },
    },
  },
  reviewComment: "Please review the changes in the user's profile details.",
  requestedAt: new Date("2025-01-10T10:00:00Z"),
  reviewedAt: null,
};

const UpdateRequestPage = () => {
  const { content, reviewComment, requestedAt, reviewedAt } =
    dummyUpdateRequest;

  // Helper to render each field
  const renderField = (label: string, previous: string, current: string) => (
    <div className="mb-4">
      <div className="font-semibold text-gray-700">{label}</div>
      <div className="flex items-center gap-4">
        <div className="opacity-60">{previous}</div>
        <MdArrowBackIos className="rotate-180" />
        <div>{current}</div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <Card className="p-6">
        <h2 className="text-xl font-bold">Update Request Details</h2>

        <p className="my-2 text-gray-600">
          Requested At: {requestedAt.toLocaleString()}
        </p>

        <p className="my-2 text-gray-600">
          Reviewed At:{" "}
          {reviewedAt
            ? new Date(reviewedAt).toLocaleString()
            : "Not yet reviewed"}
        </p>

        <div className="my-4">
          <div className="font-semibold">Review Comment:</div>
          <p className="text-gray-500">{reviewComment}</p>
        </div>

        <Card className="p-4 my-4">
          <div className="font-semibold text-lg">User Profile Changes</div>

          {/* Render Fields */}
          {renderField(
            "First Name",
            content.previous.firstName,
            content.current.firstName
          )}
          {renderField(
            "Middle Name",
            content.previous.middleName,
            content.current.middleName
          )}
          {renderField(
            "Last Name",
            content.previous.lastName,
            content.current.lastName
          )}
          {renderField(
            "Phone Number",
            content.previous.phoneNumber,
            content.current.phoneNumber
          )}

          {/* Address Section */}
          <div className="font-semibold text-lg my-4">Address</div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="font-semibold">Current Address</div>
              <div>{content.current.address.current}</div>
            </div>
            <div>
              <div className="font-semibold">Permanent Address</div>
              <div>{content.current.address.permanent}</div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            variant="destructive"
            onClick={() => alert("Request Rejected")}
          >
            Reject
          </Button>
          <Button onClick={() => alert("Request Approved")}>Approve</Button>
        </div>
      </Card>
    </div>
  );
};

export default UpdateRequestPage;
