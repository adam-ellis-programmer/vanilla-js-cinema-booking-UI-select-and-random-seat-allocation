const randomBookingsBtn = document.querySelector('.random-bookings')

randomBookingsBtn.addEventListener('click', () => {
  const allIndexes = Array.from({ length: 20 }, (_, i) => i)

  // shuffle them randomly
  // Math.random - 0.5 SHIFTS the random
  // from 0 - 1 to
  // -0.5 - 0.5
  allIndexes.sort(() => Math.random() - 0.5) // -0.5 SHIFT

  console.log(Math.ceil(Math.random() - 0.5))
})
