import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../constans/Colors';

const MyHeaderButton = props => {
    return <HeaderButton {...props}
        IconComponent={MaterialIcons}
        iconSize={23}
        color={Platform.OS === 'android' ? 'white' : Colors.primaryColor} />;
}

export default MyHeaderButton;