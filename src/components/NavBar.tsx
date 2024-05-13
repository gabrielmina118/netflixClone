import { itemsNavList } from "@/utils/navItems";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import NavBarItem from "./NavBarItem";
import AccountMenu from "./accountMenu";
import MobileMenu from "./mobileMenu";
import { useState, useCallback, useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import Image from "next/image";

const TOP_OFFSET = 66;

const NavBarComponent = () => {
    const { data: user } = useCurrentUser();

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

    const toggleAccountMenu = useCallback(() => {
        setAccountMenu((current) => !current);
    }, []);

    //Esse useEffect faz o efeito do navBar ficar entre opaco e preto
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Remover o evento de scroll
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div
                className={`
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
                `}
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
                    <BsChevronDown
                        className={`text-white transition ${
                            showMobileMenu ? "rotate-180" : "rotate-0"
                        }`}
                    />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div
                        onClick={toggleAccountMenu}
                        className="flex flex-row items-center gap-2 cursor-pointer relative"
                    >
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <Image
                                src="/images/defaultGreen.png"
                                width={100}
                                height={150}
                                alt="Profile"
                            />
                        </div>
                        <BsChevronDown
                            className={`text-white transition ${
                                showAccountMenu ? "rotate-180" : "rotate-0"
                            }`}
                        />
                        <AccountMenu visible={showAccountMenu} user={user} />
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default NavBarComponent;
