import { useEffect, useState } from "react";
import AccountPage from "../containers/HomeContainer/AccountPage";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const Settings = () => {

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [userDetails, setUserDetails] = useState<any>({});
    const fetchProfile = async () => {
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('id, username, full_name, avatar_url, website')
            .eq('id', user?.id);
        if (data && data?.length >= 2) { return null; }
        const userDetailsDb = data?.[0];
        setUserDetails(userDetailsDb);
    };

    useEffect(() => {
        fetchProfile();
    }, [user, fetchProfile]);

    return (
        <AccountPage userDetails={userDetails} />
    );
};

export default Settings;
