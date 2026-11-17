const randomiseCards = (cardData) => {
  if (cardData) {
    const randomCardData = cardData.sort(() => 0.5 - Math.random())
    return randomCardData
  }
}

export default randomiseCards
