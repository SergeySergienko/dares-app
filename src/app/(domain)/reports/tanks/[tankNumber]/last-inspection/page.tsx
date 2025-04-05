import { notFound } from 'next/navigation';
import { getLastInspectionByTankNumber } from '@/actions/inspection-actions';
import { InspectionReport } from '@/components/features/InspectionReport';
import inspectionFormLogo from '/public/inspection_form_logo.jpg';

export default async function LastInspectionPage({
  params,
}: {
  params: Promise<{ tankNumber: string }>;
}) {
  const { tankNumber } = await params;
  const report = await getLastInspectionByTankNumber(+tankNumber);
  if (!report.lastInspection.id || !report.tank?.id) notFound();

  const { lastInspection, tank, owner } = report;

  return (
    <InspectionReport
      inspection={lastInspection}
      tank={tank}
      owner={owner}
      logo={inspectionFormLogo}
    />
  );
}
