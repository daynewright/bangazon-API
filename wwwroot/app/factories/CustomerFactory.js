'use strict';

app.factory('CustomerFactory', function($q, $http){

  const getCustomers = ()=> {
    return $q((resolve, reject)=> {
      $http.get('/customers')
      .success((customers)=>{
        resolve(customers);
      })
      .error((error)=> {
        console.error('Unable to get customers: ', error);
        reject(error);
      });
    });
  };

  const getCustomer = (id)=> {
    return $q((resolve, reject)=> {
      $http.get(`customers/${id}`)
      .success((customer)=> {
        resolve(customer);
      })
      .error((error)=> {
        console.error(`Unable to get customer #${id}: `, error);
        reject(error);
      });
    });
  }

  const deleteCustomer = (id)=> {
    return $q((resolve, reject)=> {
      $http.delete(`customers/${id}`)
      .success(()=> {
        console.log('Customer deleted!');
        resolve();
      })
      .error((error)=> {
        console.error(`Unable to delete customer #${id}`);
      });
    });
  }

  return {getCustomers, getCustomer, deleteCustomer};
});
