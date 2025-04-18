import { InspectionOutputDTO } from '@/models/InspectionModel';
import { OwnerModel } from '@/models/OwnerModel';
import { TankOutputDTO } from '@/models/TankModel';
import Image, { StaticImageData } from 'next/image';

const assignValue = (value: boolean | undefined) => (value ? 'YES' : 'NO');

type Props = {
  inspection: InspectionOutputDTO;
  tank: TankOutputDTO;
  owner: OwnerModel;
  logo?: StaticImageData;
};

export const InspectionReport = ({
  inspection: i,
  tank: t,
  owner: o,
  logo,
}: Props) => (
  <div className='report'>
    {logo && (
      <div className='flex justify-between items-center'>
        <Image src={logo} alt='inspection_form_logo' placeholder='blur' />
      </div>
    )}
    <div>
      <h1 className='title'>Visual cylinder inspection evaluation form</h1>
      <div className='grid grid-cols-2 xs:grid-cols-3 gap-x-6 bg-primary text-yellow-200 p-1'>
        <div className='field -order-3 xs:order-none'>
          <span>Owner&#39;s Name:</span>
          <span className='field-value'>{o.name}</span>
        </div>
        <div className='field -order-1 xs:order-none'>
          <span>Phone:</span>
          <span className='field-value'>{o.phone}</span>
        </div>
        <div className='field -order-2 xs:order-none'>
          <span>Date:</span>
          <span className='field-value'>
            {new Date(i.date).toLocaleDateString('uk')}
          </span>
        </div>
        <div className='field'>
          <span>City:</span>
          <span className='field-value'>{o.address.city}</span>
        </div>
        <div className='field'>
          <span>Address:</span>
          <span className='field-value'>{o.address.street}</span>
        </div>
        <div className='field'>
          <span>Postal code:</span>
          <span className='field-value'>{o.address.postalCode}</span>
        </div>
      </div>
      <div className='grid grid-cols-2 xs:grid-row-3 xs:grid-cols-3 gap-x-6'>
        <div className='field'>
          <span>Cylinder Work Pressure:</span>
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
          <span>First HYDRO:</span>
          <span className='field-value'>
            {t.firstHydrotestDate.toLocaleDateString('uk')}
          </span>
        </div>
        <div className='field'>
          <span>Last HYDRO:</span>
          <span className='field-value'>
            {t.lastHydrotestDate.toLocaleDateString('uk')}
          </span>
        </div>
        <div className='field'>
          <span>Man S/N:</span>
          <span className='field-value'>{t.serialNumber}</span>
        </div>
        <div className='field'>
          <span>Internal number:</span>
          <span className='field-value'>{t.internalNumber}</span>
        </div>
        <div className='field'>
          <span>Color:</span>
          <span className='field-value'>{t.color}</span>
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
            <span className='field-value'>{assignValue(i.external?.odor)}</span>
          </div>
          <div className='field'>
            <span>Bow:</span>
            <span className='field-value'>{assignValue(i.external?.bow)}</span>
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
          <span className='field-title'>Description of external surface:</span>
          <span className='field-value'>
            {i.external?.description || 'No damage found'}
          </span>
        </div>
        <div className='field'>
          <span className='field-title'>
            Gouges, Pits, Marks more than 0.015&#34; (location):
          </span>
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
          <span className='field-title'>
            Description (dept and location of pits or cracks):
          </span>
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
          <span className='field-title'>
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
          <span className='field-value'>{i.valve?.type}</span>
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
            <span>Dip tube replaced:</span>
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
            {i.stickerAffixed ? new Date(i.date).toLocaleDateString('uk') : ''}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <div className='field'>
          <span>Inspector&#39;s Name:</span>
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
