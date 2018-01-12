import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "candidateFilter"
})
export class CandidateFilterPipe implements PipeTransform {
    
    ngOnInit() {
        console.log('lodash version:', _.VERSION);
      }

    transform(array: any[], query1: string, query2: string, query3: string, query4: string, query5: string, query6: string, query7: string, query8: string): any {

    if (query1 && array) {
        return _.filter(array, row=>row.clientName.toLocaleLowerCase().indexOf(query1.toLocaleLowerCase()) > -1);
    }
    if (query2 && array) {
        return _.filter(array, row=>row.clientId.indexOf(query2) > -1);
    }
    if (query3 && array) {
        return _.filter(array, row=>row.firstName.indexOf(query3) > -1);
    }
    if (query4 && array) {
        return _.filter(array, row=>row.lastName.indexOf(query4) > -1);
    }
    if (query5 && array) {
        return _.filter(array, row=>row.designation.indexOf(query5) > -1);
    }
    if (query6 && array) {
        return _.filter(array, row=>row.role.indexOf(query6) > -1);
    }
    if (query7 && array) {
        return _.filter(array, row=>row.access.indexOf(query7) > -1);
    }
    if (query8 && array) {
        return _.filter(array, row=>row.location.toLocaleLowerCase().indexOf(query8.toLocaleLowerCase()) > -1);
    }
    return array;
        
    }
}