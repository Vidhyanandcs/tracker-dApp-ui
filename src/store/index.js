/* eslint-disable */
import { createStore } from "vuex";
import router from '../router/index'
import axios from 'axios'

export default createStore({
  state: {
    email:'',
    token:'',
    role:'',
    facility:'',
    options:["Select"],
    alert:'',
    employeeTotal:0,
    employeeBalance:0,
    detergentTotal:0,
    detergentBalance:0,
    washerTotal:0,
    washerBalance:0,
    dryerTotal:0,
    dryerBalance:0,
    spareBalance:0,
    spareTotal:0,
    campusAdminEmail:"",
    campusAdminPassword:"",
    facilityManagerEmail:"",
    facilityManagerPassword:"",
    componentName:"Tracker"
  },

  mutations: {
    //Storing credentails for API authentication
    getCredentials(state){
      state.email = localStorage.getItem('email')
      state.token = localStorage.getItem('token')
      state.role = localStorage.getItem('role')
    },
    //Alert message update
    alertMessage(state, alert){
      state.alert = alert.message
    },
    //Clearing alert message
    clearAlertMessage(state){
      state.alert = ''
    },
    //Celaring credentials on logout
    clearToken(state){
      state.token = ''
      state.role = ''
      state.email =''
      state.facility = ''
      localStorage.removeItem('email')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('facility')
    },
    //updating facility name after adding ore removing a facility 
    updateFacilityNames(state, facilityNames){
      facilityNames.facilityNames.unshift("Select")
      state.options = facilityNames.facilityNames
    },
    //Update the selected facility
    selectedFacility(state, facilityName){
      state.facility = facilityName.facility
      localStorage.setItem('facility',facilityName.facility)
    },
    //Update total employees
    employeeInventoryTotal(state, inventory){
      state.employeeTotal = inventory.employeeTotal
    },
    //Update total employees present
    employeeInventoryBalance(state, inventory){
      state.employeeBalance = inventory.employeeBalance
    },
    //Update detergent total stocking capacity
    detergentInventoryTotal(state, inventory){
      state.detergentTotal = inventory.detergentTotal
    },
    //Update detergent total balance
    detergentInventoryBalance(state, inventory){
      state.detergentBalance = inventory.detergentBalance
    },
    //Update total washers in the facility
    washerInventoryTotal(state, inventory){
      state.washerTotal = inventory.washerTotal
    },
    //Update total washers in working condition in the facility
    washerInventoryBalance(state, inventory){
      state.washerBalance = inventory.washerBalance
    },
    //Update total dryers in the facility
    dryerInventoryTotal(state, inventory){
      state.dryerTotal = inventory.dryerTotal
    },
    //Update total dryers in working condition in the facility
    dryerInventoryBalance(state, inventory){
      state.dryerBalance = inventory.dryerBalance
    },
    //Update total spares meant to be present in the facility
    spareInventoryTotal(state, inventory){
      state.spareTotal = inventory.spareTotal
    },
    //Update total spares present in the facility
    spareInventoryBalance(state, inventory){
      state.spareBalance = inventory.spareBalance
    },
    //Updating campus admin and facility manager details from settings by admin
    storeFacilityDetails(state, facilityDetails){
      state.campusAdminEmail=facilityDetails.campusAdminEmail,
      state.campusAdminPassword=facilityDetails.campusAdminPassword
      state.facilityManagerEmail=facilityDetails.facilityManagerEmail,
      state.facilityManagerPassword=facilityDetails.facilityManagerPassword
    },
    //Clearing facility details 
    clearFacilityDetails(state){
      state.facility = ""
      state.campusAdminEmail = ""
      state.campusAdminPassword = "",
      state.facilityManagerEmail = "",
      state.facilityManagerPassword = ""
    },
    //Deleting name from select list on deleting a facility
    deleteName(state, name){
      let deleteName = name.name
      state.options = state.options.filter(item =>item !== deleteName)
    },
    //Changing component (between tracker and settings)
    changeComponent(state,component){
      state.componentName = component.component
    }
  },

  getters:{
    //Alert message
    alert: state => {
      return state.alert      
    },
    //JWT token
    token: state => {
      return state.token
    },
    //Role admin, facility manager or campus admin
    role: state => {
      return state.role
    },
    //email id of user
    email: state =>{
      return state.email
    },
    //facility name
    facility: state =>{
      return state.facility
    },

    options: state =>{
      return state.options
    },
    //Total employee strength
    employeeTotal: state => {
      if(state.employeeTotal == null){
        return 0
      }else{
        return state.employeeTotal
      }
    },
    //Total employees present
    employeeBalance: state => {
      if(state.employeeBalance == null){
        return 0
      }else{
        return state.employeeBalance
      }
    },
    //Detergent capacity
    detergentTotal: state => {
      if(state.detergentTotal == null){
        return 0
      }else{
        return state.detergentTotal
      }
    },
    //Detergent stock
    detergentBalance: state => {
      if(state.detergentBalance == null){
        return 0
      }else{
        return state.detergentBalance
      }
    },
    //Washers capacity
    washerTotal: state => {
      if(state.washerTotal == null){
        return 0
      }else{
        return state.washerTotal
      }
    },
    //Washers in working condition
    washerBalance: state => {
      if(state.washerBalance == null){
        return 0
      }else{
        return state.washerBalance
      }
    },
    //Dryers total capacity
    dryerTotal: state => {
      if(state.dryerTotal == null){
        return 0
      }else{
        return state.dryerTotal
      }
    },
    //Dryers in working condition
    dryerBalance: state => {
      if(state.dryerBalance == null){
        return 0
      }else{
        return state.dryerBalance
      }
    },
    //Spares to be present in facility
    spareTotal: state => {
      if(state. spareTotal == null){
        return 0
      }else{
        return state. spareTotal
      }
    },
    //Total spares present
    spareBalance: state => {
      if(state. spareBalance == null){
        return 0
      }else{
        return state. spareBalance
      }
    },
    //Facility manager password
    facilityManagerPass: state =>{
      return state.facilityManagerPassword
    },
    //Facility manager email id
    facilityManagerId: state =>{
      return state.facilityManagerEmail
    },
    //Campus Admin password
    campusAdminPass: state =>{
      return state.campusAdminPassword
    },
    //Campus admin email id
    campusAdminId: state =>{
      return state.campusAdminEmail
    },
    //Component name for active component
    componentName: state =>{
      return state.componentName
    }
  },

// Actions start here
  actions: {
    //login
    login({commit}, credentials){

      //Post request for login
      axios.post('/login', {
        email: credentials.email,
        role: credentials.role,
        password: credentials.password

      }).then((res) => {
        localStorage.setItem('email', credentials.email)
        localStorage.setItem('token',res.data.data.jwt)
        localStorage.setItem('role', credentials.role)
        localStorage.setItem('facility','Select a Facility')
        commit('getCredentials')
        //Routing to dashboard
        router.replace({name:'Dashboard'})

      }).catch((error) => {
        //error message send to mutation
        commit('alertMessage', {
          message: error.response.data.message
        })
      })
    },
    //API to get list of facilities
    getFacilityNames({commit}){
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json"
        },
        params: {
          names: true
        }
      };
      axios
        .get("/facility/names", config)
        .then(res => {
          let names = res.data.names;
          commit("updateFacilityNames",{
            facilityNames:names
          })
        })
        .catch(error => {
          commit("alertMessage", {
            message: error.response.data.message
        });
      });
    },
    
    // logout
    logout({getters,commit}){
      commit('getCredentials')
      //post request for logout
      axios.post('/logout',{},{
        headers: {
          'Content-Type': 'application/keyauth.api.v1+json',
          'Authorization':`${getters.token}`
        },
      }).then(()=>{
        router.replace({name:'Login'})
        commit('clearToken')
      }).catch(()=>{
        commit('alertMessage', {
          message: error.response.data.message
        })
      })
    },

    // getting inventory
    getInventory({commit}, facilityName){
      let token = localStorage.getItem('token')
      let facility = facilityName.facility
      if(facility == 'Select'){
        return
      }else{
        axios.get(`/facility/${facility}/inventory`,{
          headers: {
            'Content-Type': 'application/keyauth.api.v1+json',
            'Authorization':`${token}`
          },
        }).then((res)=>{
          let inventoryList = res.data.data
  
          for(let i=0; i<inventoryList.length; i++){
            if(inventoryList[i].name == 'employees'){
              let employeeTotal = inventoryList[i].total
              let employeeBalance = inventoryList[i].balance 

              commit('employeeInventoryTotal',{
                employeeTotal
              })

              commit('employeeInventoryBalance',{
                employeeBalance
              })

            }else if(inventoryList[i].name == 'detergent'){
              let detergentTotal = inventoryList[i].total
              let detergentBalance = inventoryList[i].balance
              
              commit('detergentInventoryTotal',{
                detergentTotal
              })

              commit('detergentInventoryBalance',{
                detergentBalance
              })

            }else if(inventoryList[i].name == 'washers'){
              let washerTotal = inventoryList[i].total
              let washerBalance = inventoryList[i].balance
              
              commit('washerInventoryTotal',{
                washerTotal
              })

              commit('washerInventoryBalance',{
                washerBalance
              })
            }else if(inventoryList[i].name == 'dryers'){
              let dryerTotal = inventoryList[i].total
              let dryerBalance = inventoryList[i].balance
              
              commit('dryerInventoryTotal',{
                dryerTotal
              })

              commit('dryerInventoryBalance',{
                dryerBalance
              })
            }else if(inventoryList[i].name == 'spares'){
              let spareTotal = inventoryList[i].total
              let spareBalance = inventoryList[i].balance
              
              commit('spareInventoryTotal',{
                spareTotal
              })

              commit('spareInventoryBalance',{
                spareBalance
              })
            }   
          }
        }).catch((error)=>{
          commit('alertMessage', {
            message: error.response.data.message
          })
        })
      }
    },
    //Invoking API for saving the inventory
    saveInventory({getters,commit}){
      let token = localStorage.getItem('token')
      let facility = getters.facility
      // let data = 
      if(facility == 'Select'){
        return
      }else{
        axios.put(`/facility/${facility}/inventory`,
        [
          {
            "balance": getters.employeeBalance,
            "name": "employees",
            "total": getters.employeeTotal
          },
          {
            "balance": getters.detergentBalance,
            "name": "detergent",
            "total": getters.detergentTotal
          },
          {
            "balance": getters.washerBalance,
            "name": "washers",
            "total": getters.washerTotal
          },
          {
            "balance": getters.dryerBalance,
            "name": "dryers",
            "total": getters.dryerTotal
          },
          {
            "balance": getters.spareBalance,
            "name": "spares",
            "total": getters.spareTotal
          }
        ],
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`${token}`
          },
        }).then((res)=>{
          commit('alertMessage', {
            message: "Inventory Saved"
          })
        }).catch((error)=>{
          commit('alertMessage', {
            message: error.response.data.message
          })
        })
     
      }
    },
    //Retriving facility detials
    retriveFacilityDetails({getters,commit}){
      if(getters.facility == "Select"){
        return
      }else{
        let token = localStorage.getItem('token')
        let config = {
          headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json"
          },
          params: {
            names:false
          }
        }
        if(getters.facility == "Select"){
          return
        }
        else{
          //API to get facility details
          axios.get(`/facility/${getters.facility}`, config).then((res)=>{
            let facilityDetails = res.data.data
            commit('storeFacilityDetails',facilityDetails)
          }).catch((error)=>{
            commit('alertMessage', {
              message: error.response.data.message
            })
          })
        }
      }
    },
    //Save Edited faility details
    saveEditedDetails({getters,dispatch,commit},details){
      let token = localStorage.getItem('token')
      let facility = getters.facility
      //checking if the values are edited, if not send existing values
      if(details.campusAdminEmail == ""){
        details.campusAdminEmail = getters.campusAdminId
      }
      if(details.campusAdminPassword == ""){
        details.campusAdminPassword = getters.facilityManagerPass
      }
      if(details.facilityManagerEmail == ""){
        details.facilityManagerEmail = getters.facilityManagerId
      }
      if(details.facilityManagerPassword == ""){
        details.facilityManagerPassword = getters.facilityManagerPass
      }
      if(facility == 'Select'){
        return
      }else{
        //API to update campus admin and facility manager email id and password
        axios.put(`/facility/${facility}`,
        {
          campusAdminEmail:details.campusAdminEmail,
          campusAdminPassword:details.campusAdminPassword,
          facilityManagerEmail:details.facilityManagerEmail,
          facilityManagerPassword:details.facilityManagerPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`${token}`
          },
        }).then(()=>{
          dispatch('retriveFacilityDetails')
          commit('alertMessage', {
            message: "Facility details Updated"
          })
        }).catch((error)=>{
          commit('alertMessage', {
            message: error.response.data.message
          })
        })
      }
    },
    //deleting facility
    deleteFacility({getters,commit}){
      let token = localStorage.getItem('token')
      let facility = getters.facility
      if(facility == 'Select'){
        return
      }else{
        //API to delete facility
        axios.delete(`/facility/${facility}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`${token}`
          },
        }).then(()=>{
          commit('deleteName',{
            name:facility
          })
          commit('alertMessage', {
            message: `${facility} deleted`
          })
          commit("changeComponent",{
            component:"Tracker"
          })
        }).catch((error)=>{
          commit('alertMessage', {
            message: error.response.data.message
          })
        })
      }
    },
    //Get inventory specific to a perticular date
    dateSpecificInventory({getters,commit},data){
      let date = data.date
      let token = localStorage.getItem('token')
      let facility = getters.facility
      if(facility == 'Select'){
        return
      }else{
        //API to get inventory detials
        axios.get(`/facility/${facility}/inventory`,{
          headers: {
            'Content-Type': 'application/keyauth.api.v1+json',
            'Authorization':`${token}`
          },
          params: {
            date: this.date
          }
        }).then((res)=>{
          let inventoryList = res.data.data
          console.log(res)
          for(let i=0; i<inventoryList.length; i++){
            if(inventoryList[i].name == 'employees'){
              let employeeTotal = inventoryList[i].total
              let employeeBalance = inventoryList[i].balance 

              commit('employeeInventoryTotal',{
                employeeTotal
              })

              commit('employeeInventoryBalance',{
                employeeBalance
              })

            }else if(inventoryList[i].name == 'detergent'){
              let detergentTotal = inventoryList[i].total
              let detergentBalance = inventoryList[i].balance
              
              commit('detergentInventoryTotal',{
                detergentTotal
              })

              commit('detergentInventoryBalance',{
                detergentBalance
              })

            }else if(inventoryList[i].name == 'washers'){
              let washerTotal = inventoryList[i].total
              let washerBalance = inventoryList[i].balance
              
              commit('washerInventoryTotal',{
                washerTotal
              })

              commit('washerInventoryBalance',{
                washerBalance
              })
            }else if(inventoryList[i].name == 'dryers'){
              let dryerTotal = inventoryList[i].total
              let dryerBalance = inventoryList[i].balance
              
              commit('dryerInventoryTotal',{
                dryerTotal
              })

              commit('dryerInventoryBalance',{
                dryerBalance
              })
            }else if(inventoryList[i].name == 'spares'){
              let spareTotal = inventoryList[i].total
              let spareBalance = inventoryList[i].balance
              
              commit('spareInventoryTotal',{
                spareTotal
              })

              commit('spareInventoryBalance',{
                spareBalance
              })
            }   
          }
        }).catch((error)=>{
          commit('alertMessage', {
            message: error.response.data.message
          })
        })
      }
    }
  },  
  modules: {}
});
