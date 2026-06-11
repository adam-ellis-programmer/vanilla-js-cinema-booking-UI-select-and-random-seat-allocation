// import './test.js'

const cinema = document.querySelector('.cinema')
const updateBtn = document.querySelector('.check-bookings')
const fullSpan = document.querySelector('.full-span')

const clearBookingsBtn = document.querySelector('.clear-bookings')
const randomBookingsBtn = document.querySelector('.random-bookings')

const rows = 5
const seatsPerRow = 5
// const partitions = 2

async function wait(time) {
  await new Promise((res) => setTimeout(res, time))
}

const topLables = ['A', 'B', 'C', 'D', 'E']
let bookedSeats = []

for (let i = 0; i < rows; i++) {
  const row = document.createElement('div')
  row.className = 'row'

  const rowLabel = document.createElement('div')
  rowLabel.className = 'row-label'
  rowLabel.textContent = i
  row.append(rowLabel)

  for (let j = 0; j < seatsPerRow; j++) {
    // await wait(100)
    const seat = document.createElement('div')
    seat.setAttribute('data-row', i)
    seat.setAttribute('data-col', topLables[j])
    seat.setAttribute('data-cell-info', `${i}-${topLables[j]}`)
    seat.className = 'seat'

    if (i === 0) {
      seat.textContent = topLables[j]
      seat.setAttribute('data-top-id', topLables[j])
      seat.classList.add('top-row')
    }

    seat.addEventListener('click', (e) => {
      const row = e.target.dataset.row
      const col = e.target.dataset.col
      const bookedCell = e.target.dataset.cellInfo
      const found = bookedSeats.find((item) => item.seatBooked === bookedCell)
      if (found) {
        console.log('found')
        const filtered = bookedSeats.filter(
          (item) => item.seatBooked !== bookedCell,
        )
        bookedSeats = filtered
      } else {
        bookedSeats.push({ seatBooked: bookedCell })
        console.log('not found')
      }

      e.target.classList.toggle('taken')
    })

    row.append(seat)
  }

  cinema.append(row)
}

const ls = {
  setLocalStorage(item) {
    let items = JSON.parse(localStorage.getItem('cinema'))

    if (items === null) {
      items = []
    }

    items.push(item)

    localStorage.setItem('cinema', JSON.stringify(items))

    return items
  },

  setLs(data) {
    localStorage.setItem('cinema', JSON.stringify(data))
  },

  getLs() {
    let items = JSON.parse(localStorage.getItem('cinema'))

    if (items === null) {
      items = []
    }

    return items
  },
}

// update booking logic
updateBtn.addEventListener('click', () => {
  bookedSeats = []
  const itmesFromStorage = ls.getLs()

  const seats = document.querySelectorAll('.seat')

  seats.forEach((item) => {
    if (item.classList.contains('taken')) {
      const bookedCell = item.dataset.cellInfo
      bookedSeats.push({ seatBooked: bookedCell })
    }
  })

  ls.setLs(bookedSeats)
  const updatedStorage = ls.getLs()
  fullHouseCheck(updatedStorage)
  // console.log(bookedSeats)
})

clearBookingsBtn.addEventListener('click', (e) => {
  const seats = document.querySelectorAll('.seat')

  seats.forEach((item) => {
    if (item.classList.contains('taken')) {
      item.classList.remove('taken')
    }
  })
  localStorage.removeItem('cinema')
})

// sliding scale
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

let prev = null

randomBookingsBtn.addEventListener('click', () => {
  const seats = cinema.querySelectorAll('.seat')

  const mappedSeats = Array.from(seats).filter(
    (item) => !item.classList.contains('top-row'),
  )

  mappedSeats.forEach((item) => item.classList.remove('taken'))

  const randomNums = Array.from({ length: 10 }, (_, i) => getRandomInt(0, 19))
  // console.log(randomNums)

  /**
   *
   */

  const booked = []

  randomNums.forEach((index) => {
    let randomNum = index

    while (booked.includes(randomNum)) {
      randomNum = getRandomInt(0, 20)
    }

    booked.push(randomNum)
    mappedSeats[randomNum].classList.add('taken')
  })
  // prev = randomNum
})

function fullHouseCheck(lsitems) {
  if (lsitems.length === 20) {
    fullSpan.style.display = 'block'
  } else {
    fullSpan.style.display = 'none'
  }
}

function renderTaken() {
  const lsitems = ls.getLs()
  const seats = document.querySelectorAll('.seat')

  seats.forEach((item) => {
    const sellInfo = item.dataset.cellInfo

    const found = lsitems.find((listItem) => listItem.seatBooked === sellInfo)

    if (found) {
      item.classList.add('taken')
    }
  })
  fullHouseCheck(lsitems)
}

renderTaken()
