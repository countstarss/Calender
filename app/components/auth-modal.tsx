import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
import Logo from '@/public/logo.png'
import Image from 'next/image';
import { auth, signIn, signOut } from '@/lib/auth';
import { OAuthButton } from './submit-button';
import { redirect } from 'next/navigation';
import { InsertUser } from '@/actions/UserActions';


interface AuthModalProps {
  // You can define any props needed here
}

const AuthModal = async ({

}: AuthModalProps) => {

  const session = await auth()
  const user = session?.user
  console.log(user)

  if (user) {
    redirect('/dashboard')
  }
  return (
    <Dialog
      // MARK: Try for free
    >
      <DialogTrigger asChild>
        {
          user ? (
            <form action={async () => {
              "use server"
              await signOut()
            }}>
              <Button>Sign out</Button>
            </form>
          ) : (
            <Button>Try for free</Button>
          )
        }
      </DialogTrigger>
      <DialogContent className='sm:max-w-[360px]'>
        <DialogTitle></DialogTitle>
        <DialogHeader className='flex flex-row gap-2 justify-center items-center'>
          <Image src={Logo} alt="logo" width={100} height={100} className='size-10 object-contain aspect-square' />
          <h4 className='text-3xl font-bold'>Event<span className='text-blue-500'>Master</span></h4>
        </DialogHeader>

        <div className='flex flex-col mt-5 gap-3'
          // MARK: OAuth 登录
        >
          <form action={async () => {
            "use server"
            await signIn("github")
            // await InsertUser()
          }} className='w-full'>
            <OAuthButton title="GitHub" />
          </form>
          <form
            action={async () => {
              "use server"
              await signIn("apple")
            }}
          >
            <OAuthButton title="Apple" />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;