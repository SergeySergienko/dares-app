import Image from 'next/image';
import NavLink from './NavLink';

export default function Navigation() {
  return (
    <nav>
      <Image
        src='/inspection_form_logo.jpg'
        alt='inspection form logo'
        width={200}
        height={47}
        priority={true}
      />
      <div className='flex flex-col'>
        <div className='text-2xl font-bold'>DARES</div>
      </div>
      <div>
        <NavLink label='Home' href='/' />
        <NavLink label='Report' href='/report' />
        {/* <NavLink label='Register' href='/register' />
        <NavLink label='Login' href='/login' /> */}
      </div>
    </nav>
  );
}
