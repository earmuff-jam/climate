
import React from 'react';
import Image from "next/image";

import logo from '../../public/logo.svg';

const Logo = () => {

    return (
        <Image
            src={logo}
            alt="earmuff jam iconic image"
            width={60}
            height={60}
          />
    )
};

export default Logo;