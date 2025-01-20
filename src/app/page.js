export default function HomePage() {
  return (
    <div className='flex flex-col justify-evenly items-center min-h-screen bg-gray-100 text-center'>
      <header className='w-full bg-gray-800 text-white py-5'>
        <h1 className='text-4xl font-bold'>DARES</h1>
        <p>Trust the Professionals</p>
      </header>

      <section className='text-gray-800 p-5'>
        <p className='mb-2 text-lg'>
          Web application for accounting and maintenance of diving equipment.
        </p>
        <p className='text-lg'>Created using NextJS and Tailwind CSS</p>
      </section>
    </div>
  );
}
