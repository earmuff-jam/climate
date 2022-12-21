import {
    Grid,
    Typography,
} from '@mui/material';
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';

interface Iprops {
    supabase?: any;
}

const EntryForm = ({ supabase }: Iprops) => {

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <Typography
                    variant="h4"
                >
                    Climate
                </Typography>
                <Typography
                    variant="caption"
                >
                    Item management your way
                </Typography>
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        style: {
                            button: {
                                background: 'grey',
                                color: 'white',
                                padding: 10,
                            },
                            anchor: {
                                color: 'green',
                            },
                            input: {
                                padding: 12,
                            },
                            message: {
                                color: 'red',
                            },
                        },
                    }}
                />
            </Grid>
        </Grid>
    )
};

export default EntryForm;