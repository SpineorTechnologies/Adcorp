export class CandidateModel {

    "firstName": string;
    "lastName": string;
    "africanId": string;
    "phone": string;
    "email": string;
    "accountType": string;
    "accountNumber": string;
    "bankName": string;
    "branch": string;
    "ifscCode": string;
    "dob": Date
    "address": string;
    "city": string;
    "state": string;
    "country": string;
    "postalCode": number;  
    "location": string;
    "transportation": string;
    "roleDetails":[{"role": string,"yearsOfExperience": string, "rating": string}]
    "skillsets":[{"skill": string,"yearsOfExperience": string, "rating": string}]
    "licenseDetails":[{"license": string,"issuedBy": string,"issueDate": string,"expiryDate": string}]
    "resumeDoc": string;
    "profileImage": string;
    "picture": string;
    "picture_path": string;

    constructor(){

    }
}