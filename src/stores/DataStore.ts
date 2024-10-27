import { makeAutoObservable, runInAction } from "mobx";
import { IData } from "../types/dataType";
import { getData } from "../service/getData";
import { IFilter } from "../types/filterType";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

class DataStore {
  data: IData[] = [];
  isLoading: boolean = false;
  page = 1;
  totalCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getDataAction = async (filters: IFilter, token: string) => {
    this.isLoading = true;
    try {
      const tempData: IData[] = await getData(filters, token, this.page);
      this.totalCount = tempData.total_count;
      const newData = tempData.items;
      runInAction(() => {
        this.data.push(...newData);
        this.page++;
      });
    } catch (err) {
      console.log(err);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  };

  deleteCurrentData = (item: IData) => {
    this.data.filter((elem) => elem !== item);
  };

  clearPage = () => {
    this.page = 1;
  };
}

export default new DataStore();
