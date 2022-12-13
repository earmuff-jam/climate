import React from "react";
import { Box } from "@mui/system";
import SampleChart from "../Chart/SampleChart";
import { Grid, Typography } from "@mui/material";
import styles from "../../styles/Home.module.css";
import GarageRoundedIcon from "@mui/icons-material/GarageRounded";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

const storageLocations = [
    {
        id: "1",
        title: "Kitchen",
        icon: "KitchenRoundedIcon",
        iconProps: {
            width: 150,
            height: 150,
        },
        desc: "Expired Items",
        expiredItemsCount: 12,
        chartInfo: {
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ],
            datasets: [
                {
                    label: "Expiry Items",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: [0, 0, 3, 2, 6, 9, 4, 6, 2, 2, 1, 7],
                },
            ],
        },
    },
    {
        id: "2",
        title: "Garage",
        icon: "GarageRoundedIcon",
        iconProps: {
            width: 150,
            height: 150,
        },
        desc: "Perishable Items",
        expiredItemsCount: 2,
        chartInfo: {
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ],
            datasets: [
                {
                    label: "Perishable Items",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: [1, 1, 3, 2, 2, 0, 0, 4, 2, 2, 1, 0],
                },
            ],
        },
    },
    {
        id: "1",
        title: "Storage",
        icon: "Inventory2RoundedIcon",
        iconProps: {
            width: 150,
            height: 150,
        },
        desc: "Unopened Items",
        expiredItemsCount: 22,
        chartInfo: {
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ],
            datasets: [
                {
                    label: "Unopened Items",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: [1, 1, 3, 2, 2, 0, 0, 4, 2, 2, 1, 0],
                },
            ],
        },
    },
    {
        id: "1",
        title: "Mess Drawer",
        icon: "ShuffleRoundedIcon",
        iconProps: {
            width: 150,
            height: 150,
        },
        desc: "Untouched Items",
        expiredItemsCount: 6,
        chartInfo: {
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ],
            datasets: [
                {
                    label: "Untouched Items",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: [0, 0, 1, 1, 1, 0, 4, 3, 1, 0, 0, 2],
                },
            ],
        },
    },
];

const ICON_GEN: any = {
    KitchenRoundedIcon: <KitchenRoundedIcon />,
    GarageRoundedIcon: <GarageRoundedIcon />,
    Inventory2RoundedIcon: <Inventory2RoundedIcon />,
    ShuffleRoundedIcon: <ShuffleRoundedIcon />,
};

const CategoryBoxList: any = () => {
    const generateIcon = (title: string) => {
        return ICON_GEN[title];
    };
    return (
        <>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                    }}>
                    {storageLocations?.map((x) => {
                        return (
                            <Box
                                key={x.id}
                                sx={{
                                    backgroundColor: "lightgrey",
                                    borderRadius: 8,
                                    p: 1,
                                }}
                            >
                                <Typography variant="h5" gutterBottom>
                                    {generateIcon(x.icon)} {x.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom lineHeight="1.6">
                                    {" "}
                                    <strong>{x.desc}</strong>
                                </Typography>

                                <Typography variant="h5" gutterBottom lineHeight="1.6">
                                    {x.expiredItemsCount}
                                </Typography>
                                <SampleChart
                                    labels={x.chartInfo?.labels}
                                    datasets={x.chartInfo?.datasets}
                                />
                            </Box>
                        );
                    })}
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    What else can we show in the dashboard ?
                </Grid>
            </Grid>
        </>
    )
}

export default CategoryBoxList;