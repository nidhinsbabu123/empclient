import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// Add user 
export const addUser=async(body,header)=>{
    return await commonApi("POST",`${BASE_URL}/add`,body,header)
}

// Get users

export const allUsers = async(search) => {
    return await commonApi("GET",`${BASE_URL}/get-all-users?search=${search}`,"")
}

// Delete Employee
export const deleteUser = async(id)=>{
    return await commonApi("DELETE",`${BASE_URL}/delete-user/${id}`,{})
}

export const editUser = async(id,body,header)=>{
    return await commonApi("PUT",`${BASE_URL}/edit/user/${id}`,body,header)
}
