import {useRouter} from "next/router";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";

export const NAVIGATION = [
    {name: "Dashboard", href: "/", current: false},
    {name: "Properties", href: "/properties", current: false},
    {name: "Tenants", href: "/tenants", current: false},
];
export const DEFAULT_PROFILE_PIC = {publicUrl: "images/1.jpg"};
export const useAppBarConfig = () => {
    const user = useUser();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();

    const [profilePic, setProfilePic] = useState({...DEFAULT_PROFILE_PIC});

    const navigate = (route) => router.push(route);
    const updateProfilePic = (value) => setProfilePic(value);
    const handleSignOut = async () => supabaseClient.auth.signOut();

    // useEffect(() => {
    //     const userID = user.id;
    //     const {data, error} = supabaseClient
    //         .storage
    //         .from('avatars')
    //         .getPublicUrl(`profile/${userID}`);
    //     if (error) return;

    //     const {data: testData, error: testErr} = supabaseClient
    //         .storage
    //         .listBuckets();
    // }, []);

    return {
        handleSignOut,
        navigate,
        updateProfilePic,
        profilePic,
    }
};
