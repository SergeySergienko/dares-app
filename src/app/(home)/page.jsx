import { TankTable } from '@/components/TankTable';

const API_URL = process.env.API_URL;

export default async function HomePage() {
  const elevenMonthsAgo = new Date();
  elevenMonthsAgo.setMonth(new Date().getMonth() - 11);
  const endLastInspectionDate = elevenMonthsAgo.toISOString();

  const data = await fetch(
    // `${API_URL}/tanks`
    `${API_URL}/tanks?endLastInspectionDate=${encodeURIComponent(
      endLastInspectionDate
    )}`
  );
  const tanks = await data.json();
  return (
    <section>
      <TankTable data={tanks} />
    </section>
  );
}
