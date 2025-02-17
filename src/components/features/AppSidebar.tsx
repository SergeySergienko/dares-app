import { auth, currentUser } from '@clerk/nextjs/server';
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
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import logo from '/public/icon_logo.png';
import packageJson from 'package.json';

export async function AppSidebar() {
  const user = await currentUser();

  return (
    <Sidebar>
      <SidebarHeader className='flex flex-row justify-between items-center bg-white'>
        <Image src={logo} alt='logo' />
        <div className='flex flex-col grow'>
          <span className='font-bold'>DARES</span>
          <span className='text-xs'>v.{packageJson.version}</span>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <a href='/log-in'>
            <div className='p-1 rounded-md text-lg font-semibold hover:bg-secondary'>
              Log in
            </div>
          </a>
        </SignedOut>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className='mt-4'>
        <a
          href='/'
          className='h-12 pl-4 flex items-center space-x-2 text-primary cursor-pointer'
        >
          <House />
          <span className='text-lg font-semibold text-primary'>Home</span>
        </a>
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
                      <a href='/tanks'>
                        <List />
                        <span>List</span>
                      </a>
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
                      <a href='/inspections'>
                        <List />
                        <span>List</span>
                      </a>
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
                      <a href='/inventories'>
                        <List />
                        <span>List</span>
                      </a>
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
                      <a href='/reports/tanks/scheduled'>
                        <FileText />
                        <span>Scheduled Tanks</span>
                      </a>
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
          <a
            href='/log-in'
            className='h-12 pl-4 flex items-center space-x-2 text-primary cursor-pointer'
          >
            <LogIn />
            <span className='text-lg font-semibold text-primary'>Log in</span>
          </a>
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
