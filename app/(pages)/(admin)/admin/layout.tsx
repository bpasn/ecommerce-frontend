'use client';
import Navbar from "@/components/navbar/Navbar";

const SetupLayoutAdmin: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default SetupLayoutAdmin;