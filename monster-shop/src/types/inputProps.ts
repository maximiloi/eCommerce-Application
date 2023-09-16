export type SelectOption = {
  value: string;
  label: string;
};

export type SearchInputType = {
  searchQuery: string;
};

export type SearchProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export type PromoInputType = {
  promoCode: string;
};

export type PromoCodeProps = {
  setDiscountAmount: React.Dispatch<React.SetStateAction<number>>;
};

export type SortOptionType = {
  field: 'name.en' | 'price';
  type: 'asc' | 'desc';
};

export type SortProps = {
  setSortOption: React.Dispatch<React.SetStateAction<SortOptionType>>;
};

export type AttributeType = {
  key: string;
  label: string;
};
