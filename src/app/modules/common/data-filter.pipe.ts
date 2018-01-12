import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {
    
    ngOnInit() {
        console.log('lodash version:', _.VERSION);
      }

    transform(array: any[], query1: string, query2: string, query3: string, query4: string, query5: string, query6: string, query7: string, query8: string): any {
    //    console.log(query1, query2, query3, query4, query5, query6, query7, query8);
       
    //    let passedFilter: any[] = [];
       
    //    if (query1) passedFilter.push({"val":"firstName", "q":query1});
    //    if (query2) passedFilter.push({"val":"lastName", "q":query2});
    //    if (query3) passedFilter.push({"noOfJobs":query3});
    //    if (query4) passedFilter.push({"phone":query4});
    //    if (query5) passedFilter.push({"deviceModel":query5});
    //    if (query6) passedFilter.push({"createdDateTime":query6});
    //    if (query7) passedFilter.push({"daysOld":query7});
    //    if (query8) passedFilter.push({"lastUpdatedDateTime":query8});

    //    console.log(passedFilter);

    //    if (array && passedFilter) {
    //      let filtered = array;
    //      for (let i=0; i<passedFilter.length; i++) {
    //          filtered = _.filter(filtered, row=>row.passedFilter[i].val.toLocaleLowerCase().indexOf(passedFilter[i].q.toLocaleLowerCase()) > -1);
    //      }
    //      return filtered;
    //    }

    //    if (array) {
    //         var filteredArray = _.select(array, function(c){    
    //             return passedFilter.indexOf(c.id) != -1
    //         });
    //         return filteredArray;
    //    }
    //     return array;

    if (query1 && array) {
        return _.filter(array, row=>row.firstName.toLocaleLowerCase().indexOf(query1.toLocaleLowerCase()) > -1);
    }
    if (query2 && array) {
        return _.filter(array, row=>row.lastName.indexOf(query2) > -1);
    }
    if (query3 && array) {
        return _.filter(array, row=>row.noOfJobs.indexOf(query3) > -1);
    }
    if (query4 && array) {
        return _.filter(array, row=>row.phone.indexOf(query4) > -1);
    }
    if (query5 && array) {
        return _.filter(array, row=>row.deviceModel.indexOf(query5) > -1);
    }
    if (query6 && array) {
        return _.filter(array, row=>row.createdDateTime.indexOf(query6) > -1);
    }
    if (query7 && array) {
        return _.filter(array, row=>row.firstName.indexOf(query7) > -1);
    }
    if (query8 && array) {
        return _.filter(array, row=>row.lastUpdatedDateTime.toLocaleLowerCase().indexOf(query8.toLocaleLowerCase()) > -1);
    }
    return array;
        
    }
}

            //return _.filter(array, row=>row.name.indexOf(query) > -1);
            
            // var results = _.filter(array, function (obj) {
            //     return _.values(obj).some(function (el) {
            //        // console.log(el)
            //         return el.toString().indexOf(query1) > -1;
            //     });
            // });

           

        // return array;