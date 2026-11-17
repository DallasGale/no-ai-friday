import randomiseCards from "./randomise-cards.module.js"
import renderCards from "./render-cards.module.js"
import cardData from "./data.module.js"

const cardsParentEl = document.querySelector("#cards-parent")
const clicked_card_el = document.querySelector("#clicked-card")
let clicked_card = undefined

function whoAmI() {}
function playerSelections(cardButtons, id) {
  let selectedCards = []
  let isMatch = false
  let pointIterators = 0
  let currentPlayer = 1
  const playerPointsEl = document.querySelector(`#player-${id}-points`)

  console.log({playerPointsEl})

  return cardButtons.forEach((card) => {
    return card.addEventListener("click", (e) => {
      const cardValue = e.target.dataset.value
      e.target.dataset.selected = true
      selectedCards.push(cardValue)

      if (selectedCards.length === 2) {
        console.log("two cards")

        if (selectedCards[0] === selectedCards[1]) {
          console.log("we have a matched selectedCards")

          // console.log({currentPlayer})
          isMatch = true

          // pointIterators + 1
          // playerPointsEl.textContent = pointIterators
          cardButtons.forEach((card) => {
            if (card.dataset.selected === "true") {
              card.classList.add("hidden")
            }
          })
          return playerPointsEl
        } else {
          isMatch = false
          setTimeout(() => {
            cardButtons.forEach((card) => {
              if (card.dataset.selected === "true") {
                card.dataset.selected = "false"
              }
            })
          }, 2000)
        }

        if (currentPlayer === 1) {
          document.getElementById("1").dataset.current = true
          document.getElementById("2").dataset.current = false
          currentPlayer = 2
        }
        if (currentPlayer === 2) {
          document.getElementById("1").dataset.current = false
          document.getElementById("2").dataset.current = true
          currentPlayer = 1
        }
        console.log({currentPlayer})
        return
      }
    })
  })
}

// handle player turn
function playerTurn(id, player) {
  const cardButtons = document.querySelectorAll(".card")
  // let selectedCards = []
  // let pointIterators = 0
  // const playerPointsEl = document.querySelector(`#player-${id}-points`)
  // -  identify user (socket)
  if (player && cardButtons.length) {
    const {id, name} = JSON.parse(player)
    playerSelections(cardButtons, id)
  }
}

function startGame(
  startButton,
  cardsParentEl,
  cards,
  cardButtons,
  player1,
  player2,
) {
  // only one player can click START
  // set id's for player-1 and player-2
  const player1PointsElement = document.querySelector("#player-1-points")
  const player2PointsElement = document.querySelector("#player-2-points")
  const lsPlayer1 = window.localStorage.getItem("player-1")
  const lsPlayer2 = window.localStorage.getItem("player-2")
  const {id: p1_id, name: p1_name} = JSON.parse(lsPlayer1)
  const {id: p2_id, name: p2_name} = JSON.parse(lsPlayer2)

  player1PointsElement.id = p1_id
  player2PointsElement.id = p2_id
  console.log({player1PointsElement, p1_id, player2PointsElement, p2_id})

  if (startButton) {
    startButton.addEventListener("click", (e) => {
      console.log({e})
      renderCards(cardsParentEl, cards)
      setTimeout(() => {
        playerTurn(1, player1)
        playerTurn(2, player2)
      }, 10)
    })
  }
}

// listen for sessionStorage
function checkSessionStorage() {
  if (window.sessionStorage.getItem("user")) {
    console.log(window.sessionStorage.getItem("user"))
  }
}

function init() {
  console.log("...init")
  document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM content loaded")
    // randomiseCard(data)
    // renderCards(cards_parent, data)

    const form = document.querySelector("#form")
    const startButton = document.querySelector("#start-game")

    // -----------------------------------------------------
    // Watch for DOM changes
    // -----------------------------------------------------
    const targetNode = document.querySelector("#players")
    const config = {attributes: true, childList: true, subtree: true}
    const cardOrder = window.localStorage.getItem("randomCards")
    let currentPlayer = 1

    const callback = (mutationList, observer) => {
      const player1 = window.localStorage.getItem("player-1")
      const player2 = window.localStorage.getItem("player-2")
      const players = document.querySelectorAll(".player")

      for (const mutation of mutationList) {
        console.log({mutation})
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.")

          // We need to work out how to assign a socket connection to player 1

          if (players.length === 2) {
            // Set random order to storage so both connections will be in sync
            window.localStorage.setItem(
              "randomCards",
              JSON.stringify(randomiseCards(cardData)),
            )
            console.log("we have 2 players")
            form.classList.add("hidden")
            startButton.disabled = false

            if (cardOrder) {
              console.log("JSON.parse", JSON.parse(cardOrder))
              const cards = JSON.parse(cardOrder)
              startGame(startButton, cardsParentEl, cards, player1, player2)
            }

            return
          }
        } else if (mutation.type === "attributes") {
          console.log(`The ${mutation.attributeName} attribute was modified.`)
        }
      }
    }
    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)
    // -----------------------------------------------------
    // Watch for DOM changes
    // -----------------------------------------------------
  })
}

export default init()
