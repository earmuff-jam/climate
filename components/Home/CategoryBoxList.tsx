import { Box } from "@mui/system";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import styles from "../../styles/Home.module.css";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Divider, Select, Typography } from "@mui/material";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";
import GarageRoundedIcon from "@mui/icons-material/GarageRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import SampleChart from "../Chart/SampleChart";

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
        <Divider />
            <Box className={styles.mohit}>
                {storageLocations.map((x) => {
                    return (
                        <>
                            <Box
                                className={styles.newMohit}
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
                        </>
                    );
                })}
            </Box>
        </>
    )
}

export default CategoryBoxList;