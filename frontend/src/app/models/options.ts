export class Options {
    search?: string;
    startDate?: any | Date | string;
    endDate?: Date | string;
    limit?: string;
    skip?: string;
    column?: undefined | string;
    order?: string;
    userId?: string;
    name?: string;
    category?: string;
    subCategory?: string;
    product?: string;
    constructor() {
      this.limit = '100';
      this.skip = '0';
    }
  }
