// render cards to DOM
const renderCards = (parentEl, cardsData) => {
  console.log({cardsData})
  let html = ""
  if (cardsData && parentEl) {
    html += cardsData.map(
      (card) =>
        `<button data-value=${card.value} data-selected="false" class="card" id=${card.value}><img style="pointer-events: none;" src=${card.img} class="hidden" alt="" /></button>`,
    )
    parentEl.innerHTML = html.replaceAll(",", "")
  }
}

export default renderCards
