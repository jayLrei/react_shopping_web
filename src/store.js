import { configureStore, createSlice } from '@reduxjs/toolkit'

let store = createSlice({
    name : 'store',
    initialState : 
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],  
    reducers : {
      addCount (state,action){
         let idnumber = state.findIndex((a)=>{
          return a.id == action.payload
        })
        state[idnumber].count++
      }
    },
    addItem(state, action){
      state.push(action.payload)
    }
}) 

export default configureStore({
  reducer: {
    store : store.reducer
   }
}) 

export let { addCount,addItem } = store.actions