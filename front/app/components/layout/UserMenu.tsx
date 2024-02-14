'use client'
import * as React from 'react';
import { Dropdown, Menu, MenuButton, MenuItem, ListItemDecorator } from '@mui/joy';
import { LogIn, LogOut, User} from 'react-feather';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react'


export default function UserMenu  () {
    const router = useRouter();
    const { data : session } = useSession()
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const handleOpenChange = React.useCallback((event: React.SyntheticEvent | null, isOpen: boolean) => {
        setIsOpen(isOpen);
      },[],
    );

    return (
        <Dropdown open={isOpen} onOpenChange={handleOpenChange}>
            <MenuButton><User/></MenuButton>
            <Menu placement="bottom-end">
                { (session?.user) ? 
                (<>
                    <MenuItem onClick={() => router.push('/account')}>
                    <ListItemDecorator> <User/> </ListItemDecorator>{' '}
                        {session?.user.name}
                    </MenuItem>
                    <MenuItem onClick={() => signOut()}><LogOut/>Logout</MenuItem>
                </>)
                : 
                <MenuItem onClick={() => router.push("/authenticate")}>
                    <ListItemDecorator> <LogIn/> </ListItemDecorator>{' '}
                    Login
                </MenuItem>
                } 
            </Menu>
            
        </Dropdown>
    )
}