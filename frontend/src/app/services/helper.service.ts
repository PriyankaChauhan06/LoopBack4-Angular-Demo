import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor() { }

  getTimeZone() { return moment().utcOffset() }

  getIndianTimeZone(date: string) { date = moment(date).utcOffset("+05:30").format('DD-MM-YYYY, h:mm:ss'); return date; }

  formatDate(date: string) { date = moment(date).format('DD-MM-YYYY'); return date; }

  getStartOfTheDay(parameter: any) { parameter = moment(parameter).startOf('day').format(); return parameter; }
  
  getEndOfTheDay(parameter: any) { parameter = moment(parameter).endOf('day').format(); return parameter; }
}


