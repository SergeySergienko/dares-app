import Image from 'next/image';
import { getInspectionByTankNumber } from '@/actions/inspection';
import formLogo from '/public/inspection_form_logo.jpg';

const assignValue = (value) => (value ? 'YES' : 'NO');

export const dynamic = 'force-dynamic';

export default async function InspectionReport({ params }) {
  const { tankNumber } = await params;
  const i = await getInspectionByTankNumber(tankNumber);
  if (!i.id) throw new Error(i.message);

  return (
    <div className='report'>
      <div className='flex justify-between items-center'>
        <Image src={formLogo} alt='inspection form logo' placeholder='blur' />
      </div>
      <div>
        <h1 className='title'>Visual cylinder inspection evaluation form</h1>
        <div className='grid grid-cols-2 xs:grid-cols-3 gap-x-6 bg-primary text-yellow-200 p-1'>
          <div className='field -order-3 xs:order-none'>
            <span>Owner's Name:</span>
            <span className='field-value'>Aqua sport</span>
          </div>
          <div className='field -order-1 xs:order-none'>
            <span>Phone:</span>
            <span className='field-value'>+97208-633-4404</span>
          </div>
          <div className='field -order-2 xs:order-none'>
            <span>Date:</span>
            <span className='field-value'>
              {new Date(i.date).toLocaleDateString('uk')}
            </span>
          </div>
          <div className='field'>
            <span>City:</span>
            <span className='field-value'>Eilat</span>
          </div>
          <div className='field'>
            <span>Address:</span>
            <span className='field-value'>Derech Mitsraim 117</span>
          </div>
          <div className='field'>
            <span>Postal code:</span>
            <span className='field-value'>88107</span>
          </div>
        </div>
        <div className='grid grid-cols-2 xs:grid-row-3 xs:grid-cols-3 gap-x-6'>
          <div className='field'>
            <span>Cylinder Work Pressure:</span>
            <span className='field-value'>{i.tank.workPressure}</span>
          </div>
          <div className='field'>
            <span>Manufactured:</span>
            <span className='field-value'>{i.tank.manufacturer}</span>
          </div>
          <div className='field'>
            <span>Volume:</span>
            <span className='field-value'>{i.tank.volume}L</span>
          </div>
          <div className='field'>
            <span>Material:</span>
            <span className='field-value'>{i.tank.material}</span>
          </div>
          <div className='field'>
            <span>First HYDRO:</span>
            <span className='field-value'>
              {new Date(i.tank.firstHydrotestDate).toLocaleDateString('uk')}
            </span>
          </div>
          <div className='field'>
            <span>Last HYDRO:</span>
            <span className='field-value'>
              {new Date(i.tank.lastHydrotestDate).toLocaleDateString('uk')}
            </span>
          </div>
          <div className='field'>
            <span>Man S/N:</span>
            <span className='field-value'>{i.tank.serialNumber}</span>
          </div>
          <div className='field'>
            <span>Internal number:</span>
            <span className='field-value'>{i.tank.internalNumber}</span>
          </div>
          <div className='field'>
            <span>Color:</span>
            <span className='field-value'>{i.tank.color}</span>
          </div>
        </div>
        <h2 className='title-2'>EXTERNAL SURFACE</h2>
        <div>
          <div className='grid grid-cols-2 xs:grid-row-2 xs:grid-cols-3 gap-x-6'>
            <div className='field'>
              <span>Evidence of heat damage:</span>
              <span className='field-value'>
                {assignValue(i.external?.heatDamage)}
              </span>
            </div>
            <div className='field'>
              <span>Repainting:</span>
              <span className='field-value'>
                {assignValue(i.external?.repainting)}
              </span>
            </div>
            <div className='field'>
              <span>Odor:</span>
              <span className='field-value'>
                {assignValue(i.external?.odor)}
              </span>
            </div>
            <div className='field'>
              <span>Bow:</span>
              <span className='field-value'>
                {assignValue(i.external?.bow)}
              </span>
            </div>
            <div className='field'>
              <span>Bulges:</span>
              <span className='field-value'>
                {assignValue(i.external?.bulges)}
              </span>
            </div>
            <div className='field'>
              <span>Hummer tone test:</span>
              <span className='field-value'>
                {assignValue(i.external?.hammerToneTest)}
              </span>
            </div>
          </div>
          <div className='field'>
            <span>Description of external surface:</span>
            <span className='field-value'>
              {i.external?.description || 'No damage found'}
            </span>
          </div>
          <div className='field'>
            <span>Gouges, Pits, Marks more than 0.015" (location):</span>
            <span className='field-value'>
              {i.external?.damageLocation || 'No damage found'}
            </span>
          </div>
          <div className='field'>
            <span>Comparison to PSI Standarts/Manufacturers:</span>
            <span className='field-value'>
              {i.external?.verdict || 'Acceptable'}
            </span>
          </div>
        </div>
        <h2 className='title-2'>INTERNAL SURFACE</h2>
        <div>
          <div className='field'>
            <span>Description (dept and location of pits or cracks):</span>
            <span className='field-value'>
              {i.internal?.description || 'No damage found'}
            </span>
          </div>
          <div className='field'>
            <span>Comparison to PSI Standarts/Manufacturers:</span>
            <span className='field-value'>
              {i.internal?.verdict || 'Acceptable'}
            </span>
          </div>
        </div>
        <h2 className='title-2'>THREADING</h2>
        <div>
          <div className='field'>
            <span>
              Description (cracks assessment, 0-ring gland surface, number of
              threads damage):
            </span>
            <span className='field-value'>
              {i.threading?.description || 'No damage found'}
            </span>
          </div>
          <div className='field'>
            <span>Comparison to PSI Standarts/Manufacturers:</span>
            <span className='field-value'>
              {i.threading?.verdict || 'Acceptable'}
            </span>
          </div>
        </div>
        <h2 className='title-2'>VALVE</h2>
        <div>
          <div className='field'>
            <span>Type:</span>
            <span className='field-value'>
              {i.valve?.type || i.tank?.valve || 'Unknown'}
            </span>
          </div>
          <div className='grid grid-cols-2 xs:grid-cols-3 gap-x-6'>
            <div className='field'>
              <span>Burst disk replaced:</span>
              <span className='field-value'>
                {assignValue(i.valve?.burstDiskReplaced)}
              </span>
            </div>
            <div className='field'>
              <span>0-ring replaced:</span>
              <span className='field-value'>
                {i.valve?.oRingReplaced === false ? 'NO' : 'YES'}
              </span>
            </div>
            <div className='field'>
              <span>Deep tube replaced:</span>
              <span className='field-value'>
                {assignValue(i.valve?.dipTubeReplaced)}
              </span>
            </div>
          </div>
          <div className='field'>
            <span>Description:</span>
            <span className='field-value'>
              {i.valve?.description || 'No damage found'}
            </span>
          </div>
        </div>
        <h2 className='title-2'>FINAL CONCLUSION</h2>
        <div className='field'>
          <span>Cylinder condition:</span>
          <span className='field-value'>{i.tankVerdict}</span>
        </div>
        <div className='grid grid-cols-2 gap-6'>
          <div className='field'>
            <span>Visual inspections sticker affixed:</span>
            <span className='field-value'>{assignValue(i.stickerAffixed)}</span>
          </div>
          <div className='field'>
            <span>(Date)</span>
            <span className='field-value'>
              {i.stickerAffixed
                ? new Date(i.date).toLocaleDateString('uk')
                : ''}
            </span>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-6'>
          <div className='field'>
            <span>Inspector's Name:</span>
            <span className='field-value'>{i.inspector.name}</span>
          </div>
          <div className='field'>
            <span>PCI number:</span>
            <span className='field-value'>{i.inspector.pciNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
