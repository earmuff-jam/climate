import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export const useMaintenanceConfig = () => {
    const user = useUser();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const [existingInspections, setExistingInspections] = useState([]);
    const [dataSheet, setDataSheet] = useState({});
    const [selectedDataSheet, setSelectedDataSheet] = useState(-1);

    const {id: propertyId} = router.query;

    const fetchInspectionFormList = async () => {
        const {data, error} = await
            supabaseClient.from("inspection")
                .select(`
      property_id,
      name,
      inspection_date,
      inspection_type,
      general_comments,
      signature,
      created_by,
      created_on,
      updated_by,
      updated_on,
      sharable_groups
    `).eq('property_id', propertyId);
        if (error) return;
        setExistingInspections(data);
    };

    const {isLoading, isError, error, data} = useQuery(
        "inspectionData",
        fetchInspectionFormList
    );

    const upsert = async (form) => {
        const {err} =
            await supabaseClient.from("inspection").insert(
                {
                    property_id: propertyId,
                    name: form.name.value,
                    inspection_date: form.inspection_date.value,
                    inspection_type: form.inspection_type.value,
                    general_comments: form.general_comments.value,
                    signature: form.signature.value,
                    created_by: user.id,
                    sharable_groups: [user.id],
                },
                {upsert: true}
            );
        if (err) return;
        await router.reload();
    };

    useEffect(() => {
        const selectedInspection = existingInspections.filter((el, index) => (index === selectedDataSheet));
        setDataSheet(selectedInspection);
    }, [selectedDataSheet]);

    return {
        isLoading,
        isError,
        error,
        data,
        upsert,
        existingInspections,
        setSelectedDataSheet,
        selectedDataSheet,
        dataSheet,
    };
}