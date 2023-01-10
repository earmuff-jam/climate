import { CSVLink } from 'react-csv';
import React, { useState, useEffect } from 'react';

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";

import { Typography } from '@mui/material';
import moment from 'moment';


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
        console.log(datasets);
        for (const [i, value] of datasets.entries()) {
            const excelRow = {
                "column_one": i,
                "column_two": value.item_name,
                "column_three": value.item_description,
                "column_four": value.quantity,
                "column_five": value.use_by_date,
            };
            excelSheet.push(excelRow);
        }
        setExcelData(excelSheet);
    }, [datasets]);

    const getCsvData = () => {
        const csvData = [[
            'Id',
            'Item Name',
            'Item Description',
            'Item Quantity',
            "Use by Date",
        ]];

        for (let i = 0; i < excelData?.length; i += 1) {
            csvData.push(
                [
                    `${excelData[i].column_one}`,
                    `${excelData[i].column_two}`,
                    `${excelData[i].column_three}`,
                    `${excelData[i].column_four}`,
                    `${moment(excelData[i].column_five).fromNow()}`,
                ]
            );
        }
        return csvData;
    };

    return (
        <div className="app-container clearfix" id="element-to-print">
            <div>
                <div className="imgContainer">
                    <Typography
                        variant='body2'
                        color="secondary"
                    >
                        Thank you for using Climate.
                    </Typography>
                    <br />
                    <CSVLink filename="report.csv" data={getCsvData()}>
                        <Typography
                            variant='body2'
                            color="secondary"
                        >
                            Download report
                        </Typography>
                    </CSVLink>
                </div>
            </div>
        </div>
    );
};

export default DownloadXcelForData;