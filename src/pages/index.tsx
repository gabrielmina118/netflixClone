import { useCallback, useState } from "react";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";

import NavBarItem from "@/components/NavBar";
import { itemsNavList } from "@/utils/navItems";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "@/components/mobileMenu";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

export default function Home() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div
                className="
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            bg-zinc-900
            bg-opacity-90
        "
            >
                <Image
                    src="/images/logo.png"
                    width={100}
                    height={200}
                    alt="Profile"
                />
                <div
                    className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex
            "
                >
                    {itemsNavList.map((item) => {
                        return <NavBarItem key={item} label={item} />;
                    })}
                </div>
                <div
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex flex-row items-center ml-8 cursor-pointer relative"
                >
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className="text-white transition" />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <Image
                                src="/images/defaultGreen.png"
                                width={100}
                                height={150}
                                alt="Profile"
                            />
                        </div>
                        <BsChevronDown className="text-white transition" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
