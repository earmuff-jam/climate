import React from "react";
import moment from "moment";
import DetailsTab from "./DetailsTab";

const MaintenanceDetail = (props) => {
  const { data, form, handleChange, handleSelect } = props;
  const isEmpty = data?.length === 0;
  const convertedArray =
    !isEmpty &&
    Object.entries(data[0]).map(([key, value]) => ({
      key,
      value,
      label: key.replace(/_/g, " ").toUpperCase(),
      fromNow: (v) => moment(v).fromNow() || v,
    }));

  return (
    <>
      {isEmpty && (
        <span className="flex justify-center text-center text-gray-500">
          Select or create inspection to begin
        </span>
      )}
      {!isEmpty && (
        <div className="flex flex-col gap-1 ">
          <div className="flex flex-col gap-1 lg:flex-row">
            <div className="flex w-full">
              <table className="table-auto w-full text-sm">
                <thead>
                  <tr>
                    <div className="px-4 py-2 font-bold">
                      Inspection Checklist Detail
                    </div>
                  </tr>
                </thead>
                <tbody>
                  {convertedArray.map((item, index) => {
                    const isDateType = [
                      "INSPECTION DATE",
                      "CREATED ON",
                      "UPDATED ON",
                    ].includes(item.label);
                    return (
                      <tr key={index}>
                        <td className="border px-4 py-2">{item.label}</td>
                        <td className="border px-4 py-2">
                          {isDateType
                            ? moment(item.value).fromNow()
                            : item.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex mt-4">
              <DetailsTab />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaintenanceDetail;
