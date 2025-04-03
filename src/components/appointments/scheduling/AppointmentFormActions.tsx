
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

interface AppointmentFormActionsProps {
  form?: UseFormReturn<any>;
  onCancel: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
}

export const AppointmentFormActions = ({
  onCancel,
  onSubmit,
  submitLabel = "Schedule Appointment",
  cancelLabel = "Cancel",
  isSubmitting = false,
}: AppointmentFormActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {cancelLabel}
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        onClick={onSubmit ? (e) => {
          e.preventDefault();
          onSubmit();
        } : undefined}
      >
        {isSubmitting ? "Submitting..." : submitLabel}
      </Button>
    </div>
  );
};
