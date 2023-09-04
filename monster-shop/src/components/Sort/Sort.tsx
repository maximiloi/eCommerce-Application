import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SortProps, SortOptionType } from '../../types/inputProps';
import './_sort.scss';

function Sort({ setSortOption }: SortProps) {
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
      className="sort"
      value={field}
      exclusive
      onChange={handleChange}
      aria-label="sorting"
      color="warning"
      size="small"
      sx={{ display: { xs: 'none', md: 'block' } }}
    >
      <ToggleButton value="name.en" aria-label="name sorting">
        Name
        <ArrowDownwardIcon className={isNameAsc} />
      </ToggleButton>
      <ToggleButton value="price" aria-label="price sorting">
        Price
        <ArrowDownwardIcon className={isPriceAsc} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
export default Sort;
