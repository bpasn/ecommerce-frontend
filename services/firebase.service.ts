import { storage } from "@/lib/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const uploadImageToFirebase = async (filepath: string, file: File): Promise<string> => new Promise(
    (resolve, reject) => {
        const _ref = ref(storage, filepath);
        const uploadTask = uploadBytesResumable(_ref, file);

        //Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successfully completion
        uploadTask.on("state_changed",
            snapshot => {
                //Observer state change events such as progress. pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                
                switch (snapshot.state) {
                    case 'paused':
                        console.log("Upload is paused");
                        break;
                    case 'running':
                        console.log("Upload is running");
                        break;
                }
            },
            error => {
                //Handle unsuccessful uploads
                reject(error.message)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    resolve(downloadURL)
                })
            }
        )
    }
);