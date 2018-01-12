export const UrlConfig = {
    apiEndPoint: "http://localhost:5000/",//52.38.134.82:5000
    users: {
        login: "webapi/users/login",
        forgotPassword: "webapi/users/resetpassword",
        resetPassword: "webapi/users/updateoasswordverification"
    },
    candidate: {
        create: "webapi/users/create/candidate",
        getAll: "webapi/users/list/candidate/",
        getCandidate: "webapi/users/show/candidate",
        update: "webapi/users/update_play/",
        delete: "webapi/users/delete/candidate",
        activateCandidate: "webapi/users/activate/candidate",
        deActivateCandidate: "webapi/users/deactivate/candidate"
    },
    client: {
        create: "webapi/users/create/client",
        getAll: "webapi/users/list/client/",
        getCandidate: "webapi/users/show/client",
        update: "webapi/users/update",
        delete: "webapi/users/delete/client",
        activateCandidate: "webapi/users/activate/client",
        deActivateCandidate: "webapi/users/deactivate/client"
    },
    order: {
        getAll: "webapi/orders",
        getOrder: "webapi/orders",
        create: "webapi/orders/create/",
        update: "webapi/orders",
        delete: "webapi/orders",
        getMatchedCandidateByOrderIdRequested: "webapi/ordermappings/getmatchedcandidatebyorderidrequested",
        getMatchedCandidateByOrderId: "webapi/orders/getmatchedcandidatebyorderid",
        swapCandidates: "webapi/ordermappings/create/addswapgetmatchedcandidatebyorderid",
        extendCandidates: "webapi/ordermappings/update/extend",
        updateCandidateStatus: "webapi/ordermappings/update",
        deleteCandidate: "webapi/ordermappings/delete",
        getClientData: "webapi/users/show"
    },
    superUser: {
        getAll: "",
        getUser: "",
        activateUser: "",
        deactivateUser: "",
        createUser: "",
        updateUser: "",
        deleteUser: ""
    }
} 