"use client"
import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import {Button} from '@mui/joy';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { signIn } from 'next-auth/react';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Authenticate() {
  const login = async (data: any) => {
    await signIn("credentials", {...data, redirect: false,})
  }

  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '80dvh',
          width:
            'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
          maxWidth: '100%',
          px: 2,
        }}
      >
        <Box
          component="main"
          sx={{
            my: 'auto',
            py: 2,
            pb: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 400,
            maxWidth: '100%',
            mx: 'auto',
            borderRadius: 'sm',
            '& form': {
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            },
          }}
        >
          <Stack gap={4} sx={{ mb: 2 }}>
            <Stack gap={1}>
              <Typography textAlign="center" component="h1" level="h3">
                Connexion
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={4} sx={{ mt: 2 }}>
            <form
              onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  username: formElements.email.value,
                  password: formElements.password.value,
                  // persistent: formElements.persistent.checked,
                };
                login(data)
                // alert(JSON.stringify(data, null, 2));
                
              }}
            >
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl required>
                <FormLabel>Mot de passe</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Stack gap={4} sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox size="sm" label="Remember me" name="persistent" />
                  {/* <Link level="title-sm" href="#replace-with-a-link">
                    Forgot your password?
                  </Link> */}
                </Box>
                <Button type="submit" sx={{color: "#fff", bgcolor: "#000 !important"}}>
                  Se connecter
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Box component="footer" sx={{ py: 3 }}>
          <Typography level="body-xs" textAlign="center">
            © GStock {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
  );
}