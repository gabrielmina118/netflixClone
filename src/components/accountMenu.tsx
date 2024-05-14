import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { FaSignOutAlt } from "react-icons/fa";
interface AccountMenuProps {
    visible?: boolean;
    user: any;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible, user }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <Image
                        src="/images/defaultGreen.png"
                        width={30}
                        height={50}
                        alt="Profile"
                    />
                    <p className="text-white text-sm group-hover/item:underline">
                        {" "}
                        {user?.name}
                    </p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <div
                    onClick={() => signOut()}
                    className="px-3 text-center text-white text-sm hover:underline"
                >
                    Sign out of netflix
                </div>
            </div>
        </div>
    );
};

export default AccountMenu;
