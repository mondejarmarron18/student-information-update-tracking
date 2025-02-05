import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import AnnouncementForm from "@/components/forms/AnnouncementForm";
import useCreateAnnouncement from "@/hooks/useCreateAnnouncement";
import { AnnouncementFormProps } from "@/components/forms/AnnouncementForm/schema";
import useUpdateAnnouncement from "@/hooks/useUpdateAnnouncement";
import useAnnouncement from "@/hooks/useAnnouncement";

type Props = {
  announcementId?: string;
  trigger: ReactNode;
};

const AnnouncementDialog = (props: Props) => {
  const { trigger } = props;
  const announcement = useAnnouncement({
    announcementId: props.announcementId || "",
  });
  const createAnnouncement = useCreateAnnouncement();
  const updateAnnouncement = useUpdateAnnouncement();
  const [isOpen, setIsOpen] = useState(false);

  const error = createAnnouncement.error || updateAnnouncement.error;

  useEffect(() => {
    if (createAnnouncement.isSuccess || updateAnnouncement.isSuccess) {
      toast({
        title: "Success",
        description: `Announcement ${
          props.announcementId ? "updated" : "created"
        } successfully`,
      });
      setIsOpen(false);
    }

    return () => {
      createAnnouncement.reset();
      updateAnnouncement.reset();
    };
  }, [createAnnouncement.isSuccess, updateAnnouncement.isSuccess]);

  const onSubmit = (data: AnnouncementFormProps) => {
    if (props.announcementId) {
      return updateAnnouncement.mutate({
        ...data,
        announcementId: props.announcementId,
      });
    }

    createAnnouncement.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {props.announcementId ? "Update" : "Create"} Announcement
          </DialogTitle>
          <DialogDescription>
            {props.announcementId
              ? "Update announcement details"
              : "Create a new announcement for your institution"}
          </DialogDescription>
        </DialogHeader>
        <AnnouncementForm
          values={announcement.data?.data}
          error={error ? { description: error.description } : undefined}
          onCancel={() => setIsOpen(false)}
          onCancelLabel={"Cancel"}
          onSubmitLabel={props.announcementId ? "Update" : "Save"}
          onSubmit={onSubmit}
          onSubmitLoading={
            createAnnouncement.isPending || updateAnnouncement.isPending
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDialog;
