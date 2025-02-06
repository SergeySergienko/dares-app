import Image from 'next/image';
import {
  ChevronDown,
  ChevronUp,
  Cylinder,
  Eye,
  House,
  List,
  // Plus,
  LogIn,
  LogOut,
  User,
  UserPlus,
  Folders,
  FileText,
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
} from '../ui/collapsible';
import logo from '/public/logo.png';

const profileItems = [
  {
    title: 'Register',
    url: '#',
    icon: UserPlus,
  },
  {
    title: 'Log in',
    url: '#',
    icon: LogIn,
  },
  {
    title: 'Log out',
    url: '#',
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='flex flex-row items-center bg-white'>
        <Image src={logo} alt='logo' />
        <div className='flex flex-col'>
          <span className='font-bold'>DARES</span>
          <span className='text-xs'>v0.1.0</span>
        </div>
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
                  {/* <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <Plus />
                        <span>Create</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem> */}
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
                  {/* <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/inspections/create'>
                        <Plus />
                        <span>Create</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem> */}
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
        <Collapsible className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <span className='flex items-top space-x-2 text-primary'>
                  <User />
                  <span className='text-lg'>Profile</span>
                </span>
                <ChevronUp className='ml-auto text-primary transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className='ml-4 font-semibold text-primary'>
              <SidebarGroupContent>
                <SidebarMenu>
                  {profileItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  );
}
