import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { SearchProps, SearchInputType } from '../../types/inputProps';

function SearchBar({ setSearchQuery }: SearchProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<SearchInputType>({
    defaultValues: {
      searchQuery: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SearchInputType> = (data) => {
    setSearchQuery(data.searchQuery);
  };
  return (
    <form className="search-input" onChange={handleSubmit(onSubmit)}>
      <Controller
        name="searchQuery"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Search..."
            size="small"
            color="warning"
            sx={{ width: [0.8, 0.6, 0.5] }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{
                    display: isDirty ? 'flex' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    reset();
                    handleSubmit(onSubmit)();
                  }}
                >
                  <ClearIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </form>
  );
}

export default SearchBar;
