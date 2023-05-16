const MaintenanceList = (props) => {

    const {data} = props;
    const isEmpty = data?.length === 0;
    return (
        <>
            {isEmpty && (<span className="flex justify-center text-center">Sorry no matching inspections found.</span>)}
        </>
    )
};

export default MaintenanceList;