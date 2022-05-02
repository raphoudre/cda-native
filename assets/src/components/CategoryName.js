import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { baseUrl } from '../../../server/utils/fetchApi';

const CategoryName = (props) => {
    return (
        <>
            <Text>
                {categorie.name_cat}
            </Text>
        </>
    );
};

export default CategoryName;