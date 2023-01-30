import { Paper, Tooltip, Typography } from "@mui/material";
import Chart from 'chart.js/auto'; // do not remove
import { useEffect } from "react";
import { Bar } from 'react-chartjs-2';


const Projector = (props) => {

    const {
        userCount,
        itemCount,
        avgAssetVal,
        avgBrokenProducts,
        taxSavings,
        auditSavings,
        taxSavingsInPercentage,
        totalSavedInDollars,
    } = props;

    const formattedData = {
        labels: ['Tax Savings', 'Total Saved','Audit log savings'],
        datasets: [{
            label: 'Tax Savings',
            data: [taxSavingsInPercentage, totalSavedInDollars, auditSavings],
            barPercentage: 0.5,
            barThickness: 6,
        },
        ]
    };

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignSelf: 'center',
                borderRadius: 2
            }}
        >
            <Bar
                data={formattedData}
            />
            {/* <Tooltip
                title="savings from audit process"
                placement="top-start"
            >
                <Typography
                    variant="caption"
                >
                    Audit Log Savings
                </Typography>
            </Tooltip>
            <Typography
                variant="body1"
                color={'#1B82A8'}
            >
                ${filterNaN(calculate).toFixed(2)}
            </Typography>
            <Tooltip
                title="savings from tax expenditures"
                placement="top-start"
            >
                <Typography
                    variant="caption"
                >Tax Savings
                </Typography>
            </Tooltip>
            <Typography
                variant="body2"
                color={'#1B82A8'}
            >
                ${filterNaN(calculateTax).toFixed(2)}
            </Typography>
            <Tooltip
                title="Grand total saved"
                placement="top-start"
            >
                <Typography
                    variant="h6"
                >
                    Total Saved
                </Typography>
            </Tooltip>
            <Typography
                variant="h6"
                color={'#1B82A8'}
            >
                ${filterNaN(calculate).toFixed(2)}
            </Typography> */}
        </Paper>
    )
};

export default Projector;