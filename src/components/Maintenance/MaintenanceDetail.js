import React from "react";
import {InformationCircleIcon} from "@heroicons/react/20/solid";
import {Input, Option, Select, Typography} from "@material-tailwind/react";
import moment from "moment";

const MaintenanceDetail = (props) => {
    const {data, form, handleChange, handleSelect} = props;
    const isEmpty = data?.length === 0;
    const convertedArray = !isEmpty &&
        Object.entries(data[0]).map(([key, value]) => ({
            key,
            value,
            label: key.replace(/_/g, ' ').toUpperCase(),
            fromNow: (v) => moment(v).fromNow() || v,
        }));

    return (
        <>
            {isEmpty && (<span className="flex justify-center text-center text-gray-500">Select or create inspection to begin</span>)}
            {!isEmpty && (
                <div className="flex flex-col gap-1 ">
                    <div className="flex flex-col gap-1 lg:flex-row">
                        <div className="flex w-full">
                            <table className="table-auto w-full text-sm">
                                <thead>
                                <tr>
                                    <div className="px-4 py-2 font-bold">Inspection Checklist Detail</div>
                                </tr>
                                </thead>
                                <tbody>
                                {convertedArray.map((item, index) => {
                                        const isDateType = ['INSPECTION DATE', 'CREATED ON', 'UPDATED ON'].includes(item.label);
                                        return (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{item.label}</td>
                                                <td className="border px-4 py-2">{isDateType ? moment(item.value).fromNow() : (item.value)}</td>
                                            </tr>
                                        )
                                    }
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className=" p-4 flex flex-col gap-10 w-full">
                            <div>
                                <Input
                                    name={form.issue_details.name}
                                    variant={form.issue_details.variant}
                                    label={form.issue_details.label}
                                    type={form.issue_details.type}
                                    error={form.issue_details.errorMsg.length ?? false}
                                    onChange={handleChange}
                                />
                                {form.issue_details.errorMsg && (
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex flex-row gap-2 align-center text-xs"
                                    >
                                        <InformationCircleIcon className="w-4 h-4"/>
                                        {form.issue_details.errorMsg}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Input
                                    name={form.issue_description.name}
                                    variant={form.issue_description.variant}
                                    label={form.issue_description.label}
                                    type={form.issue_description.type}
                                    error={form.issue_description.errorMsg.length ?? false}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Input
                                    name={form.maintenance_log_details.name}
                                    variant={form.maintenance_log_details.variant}
                                    label={form.maintenance_log_details.label}
                                    type={form.maintenance_log_details.type}
                                    error={form.maintenance_log_details.errorMsg.length ?? false}
                                    onChange={handleChange}
                                />
                                {form.maintenance_log_details.errorMsg && (
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex flex-row gap-2 align-center text-xs"
                                    >
                                        <InformationCircleIcon className="w-4 h-4"/>
                                        {form.maintenance_log_details.errorMsg}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Input
                                    name={form.maintenance_log_description.name}
                                    variant={form.maintenance_log_description.variant}
                                    label={form.maintenance_log_description.label}
                                    type={form.maintenance_log_description.type}
                                    error={form.maintenance_log_description.errorMsg.length ?? false}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Input
                                    name={form.work_order_details.name}
                                    variant={form.work_order_details.variant}
                                    label={form.work_order_details.label}
                                    type={form.work_order_details.type}
                                    error={form.work_order_details.errorMsg.length ?? false}
                                    onChange={handleChange}
                                />
                                {form.work_order_details.errorMsg && (
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex flex-row gap-2 align-center text-xs"
                                    >
                                        <InformationCircleIcon className="w-4 h-4"/>
                                        {form.work_order_details.errorMsg}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Input
                                    name={form.work_order_description.name}
                                    variant={form.work_order_description.variant}
                                    label={form.work_order_description.label}
                                    type={form.work_order_description.type}
                                    error={form.work_order_description.errorMsg.length ?? false}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Select
                                    name={form.overall_maintenance_status.name}
                                    variant={form.overall_maintenance_status.variant}
                                    label={form.overall_maintenance_status.label}
                                    onChange={(e) => handleSelect(e, form.overall_maintenance_status.name)}
                                >
                                    {form.overall_maintenance_status?.options.map((el, index) => (
                                        <Option key={index} value={el}>
                                            {el}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                    </div>
                </div>
            )}
        </>
    )
};

export default MaintenanceDetail;