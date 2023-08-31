import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

type SearchInputType = {
  searchQuery: string;
};

function SearchBar() {
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
  const handleClick = (): void => {
    reset();
  };
  const onSubmit: SubmitHandler<SearchInputType> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="searchQuery"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="search-input"
            variant="outlined"
            placeholder="Search..."
            size="small"
            color="warning"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ display: isDirty ? 'flex' : 'none' }}
                  onClick={handleClick}
                >
                  <ClearIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <IconButton type="submit" disabled={!isDirty}>
        <SearchIcon />
      </IconButton>
    </form>
  );
}

export default SearchBar;
