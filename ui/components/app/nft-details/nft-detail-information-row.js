import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text } from '../../component-library';
import {
  Display,
  JustifyContent,
  TextColor,
  TextVariant,
} from '../../../helpers/constants/design-system';

const NftDetailInformationRow = ({ title, valueColor, value, icon }) => {
  console.log('🚀 ~ NftDetailInformationRow ~ valueColor:', valueColor);
  console.log('value color', valueColor || TextColor.textAlternative);
  return (
    <Box
      display={Display.Flex}
      justifyContent={JustifyContent.spaceBetween}
      marginTop={4}
    >
      <Text
        color={TextColor.textAlternative}
        variant={TextVariant.bodyMdMedium}
      >
        {title}
      </Text>
      {icon ? (
        <Box display={Display.Flex}>
          <Text
            color={valueColor || TextColor.textAlternative}
            variant={TextVariant.bodyMdMedium}
          >
            {value}
          </Text>
          {icon}
        </Box>
      ) : (
        <Text
          color={valueColor || TextColor.textAlternative}
          variant={TextVariant.bodyMdMedium}
        >
          {value}
        </Text>
      )}
    </Box>
  );
};

NftDetailInformationRow.propTypes = {
  title: PropTypes.string,
  valueColor: TextColor,
  value: PropTypes.string,
  icon: PropTypes.node,
};

export default NftDetailInformationRow;
