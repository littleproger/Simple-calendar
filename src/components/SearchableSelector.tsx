import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Select, { type Props as SelectProps } from 'react-select';
import styled, { css } from 'styled-components';

const SelectWrapper = styled.div(({ theme })=>css`
  position: relative;
  display: inline-block;
  width: 300px;

  .react-select__control {
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.sm};
    padding-left: 20px;
    padding-right: 32px;
    min-height: 36px;
    box-shadow: none;
  }

  .react-select__control--is-focused {
    border-color: ${theme.colors.primary};
  }
  .react-select__control:hover {
    border-color: ${theme.colors.primary};
  }

  .react-select__value-container {
    padding: 0;
  }

  .react-select__indicators {
    display: none;
  }

  .react-select__menu {
    z-index: 10;
  }
`);

const IconRight = styled(FaChevronDown)<{$opened:boolean}>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%) rotateX(${({ $opened })=>$opened ? '180deg' : '0deg'});
  color: #888;
  cursor: pointer;

  transition: transform 0.3s;
`;

export type Option = { label: string; value: string };

type SearchableSelectorProps = {
  loadOnce: () => Promise<Option[]>;
  onClear?: () => void;
} & Omit<SelectProps<Option, false>, 'options' | 'classNamePrefix'>

export const SearchableSelector: React.FC<SearchableSelectorProps> = ({
  loadOnce,
  onChange,
  onClear,
  ...rest
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    loadOnce().then(setOptions);
  }, [loadOnce]);

  return (
    <SelectWrapper>
      <Select<Option, false>
        options={options}
        onChange={onChange}
        isClearable
        isMulti={false}
        classNamePrefix="react-select"
        onMenuOpen={()=>setOpened(true)}
        onMenuClose={()=>setOpened(false)}
        {...rest}
      />
      <IconRight $opened={opened} />
    </SelectWrapper>
  );
};
