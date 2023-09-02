import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

type SearchInputType = {
  searchQuery: string;
};

type SearchProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

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
  const handleClick = (): void => {
    reset();
  };
  const onSubmit: SubmitHandler<SearchInputType> = (data) => {
    setSearchQuery(data.searchQuery);
  };
  return (
    <form className="search-input" onSubmit={handleSubmit(onSubmit)}>
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