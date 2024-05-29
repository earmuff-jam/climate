// import { useQuery } from "react-query";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { ADD_MAINTENANCE_FORM } from "@/components/Maintenance/constants";
// import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
// import { DEFAULT_DETAILS_TAB_FORM } from "@/components/Maintenance/constants";

// /**
//  * this hook is used to create inspection checklist forms.
//  *
//  */
// export const useCreateInspectionChecklist = () => {
//   const user = useUser();
//   const router = useRouter();
//   const supabaseClient = useSupabaseClient();

//   const { id: propertyId } = router.query;

//   const [dataSheet, setDataSheet] = useState({});
//   const [openModal, setOpenModal] = useState(false);
//   const [form, setForm] = useState(ADD_MAINTENANCE_FORM);
//   const [selectedDataSheet, setSelectedDataSheet] = useState(-1);
//   const [existingInspections, setExistingInspections] = useState([]);

//   const handleModalClick = () => setOpenModal(!openModal);
//   const handleChangeInspection = (event) => {
//     const { name, value } = event.target;
//     const newForm = { ...form };
//     newForm[name].value = value;
//     newForm[name].errorMsg = newForm[name]?.validators?.reduce(
//       (acc, el, index, arr) => {
//         el.validate(value) ? (acc = el.message) : null;
//         return acc;
//       },
//       ""
//     );
//     setForm({ ...newForm });
//   };
//   const handleSelectInspection = (item, type) => {
//     const newForm = { ...form };
//     newForm[type].value = item;
//     newForm[type].errorMsg = newForm[type].validators.reduce(
//       (acc, el, index, arr) => {
//         el.validate(item) ? (acc = el.message) : null;
//         return acc;
//       },
//       ""
//     );
//     setForm({ ...newForm });
//   };
//   const fetchInspectionFormList = async () => {
//     const { data, error } = await supabaseClient
//       .from("inspection")
//       .select(
//         `
//       property_id,
//       name,
//       inspection_date,
//       inspection_type,
//       general_comments,
//       signature,
//       created_by,
//       created_on,
//       updated_by,
//       updated_on,
//       sharable_groups
//     `
//       )
//       .eq("property_id", propertyId);
//     if (error) return;
//     setExistingInspections(data);
//   };

//   const resetData = () => {
//     setForm({ ...ADD_MAINTENANCE_FORM });
//   };

//   const { isLoading, isError, error, data } = useQuery(
//     "inspectionData",
//     fetchInspectionFormList
//   );

//   const upsert = async (form) => {
//     const { err } = await supabaseClient.from("inspection").insert(
//       {
//         property_id: propertyId,
//         name: form.name.value,
//         inspection_date: form.inspection_date.value,
//         inspection_type: form.inspection_type.value,
//         general_comments: form.general_comments.value,
//         signature: form.signature.value,
//         created_by: user.id,
//         sharable_groups: [user.id],
//       },
//       { upsert: true }
//     );
//     if (err) return;
//     router.reload();
//   };

//   const handleSubmit = async () => {
//     const emptyErrorMsg = Object.values(form)
//       .map((v, index) => v.errorMsg)
//       .filter(Boolean);
//     const requiredFields = Object.values(form)
//       .map((v) => v.required)
//       .filter(Boolean);
//     const requiredFilledFields = Object.values(form)
//       .filter((v) => v.required)
//       .map((v) => v.value)
//       .filter(Boolean);
//     // no errors present
//     if (emptyErrorMsg.length === 0) {
//       if (requiredFilledFields.length === requiredFields.length) {
//         await upsert(form);
//       }
//     }
//     resetData();
//   };

//   const handleRoomChange = (index, field, value) => {
//     setForm((prevForm) => {
//       const updatedRooms = [...prevForm.rooms];
//       updatedRooms[index] = {
//         ...updatedRooms[index],
//         [field]: value,
//       };
//       return {
//         ...prevForm,
//         rooms: updatedRooms,
//       };
//     });
//   };
//   const handleApplianceChange = (index, field, value) => {
//     setForm((prevForm) => {
//       const updatedAppliances = [...prevForm.appliances];
//       updatedAppliances[index] = {
//         ...updatedAppliances[index],
//         [field]: value,
//       };
//       return {
//         ...prevForm,
//         appliances: updatedAppliances,
//       };
//     });
//   };
//   const handlePlumbingChange = (field, value) => {
//     setForm((prevForm) => ({
//       ...prevForm,
//       plumbing: {
//         ...prevForm.plumbing,
//         [field]: value,
//       },
//     }));
//   };
//   const handleElectricalChange = (field, value) => {
//     setForm((prevForm) => ({
//       ...prevForm,
//       electrical: {
//         ...prevForm.electrical,
//         [field]: value,
//       },
//     }));
//   };

