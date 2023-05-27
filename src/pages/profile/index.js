import { useProfileConfig } from "@/components/Auth/Hooks";
import moment from "moment";
import ProfileChips from "@/components/Profile/ProfileChips";
import PrivateLayout from "@/components/Auth/PrivateLayout";

export default function Profile() {
  const { isLoading, isError, error, profileData, submit, handleChange } =
    useProfileConfig();

  if (isLoading) {
    return <span>Loading ...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="m-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Profile Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details of logged in user.
        </p>
        <ProfileChips />
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              First name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="First name"
                    value={profileData?.first_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Last name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Last name"
                    value={profileData?.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              User name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="User Name"
                    value={profileData?.username || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {profileData?.updated_on === null ? "Created" : "Updated"}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profileData?.updated_on === null
                ? moment(profileData?.created_on).fromNow()
                : moment(profileData?.updated_on).fromNow()}
            </dd>
          </div>
        </dl>
        <div className="text-center">
          <button
            type="button"
            onClick={submit}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

Profile.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
