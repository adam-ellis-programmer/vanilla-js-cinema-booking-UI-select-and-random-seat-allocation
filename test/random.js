// =================================================================

// ====================== one way to do this ===============
const randomNums = []
const indexArr = Array.from({ length: 10 }, (_, i) => i)
indexArr.forEach((index) => {
  randomNums.push(getRandomInt(0, 19))
})
// =========================================================

// =================================================================

let prev = null

for (let i = 0; i < 20; i++) {
  let randomNum = getRandomInt(0, 19)

  if (randomNum === prev) {
    //The % 19 (modulo) stops it going out of range by wrapping back to 0 if it hits 19.
    randomNum = (randomNum + 1) % 19 // nudge forward, wrap around if needed
  }

  prev = randomNum
  console.log(randomNum)
}

// =================================================================
randomBookingsBtn.addEventListener('click', () => {
  const seats = cinema.querySelectorAll('.seat')

  const mappedSeats = Array.from(seats).filter(
    (item) => !item.classList.contains('top-row'),
  )

  mappedSeats.forEach((item) => item.classList.remove('taken'))

  // all possible indexes [0,1,2,3...19]
  const allIndexes = Array.from({ length: mappedSeats.length }, (_, i) => i)

  // shuffle them randomly
  allIndexes.sort(() => Math.random() - 0.5)

  // take first 10 - guaranteed unique!
  allIndexes.slice(0, 10).forEach((index) => {
    mappedSeats[index].classList.add('taken')
  })
})

// =================================================================
let prev = null

randomNums.forEach((index) => {
  let randomNum = index

  // if it matches prev, keep rolling until it doesn't
  while (randomNum === prev) {
    randomNum = getRandomInt(0, 19)
  }

  mappedSeats[randomNum].classList.add('taken')
  prev = randomNum
})

// =================================================================
let prev = null
const booked = [] // track every seat, not just previous

randomNums.forEach((index) => {
  let randomNum = index

  // keep nudging until we find a seat not booked at all
  while (booked.includes(randomNum)) {
    randomNum = getRandomInt(0, 19)
  }

  booked.push(randomNum)
  prev = randomNum
  mappedSeats[randomNum].classList.add('taken')
})
// =================================================================
