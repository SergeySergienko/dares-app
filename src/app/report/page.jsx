const tank = {
  internalNumber: 9,
  serialNumber: 'as0509548',
  manufacturer: '',
  workPressure: undefined,
  material: 'Aluminium',
  volume: 12,
  firstHydrotestDate: '2011-09-29',
  lastHydrotestDate: '2017-11-24',
  lastInspectionDate: '2021-02-23',
  color: '',
  grade: 0,
  manufactureDate: '2011-09-29',
  terminationDate: '',
  createdAt: '2025-01-20',
  updatedAt: '',
};

export default async function Report() {
  return (
    <div className='report'>
      <h1 className='title'>Visual cylinder inspection evaluation form</h1>
      <div className='grid grid-row-2 grid-cols-3 gap-x-6 bg-gray-800 text-yellow-200 p-1'>
        <div className='field'>
          <span>Owner's Name</span>
          <span className='field-value'>Aqua sport</span>
        </div>
        <div className='field'>
          <span>Phone</span>
          <span className='field-value'>+97208-633-4404</span>
        </div>
        <div className='field'>
          <span>Date</span>
          <span className='field-value'>{new Date().toLocaleString('uk')}</span>
        </div>
        <div className='field'>
          <span>City</span>
          <span className='field-value'>Eilat</span>
        </div>
        <div className='field'>
          <span>Address</span>
          <span className='field-value'>Derech Mitsraim 117</span>
        </div>
        <div className='field'>
          <span>Postal code</span>
          <span className='field-value'>88107</span>
        </div>
      </div>

      <div className='grid grid-row-3 grid-cols-3 gap-x-6'>
        <div className='field'>
          <span>Cylinder Work Pressure</span>
          <span className='field-value'>{tank.workPressure}</span>
        </div>
        <div className='field'>
          <span>Manufactured</span>
          <span className='field-value'>{tank.manufacturer}</span>
        </div>
        <div className='field'>
          <span>Volume</span>
          <span className='field-value'>{tank.manufactureDate}</span>
        </div>
        <div className='field'>
          <span>Material</span>
          <span className='field-value'>{tank.material}</span>
        </div>
        <div className='field'>
          <span>First HYDRO</span>
          <span className='field-value'>{tank.firstHydrotestDate}</span>
        </div>
        <div className='field'>
          <span>Last HYDRO</span>
          <span className='field-value'>{tank.lastHydrotestDate}</span>
        </div>
        <div className='field'>
          <span>Man S/N</span>
          <span className='field-value'>{tank.serialNumber}</span>
        </div>
        <div className='field'>
          <span>Internal number</span>
          <span className='field-value'>{tank.internalNumber}</span>
        </div>
        <div className='field'>
          <span>Color</span>
          <span className='field-value'>{tank.color}</span>
        </div>
      </div>

      <h2 className='title-2'>EXTERNAL SURFACE</h2>
      <div>
        <div className='grid grid-row-2 grid-cols-3 gap-x-6'>
          <div className='field'>
            <span>Evidence of heat damage:</span>
            <span className='field-value'>NO</span>
          </div>
          <div className='field'>
            <span>Repainting:</span>
            <span className='field-value'>NO</span>
          </div>
          <div className='field'>
            <span>Odor:</span>
            <span className='field-value'>NO</span>
          </div>
          <div className='field'>
            <span>Bow:</span>
            <span className='field-value'>NO</span>
          </div>
          <div className='field'>
            <span>Bulges:</span>
            <span className='field-value'>NO</span>
          </div>
          <div className='field'>
            <span>Hummer tone test:</span>
            <span className='field-value'>NO</span>
          </div>
        </div>
        <div className='field'>
          <span>Description of external surface:</span>
          <span className='field-value'>No damage found</span>
        </div>
        <div className='field'>
          <span>Gouges, Pits, Marks more than 0.015" (location):</span>
          <span className='field-value'>No damage found</span>
        </div>
        <div className='field'>
          <span>Comparison to PSI Standarts/Manufacturers:</span>
          <span className='field-value'>Acceptable</span>
        </div>
      </div>

      <h2 className='title-2'>INTERNAL SURFACE</h2>
      <div>
        <div className='field'>
          <span>Description (dept and location of pits or cracks):</span>
          <span className='field-value'>No damage found</span>
        </div>
        <div className='field'>
          <span>Comparison to PSI Standarts/Manufacturers:</span>
          <span className='field-value'>Acceptable</span>
        </div>
      </div>

      <h2 className='title-2'>THREADING</h2>
      <div>
        <div className='field'>
          <span>
            Description (cracks assessment, 0-ring gland surface, number of
            threads damage):
          </span>
          <span className='field-value'>No damage found</span>
        </div>
        <div className='field'>
          <span>Comparison to PSI Standarts/Manufacturers:</span>
          <span className='field-value'>Acceptable</span>
        </div>
      </div>

      <h2 className='title-2'>VALVE</h2>
      <div>
        <div className='field'>
          <span>Type:</span>
          <span className='field-value'>YOKE</span>
        </div>
        <div className='grid grid-cols-3 gap-x-6'>
          <div className='field'>
            <span>Burst disk replaced:</span>
            <span className='field-value'>NO</span>
          </div>
          <div className='field'>
            <span>0-ring replaced:</span>
            <span className='field-value'>YES</span>
          </div>
          <div className='field'>
            <span>Deep tube replaced:</span>
            <span className='field-value'>NO</span>
          </div>
        </div>
        <div className='field'>
          <span>Description:</span>
          <span className='field-value'>No damage found</span>
        </div>
      </div>

      <h2 className='title-2'>FINAL CONCLUSION</h2>
      <div className='field'>
        <span>Cylinder condition:</span>
        <span className='field-value'>Acceptable</span>
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <div className='field'>
          <span>Visual inspections sticker affixed:</span>
          <span className='field-value'>NO</span>
        </div>
        <div className='field'>
          <span>(Date)</span>
          <span className='field-value'></span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='field'>
          <span>Inspector's Name, signature:</span>
          <span className='field-value'>Deripalov Andrii</span>
        </div>
        <div className='field'>
          <span>PCI number:</span>
          <span className='field-value'>35823</span>
        </div>
      </div>
    </div>
  );
}
