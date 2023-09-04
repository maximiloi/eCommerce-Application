import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SortProps, SortOptionType } from '../../types/inputProps';
import './_sort.scss';

function SortMobile({ setSortOption }: SortProps) {
  const [field, setField] = useState<SortOptionType['field']>('name.en');
  const [type, setType] = useState<SortOptionType['type']>('asc');
  const [isNameAsc, setIsNameAsc] = useState('arrow');
  const [isPriceAsc, setIsPriceAsc] = useState('arrow');
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: SortOptionType['field'] | null
  ) => {
    if (newValue !== null) {
      setField(newValue);
    } else {
      setType(type === 'asc' ? 'desc' : 'asc');
      if ((event.target as HTMLButtonElement).innerText === 'NAME') {
        setIsNameAsc(type === 'asc' ? 'arrow' : 'arrow arrow_desc');
      } else {
        setIsPriceAsc(type === 'asc' ? 'arrow' : 'arrow arrow_desc');
      }
    }
    setSortOption({
      field,
      type,
    });
  };
  return (
    <ToggleButtonGroup
      className="sort sort_mobile"
      orientation="vertical"
      value={field}
      exclusive
      onChange={handleChange}
      aria-label="sorting"
      color="warning"
      size="small"
    >
      <ToggleButton
        value="name.en"
        aria-label="name sorting"
        sx={{ fontSize: 10, p: 0.5 }}
      >
        Name
        <ArrowDownwardIcon className={isNameAsc} />
      </ToggleButton>
      <ToggleButton
        value="price"
        aria-label="price sorting"
        sx={{ fontSize: 10, p: 0.5 }}
      >
        Price
        <ArrowDownwardIcon className={isPriceAsc} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
export default SortMobile;
