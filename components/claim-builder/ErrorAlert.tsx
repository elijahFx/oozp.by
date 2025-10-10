"use client";

import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

export const ErrorAlert = forwardRef<HTMLDivElement, ErrorAlertProps>(
  ({ message, onClose }, ref) => {
    return (
      <div 
        ref={ref}
        className="bg-red-50 border border-red-200 rounded-lg p-4 animate-in slide-in-from-top duration-300 scroll-mt-4"
        id="error-alert"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-red-800 mb-1">
                Произошла ошибка
              </h4>
              <p className="text-sm text-red-700">{message}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 text-red-600 hover:text-red-800 hover:bg-red-100 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
);

ErrorAlert.displayName = "ErrorAlert";