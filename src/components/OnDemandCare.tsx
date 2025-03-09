import ItemInfo from "./ItemInfo";
import Card from "./general/Card";

export default function OnDemandCare() {
  return (
    <Card title="Get On-Demand Care">
      <ItemInfo
        title="Manage Prescriptions"
        description="Requests and renewals"
      />
      <ItemInfo
        title="Treat Me Now"
        description="In-app help with common issues"
      />
      <ItemInfo
        title="Urgent Video Chat"
        description="Ideal for time-sensitive needs"
      />
    </Card>
  );
}
