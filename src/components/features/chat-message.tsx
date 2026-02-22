import { cn } from "@/lib/cn";
import Image from "next/image";

type MessageType = "text" | "image";

interface ChatMessageProps {
  content: string;
  time: string;
  isSent: boolean;
  type?: MessageType;
}

export function ChatMessage({ content, time, isSent, type = "text" }: ChatMessageProps) {
  return (
    <div className={cn("flex flex-col max-w-[75%]", isSent ? "items-end ml-auto" : "items-start mr-auto")}>
      {type === "image" ? (
        <div className={cn(
          "relative w-48 h-48 rounded-2xl overflow-hidden brutal-border-thin shadow-brutal-sm",
          isSent ? "rounded-br-sm" : "rounded-bl-sm"
        )}>
          <Image src={content} alt="Image message" fill className="object-cover" sizes="192px" />
        </div>
      ) : (
        <div
          className={cn(
            "px-4 py-2 rounded-2xl text-body-md",
            isSent
              ? "bg-rose-500 text-white rounded-br-sm shadow-brutal-sm"
              : "bg-white brutal-border-thin rounded-bl-sm shadow-brutal-sm"
          )}
        >
          {content}
        </div>
      )}
      <span className="text-label-sm text-charcoal-500 mt-1 px-1">{time}</span>
    </div>
  );
}
