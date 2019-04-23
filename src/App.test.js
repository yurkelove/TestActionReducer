
import newsReducer, { initialState } from './newsReducer'
import * as t from './actionTypes'
import { newsAction,getNews } from './newsAction';

// UNIT TEST  


//REDUCER TEST

const sum = (a,b) => {
  return a + b;
}

//describe - зарезервированное слово из Jest
// Групировка - 1 тест
describe('тесты новостей', () => {
  it('NEWS_GET_REQUEST', () => {
    const action = {
      type: t.NEWS_GET_REQUEST
    }

     expect(newsReducer(initialState,action)).toEqual({
        ...initialState,
        data: null,
        isLoading: true,
        // errorMsg:null - Будут ошибки если уберем, но если добавим ...initialState - пропадут отнаследуемся от него
     })
      //ожидание чего то - expect
  })
  

  it('NEWS_GET_SUCESS', () => {
    const stateBefore = {
      data:null,
      isLoading: true,
      errorMsg: null
    }

    const action = {
      type: t.NEWS_GET_SUCCESS,
      payload: [1,2] // не важно что тут будет, главное что бы поле payload - сохранилось в data
    }

     expect(newsReducer(initialState,action)).toEqual({
        // ...initialState, // при приходе данных не правильно указывать InitialState, надо сразу описать , перед шагом что было
        ...stateBefore,// важно состояние до , за один шаг до екшена , это если action.Sucess
        isLoading:false,
        data: action.payload
     })
  })

  it('NEWS_GET_FAILURE', () => {
    //Стейт за шаг до получения ошибки Request-например
    const initialState = {
      errorMsg:null,
      data: null,
      isLoading:true,
    }

    const action = {
      type: t.NEWS_GET_FAILURE,
      // payload: '500 server', - не сработает так как поле у нас в payload другое
      payload: {
        errorMsg: '500 server',
      },
    }

     expect(newsReducer(initialState,action)).toEqual({
        ...initialState,
        isLoading: false,// находим ошибку в коде reducer - на добавили isLoading в reducer
        errorMsg: action.payload.errorMsg, // интересно только это поле в отличие от других тестов
     })
    
  })
  
})



///ACTION TESTS

describe('News action', () => {
  it('newsRequest', () => {
    expect(newsAction()).toEqual({
      type: 'NEWS_GET_REQUEST',
    })
  })
})


// // мы будем "мокать" не только асинхронный запрос
// // но и сам store, с помощью redux-mock-store
// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk' // стандартный redux-thunk
// // немного переменных из реального кода:
// import { API_ROOT } from './constants/Defaults' // общая часть адреса для всех API вызовов
// import fetchMock from 'fetch-mock' // библиотека для "мока" асинхронных запросов
// import expect from 'expect' // уже знакомый нам expect
// // сначала мы настраиваем store, как будто это наш реальный стор
// // так как в моем приложении только redux-thunk, я только его и передаю в middlewares
// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)


// //ACTION TEST
// describe('NewsActions', () => { // группируем на высшем уровне, чтобы отделить экшены для новостей от других

//   describe('async actions', () => { // группируем асинхронные экшены

//     // используем возможность jest. AfterEach будет вызываеться после каждого (it) теста.
//     // это нужно для того, чтобы результаты предыдущего теста не повлияли на следующий
//     afterEach(() => {
//       fetchMock.reset()
//       fetchMock.restore()
//     })

//     // тот самый асинхронный тест
//     it('creates NEWS_GET_SUCCESS when fetching news has been done', () => {

//       // создаем МОК для запроса API_ROOT/news, где API_ROOT может быть, чем-нибудь типа: http://myapi.com/
//       fetchMock.getOnce(`${API_ROOT}/news`, {
//         headers: { 'content-type': 'application/json' }, // описываем заголовки ответа
//         body: { data: [1, 2, 3], status: 'ok' }, // описываем сам ответ, опять без необходимости вставлять реальные данные
//       }) // можно сказать, мы сделали "фейковый (не настоящий) ответ".
      
//       // ожидаем, что у нас будет 2 экшена вызвано
//       const expectedActions = [
//         {
//           type: t.NEWS_GET_REQUEST,
//         },
//         {
//           type: t.NEWS_GET_SUCCESS,
//           payload: [1, 2, 3], // в ожидании важно указать теже данные, что были указаны выше в моке запроса
//         },
//       ]
      
//       // делаем мок стора - фейковый стор
//       const store = mockStore({})

//       // диспатчим (обязательно) вызов нашего асинхронного экшена по правилам redux
//       // так как это promise, ожидаем выполнение
//       return store.dispatch(getNews()).then(() => {
//         // ожидаем, что список всех экшенов полученный с помощью store.getActions()
//         // будет равен нашему массиву expectedActions
//         expect(store.getActions()).toEqual(expectedActions)
//       })
//     })
//   })
// })

