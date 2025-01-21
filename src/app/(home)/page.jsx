import NavLink from '@/components/NavLink';

export default function HomePage() {
  return (
    <section>
      {/* <p className='mb-2 text-lg'>
        Web application for accounting and maintenance of diving equipment.
      </p>
      <p className='text-lg'>Created using NextJS and Tailwind CSS</p> */}
      <label htmlFor='internalNumber'>Internal tank number</label>
      <div>
        <input
          id='internalNumber'
          type='number'
          name='internalNumber'
          placeholder='Tank number'
        />
        <button>
          <NavLink label='Report' href='/report' />
        </button>
      </div>
    </section>
  );
}
