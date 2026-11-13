console.log("welcome...")
import {data} from "./data.js"

// handle player turn
// function
// randomly display and render cards
function randomiseCard(cardData) {
  if (cardData) {
    const randomCardData = cardData.sort(() => 0.5 - Math.random())
    return randomCardData
  }
}

// render cards to DOM
const cards_parent = document.querySelector("#cards-parent")
function renderCards(parentEl, cardsData) {
  let html = ""
  if (cardsData && parentEl) {
    html += cardsData.map(
      (card) =>
        `<div class="card" id=${card.value}><img src=${card.img} class="hidden" alt="" /></div>`,
    )
    parentEl.innerHTML = html.replaceAll(",", "")
  }
}

const clicked_card_el = document.querySelector("#clicked-card")
let clicked_card = undefined

// Card Value Updater
function updatedClickedCardValue(el, current_card) {
  if (el) {
    el.textContent = current_card
    return el
  }
}
// add event listeners to each card
function addCardEventListeners(cards) {
  if (cards.length) {
    console.log({cards})
    cards.forEach((card) => {
      return card.addEventListener("click", (e) => {
        // console.log("click", e.target.id)
        clicked_card = e.target.id
        updatedClickedCardValue(clicked_card_el, clicked_card)
        return clicked_card
      })
    })
  }
}

// Make sure the DOM is ready...
document.addEventListener("DOMContentLoaded", (e) => {
  randomiseCard(data)
  renderCards(cards_parent, data)

  const list_of_cards = document.querySelectorAll(".card")
  addCardEventListeners(list_of_cards, e)
  console.log({list_of_cards})

  // console.log({clicked_card_el})
})
