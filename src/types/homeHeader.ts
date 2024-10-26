import { IFilter } from "./filterType";

export interface IFilterState {
  filters: IFilter;
  setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
  token: string;
  openHeader: boolean;
  setOpenHeader: React.Dispatch<React.SetStateAction<boolean>>;
}
