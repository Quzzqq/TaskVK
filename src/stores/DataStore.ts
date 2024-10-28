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
  countNow = 0;
  maxCount = false;
  notFound = false;

  constructor() {
    makeAutoObservable(this);
  }

  getDataAction = async (filters: IFilter, token: string) => {
    this.isLoading = true;
    try {
      this.notFound = false;
      const tempData: IData[] = await getData(filters, token, this.page);
      this.totalCount = tempData.total_count;
      this.countNow += 40;
      const newData = tempData.items;
      runInAction(() => {
        this.maxCount = this.countNow >= this.totalCount;
        this.data.push(...newData);
        this.page++;
        if (this.totalCount == 0) {
          this.notFound = true;
        } else {
          this.notFound = false;
        }
      });
    } catch (err) {
      // console.log((err.status === 403));
      // console.log("123");
      throw err;
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  };

  deleteCurrentData = (item: IData) => {
    this.data = this.data.filter((elem) => elem !== item);
  };

  clearPage = () => {
    this.page = 1;
    this.countNow = 0;
    this.data = [];
  };

  restartNotFound = () => {
    this.notFound = false;
  };
}

export default new DataStore();
