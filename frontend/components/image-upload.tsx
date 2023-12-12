import { useEffect, useState, forwardRef } from "react";
import Image from "next/image";
import { Input } from "./ui/input";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const ImageUpload = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const [selectedFile, setSelectedFile] = useState<File | undefined>();
        const [preview, setPreview] = useState<string | undefined>();

        // Create a preview image as a side effect, whenever selected file is changed
        useEffect(() => {
            if (!selectedFile) {
                setPreview(undefined);
                return;
            }

            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);

            // Free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl);
        }, [selectedFile]);

        const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files || e.target.files.length === 0) {
                setSelectedFile(undefined);
                return;
            }

            setSelectedFile(e.target.files[0]);
        };

        return (
            <>
                <Input
                    className={cn("cursor-pointer", className)}
                    ref={ref}
                    type="file"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                    onChange={onSelectFile}
                    {...props}
                />

                {selectedFile && (
                    <Image
                        className="w-full rounded-md my-2"
                        alt="Image preview"
                        height={600}
                        width={900}
                        src={preview as string}
                    />
                )}
            </>
        );
    }
);

ImageUpload.displayName = "ImageUpload";

export { ImageUpload };
