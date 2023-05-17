const MaintenanceDetail = (props) => {

    const {data} = props;
    const isEmpty = data?.length === 0;
    return (
        <>
            {isEmpty && (<span className="flex justify-center text-center text-gray-500">Select or create inspection to begin</span>)}
            {!isEmpty && (
                <>
                    {JSON.stringify(data)}
                </>
            )}
        </>
    )
};

export default MaintenanceDetail;