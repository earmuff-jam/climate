import { useEffect, useState } from "react";
import BaseTable, {
    AutoResizer,
    Column,
    SortOrder, // do not remove
} from 'react-base-table'

export const defaultSort = {
    key: "name",
    order: SortOrder.ASC,
};
export const useDeriveCategoryPageProperties = (datasets) => {
    const blankCategoryPageProps = {
        editMode: false,
        sortBy: defaultSort,
        displayModal: false,
        addItemSelection: false,
        displayDownloadIcon: false,
        downloadCategoryName: false,
        addCategorySelection: false,
    };

    const [rowData, setRowData] = useState([]);
    const [data, setData] = useState(datasets);
    const [pageProperties, setPageProperties] = useState({ ...blankCategoryPageProps });

    const updatePageProperties = (key, value) => {
        const newPageProperties = { ...pageProperties };
        newPageProperties[key] = value;
        setPageProperties(newPageProperties);
    };

    const onColumnSort = (sortBy) => {
        const order = sortBy.order === SortOrder.ASC ? 1 : -1;
        const data = [...datasets];
        data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order));
        const newPageProperties = { ...pageProperties };
        newPageProperties.sortBy = sortBy;
        setData(data);
        setPageProperties(newPageProperties);
    };

    useEffect(() => {
        setPageProperties({ ...blankCategoryPageProps });
    }, []);

    useEffect(() => {
        setData(datasets);
    }, [datasets]);

    return {
        data,
        pageProperties,
        onColumnSort,
        rowData,
        setRowData,
        updatePageProperties,
    }
};