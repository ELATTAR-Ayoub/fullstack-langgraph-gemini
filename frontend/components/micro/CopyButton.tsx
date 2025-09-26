import React from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";

interface CopyButtonProps {
  content: string;
  messageId: string;
  onCopy: (text: string, messageId: string) => void;
  copiedMessageId: string | null;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const CopyButton: React.FC<CopyButtonProps> = ({
  content,
  messageId,
  onCopy,
  copiedMessageId,
  className = "",
  variant = "outline",
  size = "icon",
}) => {
  const isCopied = copiedMessageId === messageId;

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => onCopy(content, messageId)}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
};

export default CopyButton;
