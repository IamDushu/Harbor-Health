import ItemInfo from "./ItemInfo";
import Card from "./general/Card";

export default function OnDemandCare() {
  return (
    <Card title="Get On-Demand Care">
      <ItemInfo />
      <ItemInfo />
      <ItemInfo bottomBorder={false} />
    </Card>
  );
}
