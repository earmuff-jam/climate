const MaintenanceList = (props) => {
    const {data, setSelectedDataSheet, setOpenModal} = props;
    const isEmpty = data?.length === 0;
    return (
        <>
            {isEmpty && (<span className="flex justify-center text-center text-gray-500">Sorry no matching inspections found.</span>)}
            {!isEmpty && (
                <>
                    <div className="p-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Inspection Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Inspection Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        General Comments
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Signature
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-xs">
                                {data.map((item, index) => (
                                    <tr 
                                    key={index} 
                                    onClick={() => {
                                        setSelectedDataSheet(index);
                                        setOpenModal(true);
                                    }}>
                                        <td className="px-6 py-2 md:py-4 whitespace-nowrap">{item.name}</td>
                                        <td className="px-6 py-2 md:py-4 whitespace-nowrap">{item.inspection_date}</td>
                                        <td className="px-6 py-2 md:py-4 whitespace-nowrap">{item.inspection_type}</td>
                                        <td className="px-6 py-2 md:py-4 whitespace-nowrap">{item.general_comments}</td>
                                        <td className="px-6 py-2 md:py-4 whitespace-nowrap">{item.signature}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

export default MaintenanceList;