import { CSVLink } from 'react-csv';
import React, { useState, useEffect } from 'react';

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";

import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';


const DownloadXcelForData = (props: any) => {

    const { downloadCategoryName } = props;
    const [excelData, setExcelData] = useState<any | null>([]);

    const supabaseClient = useSupabaseClient();
    const [datasets, setDatasets] = useState<any | null>([]);

    const fetchCategoryList = async () => {
        let { data, error } = await supabaseClient
            .rpc('fn_gather_items_by_category_use_by_date', {
                category: downloadCategoryName
            });
        if (error) return;
        setDatasets(data);
    };

    useEffect(() => {
        fetchCategoryList();
    }, [downloadCategoryName]);

    useEffect(() => {
        const excelSheet: any = [];
        for (const [i, value] of datasets.entries()) {
            const excelRow = { "column_one": i, "column_two": value.item_name };
            excelSheet.push(excelRow);
        }
        console.log(excelSheet);
        setExcelData(excelSheet);
    }, [datasets]);

    const getCsvData = () => {
        const csvData = [['Item Reporting']];
        let i;
        for (i = 0; i < excelData?.length; i += 1) {
            csvData.push(
                [
                    `${excelData[i].column_one}`,
                    `${excelData[i].column_two}`,
                ]
            );
        }
        return csvData;
    };

    return (
        <div className="app-container clearfix" id="element-to-print">
            <div>
                <div className="imgContainer">
                    <CSVLink filename="report.csv" data={getCsvData()}>
                        To download the excel sheet please click on <GetAppRoundedIcon />
                    </CSVLink>
                </div>
            </div>
        </div>
    );
};

export default DownloadXcelForData;