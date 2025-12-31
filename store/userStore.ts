import { create } from "zustand";

export const useUserStore = create((set)=>({
  users: [],
  total:0,
  fetchUsers: async (skip=0,search="")=>{
    const url = search
      ? `https://dummyjson.com/users/search?q=${search}`
      : `https://dummyjson.com/users?limit=10&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();
    set({users:data.users,total:data.total});
  },
  fetchUserById: async(id)=>{
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    return await res.json();
  }
}));
