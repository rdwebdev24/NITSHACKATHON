import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:5000/api";

const httpClient = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  return fetchUtils.fetchJson(url, options);
};

const dataProvider2 = jsonServerProvider(apiUrl, httpClient);

export const dataProvider = {
  ...dataProvider2,
  // get list 
  getList: (resource, params) => {
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      _sort: field,
      _order: order,
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;
    return httpClient(url).then(({ headers, json }) => {
     const newData = [];
     json.data.forEach(element => {
      const newObj = {id:element._id,...element};
      delete element._id;
      newData.push(newObj);
     });
      return {
        data: newData,
        total: json.data.length,
      };
    });
  },
  
  // DELETE //
  delete: (resource, params) =>{
     httpClient(`${apiUrl}/${resource}/${params.id}`, {
         method: 'DELETE',
     }).then(({ json }) => ({ data: json.msg }))},

};