"use client";
import { useState } from "react";
// import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
// import { Button } from "../components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu";
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
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function Navbar1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const sesison = useSession();
  const menuItems = [
    {
      name: "Profile",
      href: "/profile",
    },
    {
      name: "Logout",
      href: "/",
    },
    {
      name: "Dashboard",
      href: "/Dashboard",
    },
    {
      name: "Settings",
      href: "/Settings",
    },
  ];

  return (
    <Navbar
      className="flex items-center h-[80px] border"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <div className=" flex gap-16  items-center sm:w-[1200px] justify-center">
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <div className="flex fixed container p-10 h-full justify-between items-center w-full">
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarBrand>
              <AcmeLogo />
              <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarItem>
              <Link color="foreground" href="#">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Customers
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/work">
                Work
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              {sesison.data?.user ? (
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name="Jason Hughes"
                      size="sm"
                      src={sesison.data?.user?.image}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14  gap-2">
                      <p className="font-semibold">
                        {sesison.data?.user?.name}
                      </p>
                      <p className="font-semibold">
                        {sesison.data?.user?.email}
                      </p>
                    </DropdownItem>
                    {sesison.data?.user?.email ===
                      process.env.NEXT_PUBLIC_EMAIL ||
                    sesison.data?.user?.email ===
                      process?.env.NEXT_PUBLIC_GitHub ? (
                      <DropdownItem key="Dashboard">
                        <Link href="/admin-dashboard" className="w-full">
                          Admin
                        </Link>
                      </DropdownItem>
                    ) : (
                      <DropdownItem key="Dashboard">User</DropdownItem>
                    )}
                    <DropdownItem key="Dashboard">
                      <Link href="/Dashboard" className="w-full">Dashboard</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link className="w-full" href="/Settings">
                        Settings
                      </Link>
                    </DropdownItem>

                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">
                      Configurations
                    </DropdownItem>

                    <DropdownItem
                      key="logout"
                      color="danger"
                      onClick={() => signOut("/")}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <>
                  <Link as={Link} color="warning" href="/SingIn" variant="flat">
                    Sign Up
                  </Link>
                </>
              )}
            </NavbarItem>
          </NavbarContent>
        </div>
      </div>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 3
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
