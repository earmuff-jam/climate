import React from "react";
import {IconButton, Input, Option, Select, Tooltip, Typography,} from "@material-tailwind/react";
import {InformationCircleIcon} from "@heroicons/react/20/solid";
import MaintenanceList from "@/components/Maintenance/MaintenanceList";
import MaintenanceTabs from "@/components/Maintenance/MaintenanceTabs";
import {useCreateInspectionChecklist, useMaintenanceDetails} from "@/components/Maintenance/Hooks";
import MaintenanceDetail from "@/components/Maintenance/MaintenanceDetail";
import SimpleModal from "@/util/SimpleModal";
import {LinkIcon} from "@heroicons/react/24/outline";
import AddCircleRounded from "@/util/AddCircleRounded";

const MaintenanceForm = (props) => {
    const {
        isLoading,
        isError,
        error,
        data,
        form,
        existingInspections,
        setSelectedDataSheet,
        dataSheet,
        openModal,
        setOpenModal,
        handleChangeInspection,
        handleSelectInspection,
        handleModalClick,
        handleSubmit,
    } = useCreateInspectionChecklist();

    const {
        form: detailForm,
        handleChange: handleDetailChange,
        handleSelect: handleDetailSelect,
        handleModalSubmit,
    } = useMaintenanceDetails();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:block hidden bg-white rounded-md shadow-md p-6 w-full ">
                <form className={"flex flex-col gap-6"}>
                    <Input
                        variant={form.name.variant}
                        label={form.name.label}
                        name={form.name.name}
                        error={form.name.errorMsg.length ?? false}
                        onChange={handleChangeInspection}
                    />
                    {form.name.errorMsg && (
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex flex-row gap-2 align-center text-xs"
                        >
                            <InformationCircleIcon className="w-4 h-4"/>
                            {form.name.errorMsg}
                        </Typography>
                    )}
                    <Input
                        name={form.inspection_date.name}
                        variant={form.inspection_date.variant}
                        label={form.inspection_date.label}
                        error={form.inspection_date.errorMsg.length ?? false}
                        type={form.inspection_date.type}
                        onChange={handleChangeInspection}
                    />
                    {form.inspection_date.errorMsg && (
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex flex-row gap-2 align-center text-xs"
                        >
                            <InformationCircleIcon className="w-4 h-4"/>
                            {form.inspection_date.errorMsg}
                        </Typography>
                    )}
                    <Select
                        name={form.inspection_type.name}
                        variant={form.inspection_type.variant}
                        label={form.inspection_type.label}
                        onChange={(e) => handleSelectInspection(e, form.inspection_type.name)}
                    >
                        {form.inspection_type?.options.map((el, index) => (
                            <Option key={index} value={el}>
                                {el}
                            </Option>
                        ))}
                    </Select>
                    <Input
                        name={form.general_comments.name}
                        variant={form.general_comments.variant}
                        label={form.general_comments.label}
                        type={form.general_comments.type}
                        onChange={handleChangeInspection}
                    />
                    <Input
                        name={form.signature.name}
                        variant={form.signature.variant}
                        label={form.signature.label}
                        type={form.signature.type}
                        error={form.signature.errorMsg.length ?? false}
                        onChange={handleChangeInspection}
                    />
                    {form.signature.errorMsg && (
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex flex-row gap-2 align-center text-xs"
                        >
                            <InformationCircleIcon className="w-4 h-4"/>
                            {form.signature.errorMsg}
                        </Typography>
                    )}
                    <div className="flex flex-row justify-between">
                        <Tooltip content={"Add attachment"}>
                            <IconButton variant="text" color="blue-gray" size="sm">
                                <LinkIcon strokeWidth={2} className="w-4 h-4"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip content={"Create Inspection"}>
                            <IconButton
                                variant="text"
                                color="blue-gray"
                                size="sm"
                                onClick={handleSubmit}
                            >
                                <AddCircleRounded strokeWidth={2} className="w-4 h-4"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </form>
            </div>
            <div className="col-span-2 bg-white rounded-md shadow-md p-6 w-full ">
                <MaintenanceList
                    data={existingInspections}
                    setSelectedDataSheet={setSelectedDataSheet}
                    setOpenModal={setOpenModal}
                />
            </div>
            {openModal && (
                <SimpleModal
                    title={dataSheet?.[0]?.['name']}
                    handleClick={handleModalClick}
                    handleSubmit={handleModalSubmit}
                    showSubmit={true}
                >
                    <MaintenanceDetail
                        data={dataSheet}
                        handleChange={handleDetailChange}
                        handleSelect={handleDetailSelect}
                    />
                </SimpleModal>
            )}
            <div className="col-span-6 bg-white rounded-md shadow-md p-6 w-full ">
                <MaintenanceTabs/>
            </div>
        </div>
    );
};

export default MaintenanceForm;

// nextjs fix for refresh 
// https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization
// https://nextjs.org/docs/pages/api-reference/functions/get-initial-props
MaintenanceForm.getInitialProps = async (ctx) => {
    return {};
};


// const [form, setForm] = useState({
//     name: '',
//     address: '',
//     inspection_date: '',
//     inspection_rooms: [
//         {
//             id: 1,
//             name: "Master Bedroom",
//             condition: "fair",
//             appliances: [
//                 {
//                     id: 1,
//                     name: "Rocking Chair",
//                     condition: "like new",
//                     checkFor: "Regular wear and tear",
//                     lastInspectedOn: now(),
//                 },
//                 {
//                     id: 2,
//                     name: "Mirror Master Bedroom",
//                     condition: "like new",
//                     checkFor: "Regular wear and tear",
//                     lastInspectedOn: now(),
//                 },
//             ]
//         }
//     ],
//     plumbing: [
//         {
//             id: 1,
//             last_inspected_on: now(),
//             condition: "fair",
//             performedMaintenance: false,
//         }
//     ],
//     electrical: [
//         {
//             id: 1,
//             last_inspected_on: now(),
//             condition: "fair",
//             performedMaintenance: false,
//         }
//     ],
//     general_comments: 'House was built in 2021. Except for minor cracks everything works as expected.',
//     signature: 'Ronald Regan III'
// });
