import PrivateLayout from '@/components/Auth/PrivateLayout';
import ProfileDetails from '../../components/Profile/ProfileDetails';

export default function Profile() {
  return (
    <>
      <ProfileDetails />
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
