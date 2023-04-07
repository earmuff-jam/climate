import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@emotion/react";
import AccountPage from "../containers/HomeContainer/AccountPage";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "100%",
        marginTop: "0.2rem",
    },
    formControl: {
        width: "100%",
    },
}));

const Settings = () => {

    const user = useUser();
    const theme = useTheme();
    const classes = useStyles(theme);
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
    }, [user]);

    return (
        <AccountPage userDetails={userDetails} />
    );
};

export default Settings;
