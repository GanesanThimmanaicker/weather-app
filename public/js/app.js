// const locationfn = (location) => {
//     fetch('http://localhost:3000/weather?address=' + location).then((response) => {
//         response.json().then((data) => {

//             if (data.error) {
//                 return console.log(data.error)
//             }
//             return {
//                 forecast: data.forecast,
//                 location: data.location
//             }

//         })
//     })

// }


const weatherForm = document.querySelector('form')

const searchText = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    const location = searchText.value


    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            }
            else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }

        })
    })
})
