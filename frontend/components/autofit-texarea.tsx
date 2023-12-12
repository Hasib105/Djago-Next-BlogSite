import * as React from "react";

import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutofitTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

        const expandTextarea = () => {
            const textarea = textareaRef.current;

            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };

        React.useImperativeHandle(
            ref,
            () => textareaRef.current as HTMLTextAreaElement,
            []
        );

        return (
            <Textarea
                ref={textareaRef}
                placeholder="Post body"
                className={cn("resize-none", className)}
                onInput={expandTextarea}
                {...props}
            />
        );
    }
);
AutofitTextarea.displayName = "AutofitTextarea";

export { AutofitTextarea };
