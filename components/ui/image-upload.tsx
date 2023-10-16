'use client';
import React from "react";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import { removeImageFromFirebase, uploadImageToFirebase } from "@/services/firebase.service";
import Loading from "@/app/loading";
import { Trash } from "lucide-react";
import { Button } from "./button";
import AlertModal from "../modals/alert-modal";
import toast from "react-hot-toast";
import _ from "lodash";
interface ImageUploadProps {
    disabled?: boolean;
    pathFile: string;
    onChange: (val: string) => void;
    onRemove: (val: string) => void;
    value: string[] | string;
}
export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    pathFile,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [alertModal, setAlertModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [urlImageRemove, setUrlImageRemove] = React.useState<string>();
    const inputFileRef = React.useRef<HTMLInputElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted) return null;
    const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files || [];
        setLoading(true);
        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            uploadImageToFirebase(`${pathFile}/${file?.name}`, file!)
                .then(res => {
                    onChange(res);
                    const images = localStorage.getItem("images") ? JSON.parse(localStorage.getItem("images")!) : [];
                    images.push({ image: res });
                    localStorage.setItem("images", JSON.stringify(images));
                })
                .catch(e => { throw e; })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    const removeImage = async () => {
        setLoading(true);
        await removeImageFromFirebase(urlImageRemove!).finally(() => {
            setLoading(false);
            setAlertModal(!alertModal);
        }).catch((e: any) => toast.error(e.message));
        onRemove(urlImageRemove!);
        const images: [] = localStorage.getItem("images") ? JSON.parse(localStorage.getItem("images")!) : [];
        localStorage.setItem("images", JSON.stringify(images.filter(img => img !== urlImageRemove)));
        setUrlImageRemove("");

    };
    return (
        <div>
            {loading && <Loading />}
            <AlertModal isOpen={alertModal}
                onClose={() => setAlertModal(false)}
                onConfirm={() => {
                    removeImage();
                }}
                loading={loading} />
            <div className="mb-4 flex flex-row items-center gap-4">
                {Array.isArray(value) ? value.map(url => (
                    <div key={url} className="relative w-[200px] h-[200px] block-image rounded-md overflow-hidden">
                        <Image
                            fill
                            className="object-cover"
                            src={url}
                            alt="Image"
                        />
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                ref={buttonRef}
                                onClick={() => {
                                    setAlertModal(true);
                                    setUrlImageRemove(url);
                                }}
                                variant={"danger"}
                                size={"icon"}>
                                <Trash />
                            </Button>
                        </div>
                    </div>
                )) : !_.isEmpty(value) && <div className="relative w-[200px] h-[200px] block-image rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        src={value}
                        alt="Image"
                    />
                    <div className="z-10 absolute top-2 right-2">
                        <Button
                            type="button"
                            ref={buttonRef}
                            onClick={() => {
                                setAlertModal(true);
                                setUrlImageRemove(value);
                            }}
                            variant={"danger"}
                            size={"icon"}>
                            <Trash />
                        </Button>
                    </div>
                </div>
                }
            </div>
            <div className="mb-4 flex flex-row items-center gap-4 w-64">
                <label htmlFor="file-input" className="sr-only">Choose file</label>
                <Button type="button" variant={"outline"} onClick={() => inputFileRef.current?.click()}>Select File image</Button>
                <input type="file"
                    id="selectFile"
                    ref={inputFileRef}
                    onChange={onUpload}
                    multiple
                    className="hidden w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                file:bg-transparent file:border-0
                                file:bg-gray-100 file:mr-4
                                file:py-3 file:px-4
                                dark:file:bg-gray-700 dark:file:text-gray-400" />
            </div>
        </div>
    );
};
