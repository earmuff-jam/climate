import Image from "next/image";


const Header = () => {

    return (
        <>
            <div style={{
                position: "relative",
                width: "100%",
                paddingBottom: "36%",
                backgroundColor: "#EDEEF0",
            }}>
                <Image
                    src={"/sub.jpeg"}
                    layout='fill'
                    objectFit='cover'
                    alt={"a brown bag with words that reads thank you with love"} />
            </div>
        </>
    )
};

export default Header;