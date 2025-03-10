'use client';

import { useUser } from '@clerk/clerk-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import {
  ChevronDown,
  Cylinder,
  Eye,
  House,
  List,
  LogIn,
  Folders,
  FileText,
  NotebookPen,
  SquareCheckBig,
  Plus,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import logo from '/public/icon_logo.png';
import packageJson from 'package.json';
import Link from 'next/link';

export function AppSidebar() {
  const { isSignedIn, user } = useUser();
  const { setOpen, setOpenMobile } = useSidebar();

  const handleCloseSidebar = () => {
    setOpen(false);
    setOpenMobile(false);
  };

  return (
    <Sidebar>
      <SidebarHeader className='flex flex-row items-center'>
        <Image src={logo} alt='logo' />
        <div className='flex flex-col grow'>
          <span className='font-bold'>DARES</span>
          <span className='text-xs'>v.{packageJson.version}</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent
        className={`mt-4 ${!isSignedIn ? 'pointer-events-none' : ''}`}
      >
        <Link
          href='/'
          className='h-12 pl-4 flex items-center space-x-2 text-primary cursor-pointer'
        >
          <House />
          <span className='text-lg font-semibold text-primary'>Home</span>
        </Link>
        {/* ------------------------------------------------------------------------------------------------- */}
        <Collapsible className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <span className='flex items-top space-x-2 text-primary'>
                  <Cylinder />
                  <span className='text-lg'>Tanks</span>
                </span>
                <ChevronDown className='ml-auto text-primary transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className='ml-4 font-semibold text-primary'>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/tanks'>
                        <List />
                        <span>List</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/tanks/create'>
                        <Plus />
                        <span>Create</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        {/* ------------------------------------------------------------------------------------------------- */}
        <Collapsible className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <span className='flex items-center space-x-2 text-primary'>
                  <Eye />
                  <span className='text-lg'>Visual Inspections</span>
                </span>
                <ChevronDown className='ml-auto text-primary transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className='ml-4 font-semibold text-primary'>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/inspections'>
                        <List />
                        <span>List</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        {/* ------------------------------------------------------------------------------------------------- */}
        <Collapsible className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <span className='flex items-center space-x-2 text-primary'>
                  <NotebookPen />
                  <span className='text-lg'>Inventories</span>
                </span>
                <ChevronDown className='ml-auto text-primary transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className='ml-4 font-semibold text-primary'>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/inventories'>
                        <List />
                        <span>List</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/reports/tanks/inventory-statement'>
                        <SquareCheckBig />
                        <span>Inventory Statement</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        {/* ------------------------------------------------------------------------------------------------- */}
        <Collapsible className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <span className='flex items-center space-x-2 text-primary'>
                  <Folders />
                  <span className='text-lg'>Reports</span>
                </span>
                <ChevronDown className='ml-auto text-primary transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className='ml-4 font-semibold text-primary'>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/reports/tanks/scheduled'>
                        <FileText />
                        <span>Scheduled Tanks</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        {/* ------------------------------------------------------------------------------------------------- */}
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SignedOut>
          <Link
            href='/log-in'
            onClick={handleCloseSidebar}
            className='h-12 pl-4 flex items-center space-x-2 text-primary cursor-pointer'
          >
            <LogIn />
            <span className='text-lg font-semibold text-primary'>Log in</span>
          </Link>
        </SignedOut>
        <SignedIn>
          <div className='flex gap-x-2 items-center'>
            <UserButton />
            <span className='flex flex-col text-xs font-semibold'>
              <span className='font-bold'>{user?.fullName}</span>
              <span>{user?.emailAddresses[0]?.emailAddress}</span>
            </span>
          </div>
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
