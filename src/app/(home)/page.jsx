import { RequiredHydrotestTanks } from '@/components/RequiredHydrotestTanks';
import { RequiredInspectionTanks } from '@/components/RequiredInspectionTanks';

const API_URL = process.env.API_URL;

export const revalidate = 300;

export default async function HomePage() {
  const elevenMonthsAgo = new Date();
  elevenMonthsAgo.setMonth(new Date().getMonth() - 11);
  const endLastInspectionDate = elevenMonthsAgo.toISOString();

  const fiftysevenMonthsAgo = new Date();
  fiftysevenMonthsAgo.setMonth(new Date().getMonth() - 57);
  const endLastHydrotestDate = fiftysevenMonthsAgo.toISOString();

  const tanksData_1 = await fetch(
    `${API_URL}/tanks?endLastInspectionDate=${encodeURIComponent(
      endLastInspectionDate
    )}`,
    { next: { revalidate: 300 } }
  );
  const requiredInspectionTanks = await tanksData_1.json();

  const tanksData_2 = await fetch(
    `${API_URL}/tanks?endLastHydrotestDate=${encodeURIComponent(
      endLastHydrotestDate
    )}`,
    { next: { revalidate: 300 } }
  );
  const requiredHydrotestTanks = await tanksData_2.json();

  return (
    <section>
      <RequiredInspectionTanks data={requiredInspectionTanks} />
      <div className='my-8' />
      <RequiredHydrotestTanks data={requiredHydrotestTanks} />
    </section>
  );
}
