import PrivateLayout from '@/components/Auth/PrivateLayout';

const Maintenance = () => {
  return <div>maintenance</div>;
};

export default Maintenance;

Maintenance.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
