import {usePropertyConfig} from "@/components/Properties/Hooks";
import EmptyMaintenance from "@/components/Maintenance/EmptyMaintenance";
import List from "@/components/Maintenance/List";

const Maintenance = () => {
    const  {data} = usePropertyConfig();

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            {data?.length <= 0 ? <EmptyMaintenance/> : <List properties={data}/>}
        </div>
    );
};

export default Maintenance;
