import { notFound } from 'next/navigation';
import Image from 'next/image';
import formLogo from '/public/inspection_form_logo.jpg';
import { getRepair } from '@/actions/repair-actions';
import { getParts } from '@/actions/part-actions';
import { PartOutputDTO } from '@/models/PartModel';
import Link from 'next/link';

export default async function TankCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const repair = await getRepair(id);
  if (!repair) notFound();

  const usedParts: {
    part: PartOutputDTO;
    amount: number;
  }[] = await Promise.all(
    Object.entries(repair.parts).map(async ([alias, amount]) => {
      const [part] = await getParts({ alias });
      return { part, amount };
    })
  );

  return (
    <div className='report gap-y-8'>
      <div className='flex justify-between items-center'>
        <Image src={formLogo} alt='inspection form logo' placeholder='blur' />
      </div>
      <div>
        <h1 className='title'>Repair Card</h1>
      </div>
      <div className='grid grid-cols-2 gap-x-6 xs:gap-y-6'>
        <div className='field'>
          <span>Tank:</span>
          <span className='field-value'>{repair.tankNumber}</span>
        </div>
        <div className='field'>
          <span>Date:</span>
          <span className='field-value'>
            {new Date(repair.date).toLocaleDateString('uk')}
          </span>
        </div>
        <div className='field'>
          <span>Executor:</span>
          <span className='field-value'>{repair.executor}</span>
        </div>
      </div>
      <div className='bg-slate-50 md:max-w-xl'>
        <div className='font-semibold'>Used parts</div>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='font-medium'>I/N</th>
              <th className='font-medium'>Title</th>
              <th className='font-medium'>Catalog number</th>
              <th className='font-medium'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {usedParts.map(
              ({ part: { id, itemNumber, title, catalogNumber }, amount }) => (
                <tr key={id}>
                  <td className='text-center'>
                    <Link href={`/parts/${itemNumber}`}>
                      <span className='p-1 underline hover:no-underline hover:font-bold hover:bg-slate-300 print:no-underline'>
                        {itemNumber}
                      </span>
                    </Link>
                  </td>
                  <td className='text-center'>{title}</td>
                  <td className='text-center'>{catalogNumber}</td>
                  <td className='text-center'>{amount}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
