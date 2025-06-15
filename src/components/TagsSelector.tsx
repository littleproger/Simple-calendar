import { type IconType } from 'react-icons';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagButton = styled.button<{ selected: boolean }>(({ selected, theme })=>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: ${(selected ? theme.colors.primary : theme.colors.surfaceAlt)};
  color: ${(selected ? theme.colors.textForPrimary : theme.colors.textSecondary)};
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.9rem;
  user-select: none;

  &:hover {
    background: ${(selected ? theme.colors.primary : theme.colors.surfaceAlt)};
  }
`);

type TagOption = {
  label: string;
  value: string;
  Icon: IconType;
};

type TagsSelectorProps = {
  options: TagOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelectable?: number;
};

export const TagsSelector = ({
  options,
  selected,
  onChange,
  maxSelectable,
}: TagsSelectorProps) => {
  const toggleTag = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      if (!maxSelectable || selected.length < maxSelectable) {
        onChange([...selected, value]);
      }
    }
  };

  return (
    <Wrapper>
      {options.map(({ label, value, Icon }) => (
        <TagButton
          key={value}
          type="button"
          selected={selected.includes(value)}
          onClick={() => toggleTag(value)}
          aria-pressed={selected.includes(value)}
        >
          <Icon />
          {label}
        </TagButton>
      ))}
    </Wrapper>
  );
};
