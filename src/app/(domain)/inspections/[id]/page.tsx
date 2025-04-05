import { notFound } from 'next/navigation';
import { OwnerModel } from '@/models/OwnerModel';
import { getInspection } from '@/actions/inspection-actions';
import { InspectionReport } from '@/components/features/InspectionReport';
import { getTankByInternalNumber } from '@/actions/tank-actions';
import inspectionFormLogo from '/public/inspection_form_logo.jpg';

export default async function InspectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const inspection = await getInspection(id);
  if (!inspection) notFound();

  const tank = await getTankByInternalNumber(inspection.tankNumber);
  if (!tank) notFound();

  const owner: OwnerModel = {
    name: 'Aqua sport',
    phone: '+97208-633-4404',
    address: {
      postalCode: '88107',
      city: 'Eilat',
      street: 'Derech Mitsraim 117',
    },
  };

  return (
    <InspectionReport
      inspection={inspection}
      tank={tank}
      owner={owner}
      logo={inspectionFormLogo}
    />
  );
}
