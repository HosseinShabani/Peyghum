import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

//my custom icon
const Iconm = (props) => {
    let { name, size, color, style } = props;
    return <Icon name={name} size={size} color={color} style={style} />;
};

export { Iconm };
