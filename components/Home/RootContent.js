
import React from 'react';
import { Box } from '@mui/system';

import Test from './Test';
import Item from '../Home/Item';
import Category from '../Home/Category';

const RootContent = (props) => {

    const { selected } = props;
    return (
        <Box>
            {
                {
                    '0': <Category />,
                    '1': <Item />,
                    '2': <Test title={'mohit'} content={'test'}/>
                }[selected]
            }
        </Box>
    )
};

export default RootContent;