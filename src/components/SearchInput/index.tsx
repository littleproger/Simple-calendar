import { useState, type ChangeEvent, type FC } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { ClearButton, Input, Wrapper } from './styles';

type SearchInputProps = {
  id: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const SearchInput: FC<SearchInputProps> = ({
  id,
  placeholder = 'Search...',
  onChange,
}) => {
  const [value, setValue] = useState('');

  const handleClear = () => {
    setValue('');
    onChange('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Wrapper>
      <FiSearch className="icon search" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        id={id}
      />
      <ClearButton onClick={handleClear} $shown={!!value}>
        <FiX className="icon clear" />
      </ClearButton>
    </Wrapper>
  );
};
