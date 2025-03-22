import Image from 'next/image';
import formLogo from '/public/inspection_form_logo.jpg';
import { getTankByInternalNumber } from '@/actions/tank-actions';
import { Button } from '@/components/ui/button';
import { DeleteTankDialog } from '@/components/composites/DeleteTankDialog';
import { DatabaseBackup } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function TankCardPage({
  params,
}: {
  params: Promise<{ internalNumber: string }>;
}) {
  const internalNumber = Number((await params).internalNumber);
  const t = await getTankByInternalNumber(internalNumber);
  if (!t) notFound();

  const hasStatus = !!t.status;
  const isTestTank = /test|fake|mock/i.test(t.serialNumber);
  const disabled = !isTestTank && hasStatus;

  return (
    <div className='report xs:gap-y-8'>
      <div className='flex justify-between items-center'>
        <Image src={formLogo} alt='inspection form logo' placeholder='blur' />
      </div>
      <div>
        <h1 className='title'>Tank Card</h1>
      </div>
      <div className='grid grid-cols-2 md:grid-row-3 md:grid-cols-3 gap-x-6 xs:gap-y-6'>
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
          <span>First Hydrotest Date:</span>
          <span className='field-value'>
            {new Date(t.firstHydrotestDate).toLocaleDateString('uk')}
          </span>
        </div>
        <div className='field'>
          <span>Last Hydrotest Date:</span>
          <span className='field-value'>
            {new Date(t.lastHydrotestDate).toLocaleDateString('uk')}
          </span>
        </div>
        <div className='field'>
          <span>Serial Number:</span>
          <span className='field-value'>{t.serialNumber}</span>
        </div>
        <div className='field'>
          <span>Internal Number:</span>
          <span className='field-value'>{t.internalNumber}</span>
        </div>
        <div className='field'>
          <span>Color:</span>
          <span className='field-value'>{t.color}</span>
        </div>
        <div className='field'>
          <span>Filling type:</span>
          <span className='field-value'>{t.fillingType}</span>
        </div>
        <div className='field'>
          <span>Grade:</span>
          <span className='field-value'>{t?.grade}</span>
        </div>
        <div className='field'>
          <span>Status:</span>
          <span className='field-value'>{t.status}</span>
        </div>
        <div className='field'>
          <span>Valve:</span>
          <span className='field-value'>{t.valve}</span>
        </div>
        <div className='field'>
          <span>Last Inspection Date:</span>
          <span className='field-value'>
            {t.lastInspectionDate &&
              new Date(t.lastInspectionDate).toLocaleDateString('uk')}
          </span>
        </div>
        <div className='field'>
          <span>Last Inventory Date:</span>
          <span className='field-value'>
            {t.lastInventoryDate &&
              new Date(t.lastInventoryDate).toLocaleDateString('uk')}
          </span>
        </div>
      </div>

      <div className='flex flex-row justify-between mt-16'>
        <div className='flex gap-x-4'>
          {internalNumber > 5 ? (
            <Button disabled>
              <DatabaseBackup />
              Send to scrap
            </Button>
          ) : (
            <Link href={`/terminations/create/${internalNumber}`}>
              <Button>
                <DatabaseBackup />
                Send to scrap
              </Button>
            </Link>
          )}
          {<DeleteTankDialog id={t.id} disabled={disabled} />}
        </div>
      </div>
    </div>
  );
}
