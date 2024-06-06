import PrivateLayout from '@/components/Auth/PrivateLayout';
import MaintenancePlan from '@/components/Plan/MaintenancePlan';

const Maintenance = () => {
  return (
    <>
      <MaintenancePlan />
    </>
  );
};

export default Maintenance;

Maintenance.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
