import CategoryBar from "../CategoryBar/CategoryBar";
import CategoryList from "../CategoryList/CategoryList";

interface Iprops {
    title: string;
}

const CategoryPage = (props: Iprops) => {

    const { title } = props;

    const appBarSx = {
        textAlign: 'center',
        backgroundColor: '#FFFCF4',
        color: 'black',
    };

    return (
        <>
            <CategoryBar title={title} appBarSx={appBarSx} />
            <CategoryList />
        </>
    )
};

export default CategoryPage;