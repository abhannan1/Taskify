import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  UserButton,
} from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";
import MobileSideBar from "./mobile-sidebar";
import FormPopover from "@/components/form/form-popover";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      {/* Mobile sidebar */}
      <MobileSideBar/>
      
      <div className="flex gap-x-4 items-center">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover
        side="right"
        align="start"
        sideOffset={18}
        >
          <Button
            size="sm"
            className="rounded-sm hidden md:block h-auto py-1.5 px-4"
            variant="primary"
            >
            create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button
            size="sm"
            className="rounded-sm block md:hidden"
            variant="primary"
            >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              avatarBox: {
                height: 28,
                width: 28,
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
