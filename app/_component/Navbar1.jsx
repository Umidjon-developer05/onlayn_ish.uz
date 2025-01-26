"use client"
import { useState } from "react"

import {
  Navbar,
  Dropdown,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  DropdownItem,
  Avatar,
} from "@nextui-org/react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Settings from "../Settings/page"
export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default function Navbar1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const token = localStorage.getItem("token")
  const router = useRouter()
  const sesison = useSession()

  function SingOut() {
    signOut("/")
    router.push("/")
    localStorage.removeItem("token")
  }

  const menuItems = [
    {
      name: "Profile",
      href: "/profile",
    },

    {
      name: "  Elon narxi",
      href: "/Dashboard",
    },
    {
      name: " Ish",
      href: "/work",
    },
    {
      name: " Bozor",
      href: "/Bozor",
    },
    {
      name: " Ishga Ariza",
      href: "/petition",
    },
    {
      name: " Elon LogIn",
      href: "/LogIn",
    },

    {
      name: "SingIn",
      href: "/SingIn",
    },
    {
      name: "Logout",
      href: "/",
    },
  ]

  return (
    <Navbar
      className="flex items-center h-[80px] border bg-black text-white dark"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="sm:hidden">
        <NavbarContent justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>
      </div>
      <div className=" flex gap-16  items-center sm:w-[1200px] justify-center">
        <div className="sm:hidden">
          <NavbarContent justify="center">
            <NavbarBrand className="flex gap-2 items-center">
              <img src="/logo.png" className="w-5 h-5 " />
              <p className="font-bold text-inherit">Onlayn_ish.uz</p>
            </NavbarBrand>
          </NavbarContent>
        </div>

        <div className="flex fixed container  sm:h-full justify-between items-center ">
          <NavbarContent className=" sm:flex gap-4" justify="center">
            <NavbarBrand className="flex gap-2 items-center">
              <img src="/logo.png" className="w-5 h-5 " />
              <Link href="/" className="font-bold text-inherit">
                Onlayn_ish.uz
              </Link>
            </NavbarBrand>

            <NavbarItem>
              <Link color="foreground" href="/work" className="text-white hover:text-gray-300">
                ish
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/Bozor" className="text-white hover:text-gray-300">
                Bozor
              </Link>
            </NavbarItem>
          
          </NavbarContent>

          <NavbarContent justify="center" className="hidden sm:flex">
            <Settings />
            <NavbarItem>
              {sesison.data?.user ? (
                <Dropdown placement="bottom-start" className="">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name="Jason Hughes"
                      src={sesison.data?.user?.image}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14  gap-2">
                      <p className="font-semibold">{sesison.data?.user?.name}</p>
                      <p className="font-semibold">{sesison.data?.user?.email}</p>
                    </DropdownItem>
                    {sesison.data?.user?.email === process.env.NEXT_PUBLIC_EMAIL ||
                    sesison.data?.user?.email === process?.env.NEXT_PUBLIC_GITHUB ? (
                      <DropdownItem key="Dashboard">
                        <Link href="/admin-dashboard">Admin</Link>
                      </DropdownItem>
                    ) : (
                      <DropdownItem key="Dashboard">Profile</DropdownItem>
                    )}
                    <DropdownItem key="Dashboard">
                      <Link href="/Dashboard" className="w-full">
                        Elon narxi
                      </Link>
                    </DropdownItem>

                    {token ? (
                      <DropdownItem key="system">
                        <Link href={`${token ? "/InstructorAdmin" : "/"}`}>InstructorAdmin</Link>
                      </DropdownItem>
                    ) : null}
                    {token ? null : (
                      <DropdownItem key="configurations">
                        <Link className="w-full" href="/LogIn">
                          Elon Log In
                        </Link>
                      </DropdownItem>
                    )}

                  
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <>
                
                </>
              )}
            </NavbarItem>
          </NavbarContent>
        </div>
      </div>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index} className="pt-2">
            <Link
              className="w-full"
              color={index === 5 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"}
              onClick={() => (index === menuItems.length - 1 ? SingOut() : null)}
              href={item?.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

