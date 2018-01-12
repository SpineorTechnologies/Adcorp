import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "orderCandidateFilter"
})
export class OrderCandidateFilterPipe implements PipeTransform {
    
    ngOnInit() {
        console.log('lodash version:', _.VERSION);
      }

    transform(array: any[], query1: string, query2: string, query3: string, query4: string, query5: string, query6: string, query7: string): any {

    if (query1 && array) {
        return _.filter(array, row=>row.firstName && row.firstName.toLocaleLowerCase().indexOf(query1.toLocaleLowerCase()) > -1);
    }
    if (query2 && array) {
        return _.filter(array, row=>row.lastName && row.lastName.toLocaleLowerCase().indexOf(query2.toLocaleLowerCase()) > -1);
    }
    if (query3 && array) {
        return _.filter(array, row=>row.ratings && row.ratings.toString().indexOf(query3) > -1);
    }
    if (query4 && array) {
        return _.filter(array, row=>row.noOfJobs && row.noOfJobs.indexOf(query4) > -1);
    }
    if (query5 && array) {
        return _.filter(array, row=>row.phone && row.phone.toString().indexOf(query5) > -1);
    }
    if (query6 && array) {
        return _.filter(array, row=>row.deviceModel && row.deviceModel.toString().indexOf(query6) > -1);
    }
    if (query7 && array) {
        return _.filter(array, row=>row.availability && row.availability.indexOf(query7) > -1);
    }
    return array;
        
    }
}