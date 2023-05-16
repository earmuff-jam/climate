import {usePropertyConfig} from "@/components/Properties/Hooks";
import EmptyMaintenance from "@/components/Properties/Maintenance/EmptyMaintenance";
import List from "@/components/Properties/Maintenance/List";

const Maintenance = () => {
    const {isLoading, data} = usePropertyConfig();

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            {data?.length <= 0 ? <EmptyMaintenance/> : <List properties={data}/>}
        </div>
    );
};

export default Maintenance;
