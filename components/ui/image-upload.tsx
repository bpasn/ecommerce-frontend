'use client';
import React from "react";
import { useStoreAlert } from "@/hooks/useStoreAlert";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid'
import { uploadImageToFirebase } from "@/services/firebase.service";
import Loading from "@/app/loading";
interface ImageUploadProps {
    disabled?: boolean;
    onChange: (val: string) => void;
    onRemove: (val: string) => void;
    value: string[]
}
export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [uuid, setUuid] = React.useState(uuidv4());
    const [progress, setProgress] = React.useState(0);
    const useAlertStore = useStoreAlert();
    React.useEffect(() => {
        setIsMounted(true);
    }, [progress]);


    if (!isMounted) return null;
    const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files || [];
        console.log(files)
        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            uploadImageToFirebase(`images/products/${uuid}/${file?.name}`, file!)
                .then(res => {
                    onChange(res)
                })
                .catch(e => { throw e })
                .finally(() => {
                    console.log("finaly")
                })
        }

    }

    return (
        <div>
            {loading && <Loading />}
            <div className="mb-4 flex flex-row items-center gap-4">
                {value.map(url => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <Image
                            fill
                            className="object-cover"
                            src={url}
                            alt="Image"
                        />
                        {url}
                    </div>
                ))}
            </div>
            <div className="mb-4 flex flex-row items-center gap-4 w-64">
                <label htmlFor="file-input" className="sr-only">Choose file</label>
                <input type="file"
                    onChange={onUpload}
                    name="file-input"
                    id="file-input"
                    multiple
                    className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                        file:bg-transparent file:border-0
                                        file:bg-gray-100 file:mr-4
                                        file:py-3 file:px-4
                                        dark:file:bg-gray-700 dark:file:text-gray-400" />
            </div>
        </div>
    )
}
