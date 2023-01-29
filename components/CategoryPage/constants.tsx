export const ITEM_HEIGHT: number = 48;
export const ITEM_PADDING_TOP: number = 8;

export const MENU_PROPS = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export const TYPE_OPTIONS = [
    {
        id: '1',
        name: 'PERSONAL',
    },
    {
        id: '2',
        name: 'BUSINESS',
    }
];

export const regularAndHigherScreenSx = {
    width: "100vm",
    height: "100vh",
};

export const smallScreenSx = {
    width: '70rem',
    height: '70rem',
};