import * as t from './actionTypes' // экшен-тайпы

export const newsAction = () => ({
    type: t.NEWS_GET_REQUEST,
});


// // функция-хелпер, для вызова fetch
// const httpGet = async endPoint => {
//     try {
//       const response = await fetch(`${API_ROOT}/${endPoint}`)
//       if (response.ok) {
//         const json = await response.json()
//         return json
//       } else {
//         throw new Error(response.status)
//       }
//     } catch (err) {
//       console.warn('httpGet error ', err)
//     }
//   }
  
//   export function getNews() {
//     return (dispatch) => {
//       dispatch({
//         type: t.NEWS_GET_REQUEST,
//       })
  
//       // httpGet - функция хелпер
//       return httpGet(`news`)
//         .then(res => {
//           if (checkResponse(res)) {
//             dispatch(newsSuccess({
//               type: t.NEWS_GET_SUCCESS,
//               payload: res.data,
//             }))
//           } else {
//             // не протестировано! (можете взять на домашнее задание)
//             dispatch(newsFailure(res.message))
//           }
//         })
//         .catch(error => {
//           // не протестировано
//           dispatch(newsFailure())
//         })
//     }
//   }