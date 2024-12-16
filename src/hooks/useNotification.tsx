import { ToastAction } from "@/components/ui/toast";
import { useToast } from "./use-toast";

// Define types for toast options
export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  action?: {
    label?: string;
    onClick?: () => void;
  };
}

// Generic toast hook
export const useGenericToast = () => {
  const { toast } = useToast();

  const showToast = (options: ToastOptions) => {
    // Default values if not provided
    const {
      title = "Notification",
      description = "",
      variant = "default",
      action,
    } = options;

    // Map variant to toast style
    const variantMap = {
      default: "default",
      destructive: "destructive",
      success: "success",
      warning: "warning",
    };

    toast({
      title,
      description,
      variant: variantMap[variant],
      action: action ? (
        <ToastAction
          altText={action.label || "Action"}
          onClick={action.onClick}
        >
          {action.label || "Action"}
        </ToastAction>
      ) : undefined,
    });
  };

  // Predefined toast helpers
  const showSuccessToast = (message: string, description?: string) => {
    showToast({
      title: message,
      description,
      variant: "success",
    });
  };

  const showErrorToast = (message: string, description?: string) => {
    showToast({
      title: message,
      description,
      variant: "destructive",
    });
  };

  const showWarningToast = (message: string, description?: string) => {
    showToast({
      title: message,
      description,
      variant: "warning",
    });
  };

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
  };
};
