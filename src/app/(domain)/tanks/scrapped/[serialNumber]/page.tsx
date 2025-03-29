import Image from 'next/image';
import scrapped from '/public/scrapped.jpg';
import { getScrappedTankBySerialNumber } from '@/actions/tank-actions';
import { notFound } from 'next/navigation';

export default async function ScrappedTankCardPage({
  params,
}: {
  params: Promise<{ serialNumber: string }>;
}) {
  const serialNumber = (await params).serialNumber;
  const t = await getScrappedTankBySerialNumber(serialNumber);
  if (!t) notFound();

  return (
    <div className='report gap-y-8'>
      <div className='flex justify-between items-center'>
        <Image src={scrapped} alt='scrapped' placeholder='blur' />
      </div>
      <div>
        <h1 className='title'>Scrapped Tank Card</h1>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 xs:gap-y-6'>
        <div className='field'>
          <span>Work Pressure:</span>
          <span className='field-value'>{t.workPressure}</span>
        </div>
        <div className='field'>
          <span>Manufactured:</span>
          <span className='field-value'>{t.manufacturer}</span>
        </div>
        <div className='field'>
          <span>Volume:</span>
          <span className='field-value'>{t.volume}L</span>
        </div>
        <div className='field'>
          <span>Material:</span>
          <span className='field-value'>{t.material}</span>
        </div>
        <div className='field'>
          <span>Serial Number:</span>
          <span className='field-value'>{t.serialNumber}</span>
        </div>
        <div className='field'>
          <span>Color:</span>
          <span className='field-value'>{t.color}</span>
        </div>
        <div className='field'>
          <span>Filling type:</span>
          <span className='field-value'>{t.fillingType}</span>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div>
          <div className='font-bold'>Visual Inspections</div>
          <>
            {t.inspectionList.map(({ _id, date, tankVerdict }) => (
              <div key={_id.toString()}>
                {date.toLocaleDateString('uk')} - {tankVerdict}
              </div>
            ))}
          </>
        </div>
        <div>
          <div className='font-bold'>Inventories</div>
          <>
            {t.inventoryList.map(({ _id, date, tankStatus }) => (
              <div key={_id.toString()}>
                {date.toLocaleDateString('uk')} - {tankStatus}
              </div>
            ))}
          </>
        </div>
        <div>
          <div className='font-bold'>Hydrotests</div>
          <>
            {t.hydrotestList.map(({ _id, endDate, tankVerdict }) => (
              <div key={_id.toString()}>
                {endDate?.toLocaleDateString('uk')} - {tankVerdict}
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}
