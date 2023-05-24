import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ADD_ISSUE_DETAILS_FORM,
  ADD_MAINTENANCE_FORM,
  ADD_MAINTENANCE_LOG_FORM,
  ADD_WORK_ORDER_FORM,
  OVERALL_FORMATTED_MAINTENANCE_DETAILS,
  OVERALL_MAINTENANCE_STATUS,
} from "@/components/Maintenance/constants";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

/**
 * this hook is used to create inspection checklist forms.
 *
 */
export const useCreateInspectionChecklist = () => {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { id: propertyId } = router.query;
  const [form, setForm] = useState(ADD_MAINTENANCE_FORM);
  const [dataSheet, setDataSheet] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedDataSheet, setSelectedDataSheet] = useState(-1);
  const [existingInspections, setExistingInspections] = useState([]);

  const handleModalClick = () => setOpenModal(!openModal);
  const handleChangeInspection = (event) => {
    const { name, value } = event.target;
    const newForm = { ...form };
    newForm[name].value = value;
    newForm[name].errorMsg = newForm[name]?.validators?.reduce(
      (acc, el, index, arr) => {
        el.validate(value) ? (acc = el.message) : null;
        return acc;
      },
      ""
    );
    setForm({ ...newForm });
  };
  const handleSelectInspection = (item, type) => {
    const newForm = { ...form };
    newForm[type].value = item;
    newForm[type].errorMsg = newForm[type].validators.reduce(
      (acc, el, index, arr) => {
        el.validate(item) ? (acc = el.message) : null;
        return acc;
      },
      ""
    );
    setForm({ ...newForm });
  };
  const fetchInspectionFormList = async () => {
    const { data, error } = await supabaseClient
      .from("inspection")
      .select(
        `
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
    `
      )
      .eq("property_id", propertyId);
    if (error) return;
    setExistingInspections(data);
  };

  const resetData = () => {
    setForm({ ...ADD_MAINTENANCE_FORM });
  };

  const { isLoading, isError, error, data } = useQuery(
    "inspectionData",
    fetchInspectionFormList
  );

  const upsert = async (form) => {
    const { err } = await supabaseClient.from("inspection").insert(
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
      { upsert: true }
    );
    if (err) return;
    router.reload();
  };

  const handleSubmit = async () => {
    const emptyErrorMsg = Object.values(form)
      .map((v, index) => v.errorMsg)
      .filter(Boolean);
    const requiredFields = Object.values(form)
      .map((v) => v.required)
      .filter(Boolean);
    const requiredFilledFields = Object.values(form)
      .filter((v) => v.required)
      .map((v) => v.value)
      .filter(Boolean);
    // no errors present
    if (emptyErrorMsg.length === 0) {
      if (requiredFilledFields.length === requiredFields.length) {
        await upsert(form);
      }
    }
    resetData();
  };

  const handleRoomChange = (index, field, value) => {
    setForm((prevForm) => {
      const updatedRooms = [...prevForm.rooms];
      updatedRooms[index] = {
        ...updatedRooms[index],
        [field]: value,
      };
      return {
        ...prevForm,
        rooms: updatedRooms,
      };
    });
  };
  const handleApplianceChange = (index, field, value) => {
    setForm((prevForm) => {
      const updatedAppliances = [...prevForm.appliances];
      updatedAppliances[index] = {
        ...updatedAppliances[index],
        [field]: value,
      };
      return {
        ...prevForm,
        appliances: updatedAppliances,
      };
    });
  };
  const handlePlumbingChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      plumbing: {
        ...prevForm.plumbing,
        [field]: value,
      },
    }));
  };
  const handleElectricalChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      electrical: {
        ...prevForm.electrical,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    const selectedInspection = existingInspections.filter(
      (el, index) => index === selectedDataSheet
    );
    setDataSheet(selectedInspection);
  }, [selectedDataSheet]);

  return {
    isLoading,
    isError,
    error,
    data,
    form,
    upsert,
    existingInspections,
    setSelectedDataSheet,
    selectedDataSheet,
    dataSheet,
    openModal,
    setOpenModal,
    handleChangeInspection,
    handleSelectInspection,
    handleModalClick,
    resetData,
    handleSubmit,
  };
};

/**
 * this hook is used to update or add more details to the inspection details form. the inspection details form is a derivative of the inspection checklist created above
 *
 */
export const useMaintenanceDetails = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const [form, setForm] = useState({
    ...ADD_ISSUE_DETAILS_FORM,
    ...ADD_MAINTENANCE_LOG_FORM,
    ...ADD_WORK_ORDER_FORM,
    ...OVERALL_MAINTENANCE_STATUS,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newForm = { ...form };
    newForm[name].value = value;
    newForm[name].errorMsg = newForm[name]?.validators?.reduce(
      (acc, el, index, arr) => {
        el.validate(value) ? (acc = el.message) : null;
        return acc;
      },
      ""
    );
    setForm({ ...newForm });
  };

  const handleSelect = (item, type) => {
    const newForm = { ...form };
    newForm[type].value = item;
    newForm[type].errorMsg = newForm[type].validators?.reduce(
      (acc, el, index, arr) => {
        el.validate(item) ? (acc = el.message) : null;
        return acc;
      },
      ""
    );
    setForm({ ...newForm });
  };

  const handleModalSubmit = () => {
    const maintenanceDetails = OVERALL_FORMATTED_MAINTENANCE_DETAILS;
    maintenanceDetails.map((item, index) => {
      if (item.label === "issue_details") {
        item.data.push(form.issue_details.value);
        item.data.push(form.issue_description.value);
      } else if (item.label === "maintenance_logs") {
        item.data.push(form.maintenance_log_details.value);
        item.data.push(form.maintenance_log_description.value);
      } else if (item.label === "work_orders") {
        item.data.push(form.work_order_details.value);
        item.data.push(form.work_order_description.value);
      }
      console.log(maintenanceDetails);
    });
  };

  return {
    form,
    handleChange,
    handleSelect,
    handleModalSubmit,
  };
};