//   useEffect(() => {
//     const selectedInspection = existingInspections.filter(
//       (el, index) => index === selectedDataSheet
//     );
//     setDataSheet(selectedInspection);
//   }, [selectedDataSheet]);

//   return {
//     isLoading,
//     isError,
//     error,
//     data,
//     form,
//     upsert,
//     existingInspections,
//     setSelectedDataSheet,
//     selectedDataSheet,
//     dataSheet,
//     openModal,
//     setOpenModal,
//     handleChangeInspection,
//     handleSelectInspection,
//     handleModalClick,
//     resetData,
//     handleSubmit,
//   };
// };

// /**
//  * this hook is used to add more details like issues, work orders or even maintenance logs for the maintenance form of each property.
//  *
//  */
// export const useMaintenanceDetails = () => {
//   const user = useUser();
//   const supabaseClient = useSupabaseClient();

//   const [selected, setSelected] = useState("");
//   const [form, setForm] = useState(DEFAULT_DETAILS_TAB_FORM);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     const topLevelNames = form.flatMap((item) =>
//       Object.values(item.data).map((nestedItem) => nestedItem.name)
//     );

//     if (topLevelNames.includes(name)) {
//       const newForm = form.map((item) => {
//         const updatedData = { ...item.data };
//         if (updatedData.details.name === name) {
//           updatedData.details.value = value;
//           updatedData.details.errorMsg = updatedData.details.validators.reduce(
//             (acc, el) => {
//               if (el.validate(value)) {
//                 acc = el.message;
//               }
//               return acc;
//             },
//             ""
//           );
//         } else if (updatedData.description.name === name) {
//           updatedData.description.value = value;
//           updatedData.description.errorMsg =
//             updatedData.description.validators.reduce((acc, el) => {
//               if (el.validate(value)) {
//                 acc = el.message;
//               }
//               return acc;
//             }, "");
//         }
//         return { ...item, data: updatedData };
//       });
//       setForm(newForm);
//       return;
//     }

//     const newForm = form.map((item) => {
//       const updatedData = { ...item.data };
//       Object.values(updatedData).forEach((nestedItem) => {
//         if (nestedItem.name === name) {
//           nestedItem.value = value;
//           nestedItem.errorMsg = nestedItem.validators.reduce((acc, el) => {
//             if (el.validate(value)) {
//               acc = el.message;
//             }
//             return acc;
//           }, "");
//         }
//       });
//       return { ...item, data: updatedData };
//     });
//     setForm(newForm);
//   };

//   const validator = (formFields) => {
//     const isValid = formFields.map((formField) => {
//       let formFieldValid = true;
//       // only check against err msg because fields can be empty
//       // if (formField.required && !formField.value) {
//       //   formFieldValid = false;
//       // }
//       if (formField.errorMsg) {
//         formFieldValid = false;
//       }
//       return formFieldValid;
//     });
//     return isValid.reduce((acc, el) => {
//       if (el === true) {
//         acc = true;
//       }
//       return acc;
//     }, false);
//   };

//   const handleModalSubmit = () => {
//     // handle modal submit button
//     // this allows users to submit the issue details and / or work logs as well.
//     const issueDetails = form
//       .filter((v) => v.label === "issue")
//       .map((v) => v.data.details);
//     const maintenanceLogDetails = form
//       .filter((v) => v.label === "maintenance_logs")
//       .map((v) => v.data.details);
//     const workOrderDetails = form
//       .filter((v) => v.label === "work_order")
//       .map((v) => v.data.details);
//     const issueIsValid = validator(issueDetails);
//     const maintenanceLogIsValid = validator(maintenanceLogDetails);
//     const workOrderDetailsIsValid = validator(workOrderDetails);
//     if (!issueIsValid || !maintenanceLogIsValid || !workOrderDetailsIsValid) {
//       return false;
//     } else {
//       // submit to supabase
//     }
//   };

//   return {
//     form,
//     handleChange,
//     handleModalSubmit,
//     selected,
//     setSelected,
//   };
// };
