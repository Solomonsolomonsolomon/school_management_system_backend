import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
  button: String,
  buttonText: String,
  header: String,
  text: String,
  sideBar: String,
  sideBarText: String,
  background: String,
  headerText: String,
});
const gradeSchema = new mongoose.Schema({
  // base but e is omitted in default
  A: Number,
  B: Number,
  C: Number,
  D: Number,
  E: Number,
  F: Number,
  //WAEC standard
  A1: Number,
  A2: Number,
  B3: Number,
  B2: Number,
  B1: Number,
  C3: Number,
  C4: Number,
  C5: Number,
  C6: Number,
  D7: Number,
  E8: Number,
  F9: Number,
  // Additional variations
  A_p: Number,
  B_p: Number,
  C_p: Number,
  D_p: Number,
  E_p: Number,
  F_p: Number,
  //Minuses
  A_m: Number,
  B_m: Number,
  C_m: Number,
  D_m: Number,
  E_m: Number,
  F_m: Number,
  // Additional variations with extra plus
  A_pp: Number,
  B_pp: Number,
  C_pp: Number,
  D_pp: Number,
  E_pp: Number,
  F_pp: Number,
  // Add more grades as needed
});
const schoolSchema = new mongoose.Schema({
  name: String,
  school: String,
  schoolId: String,
  account_number: String,
  subaccount_code: String,
  busfees: { type: Number, default: 0 },
  themes: {
    type: themeSchema,
    default: {
      button: "#4B5563",
      header: "#4a5568",
      text: "#000000",
      sideBar: "#ffffff",
      sideBarText: "#404040",
      background: "#ffffff",
      headerText: "#000000",
      buttonText: "#ffffff",
    },
  },
  logo: {
    type: String,
    default:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgd2lkdGg9IjcyOC4yNTIwMSIgaGVpZ2h0PSI1OTguOTQyNjgiIHZpZXdCb3g9IjAgMCA3MjguMjUyMDEgNTk4Ljk0MjY4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTgyOC41NDkxNywyMTAuNzI1MThjNC42NTMyOS0xOC45Nzg1My4yMjg3OS00MS4xMTItMTQuODA0MjMtNTMuNTk1NDZhOTAuMDMxNDIsOTAuMDMxNDIsMCwwLDEtMjIuMDIwMTQsNTcuNzU3MzdjLTUuMzkzMTksNi4xNzA1My0xMi4wMzQyMSwxMi40NzIwOS0xMi4yOTU3OSwyMC42NjMxOS0uMTYyODYsNS4wOTY3LDIuMzI1MzMsOS45OTIsNS43NTM2MSwxMy43NjY3LDMuNDI4NTMsMy43NzQ3Niw3Ljc1MzU2LDYuNTk5NTcsMTIuMDI3MzgsOS4zODEzNGwuNjI3NjUsMS4xMDc0OEM4MTEuNTk1LDI0NS45Mjg3OCw4MjMuODk1ODksMjI5LjcwMzcyLDgyOC41NDkxNywyMTAuNzI1MThaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2YwZjBmMCIvPjxwYXRoIGQ9Ik04MTMuNDQyODYsMTU3LjQwN2E3Ni45NTI2Myw3Ni45NTI2MywwLDAsMSwyLjQ1MDI5LDQ3LjI4MjM5LDMzLjEzODIyLDMzLjEzODIyLDAsMCwxLTQuMDQ3OSw5LjU2MTM0LDE5LjAwNjI1LDE5LjAwNjI1LDAsMCwxLTcuNTU3LDYuNTUzNzVjLTIuODI0NjYsMS40Mjg1My01Ljg3OTQxLDIuNTYyNjUtOC4zMDc2Myw0LjY1Mjk0YTExLjYzNzY2LDExLjYzNzY2LDAsMCwwLTMuOTE1MSw4LjY3NWMtLjExNzI5LDQuMDg2NjUsMS4yNDA4MSw3Ljk3MTc0LDIuNzAxLDExLjcyNDg3LDEuNjIxMjEsNC4xNjcxMywzLjM3MTE2LDguNDY5OCwyLjk5NjQyLDEzLjAzMjIzLS4wNDU0LjU1MjguODE1LjU5MDkzLjg2MDM1LjAzOS42NTItNy45Mzc4NS00LjczOTEtMTQuNjQyNzgtNS41OTQxNy0yMi4zNDIwNi0uMzk5LTMuNTkyNjIuMjgyMjctNy4zMjcyNiwyLjkzODU0LTkuOTQ2NjIsMi4zMjI3OC0yLjI5MDUxLDUuNDcxODYtMy40NjI3Miw4LjM0NDM5LTQuODg0NDJhMjAuMjgxMTgsMjAuMjgxMTgsMCwwLDAsNy42Mjc4Ni02LjEzMjg1LDMwLjYzNTY2LDMwLjYzNTY2LDAsMCwwLDQuNDAwNTYtOS4zNzA0M0E3NC42NTc3OCw3NC42NTc3OCwwLDAsMCw4MTkuMzI2MjgsMTgzLjExYTc4LjMxNzMzLDc4LjMxNzMzLDAsMCwwLTUuMTIwODctMjYuMTAzNjFjLS4xOTcyMi0uNTE2NDYtLjk1ODQ4LS4xMTI0OS0uNzYyNTUuNDAwNTlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04MTcuNTMyODYsMTk5LjczNjczYTExLjU0NTM1LDExLjU0NTM1LDAsMCwwLDEyLjUxOTU2LTguMTcwODljLjE1NTc0LS41MzE3OS0uNjYzMzEtLjc5ODc4LS44MTkyNi0uMjY2MjlhMTAuNjkwNzIsMTAuNjkwNzIsMCwwLDEtMTEuNjYxMzQsNy41NzY4M2MtLjU0OTQ0LS4wNzIyNS0uNTg1MjYuNzg4NTEtLjAzOS44NjAzNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTgwNS44MTU4OSwyMjAuMjY4NzZhMjIuMjUyNzQsMjIuMjUyNzQsMCwwLDEtNC43MjA4MS0xNS41MTQ4MWMuMDQzNDUtLjU1Mjk0LS44MTctLjU5MTI0LS44NjAzNC0uMDM5QTIzLjE0NjE3LDIzLjE0NjE3LDAsMCwwLDgwNS4xOCwyMjAuODQ5NTdjLjM0NTM1LjQzNDguOTc5MzgtLjE0ODM3LjYzNTkxLS41ODA4MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTgxOC4wODMxNSwxNzQuNjU4MmE2LjUzNTIsNi41MzUyLDAsMCwxLTUuNjc1MDYtMi40OTk2MWMtLjMzOTY2LS40MzktLjk3MzM2LjE0NDcxLS42MzU5MS41ODA4MWE3LjMyMzIzLDcuMzIzMjMsMCwwLDAsNi4yNzIsMi43NzkxNS40NDUwOC40NDUwOCwwLDAsMCwuNDQ5NjYtLjQxMDY5LjQzMjc5LjQzMjc5LDAsMCwwLS40MTA2OS0uNDQ5NjZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03NDguNzM1LDE2OS40MTU5Yy4yMDQzLjI4MDEzLjQwODU5LjU2MDI1LjYxMDYzLjg0NzNhODYuMDY0ODgsODYuMDY0ODgsMCwwLDEsNy4yMjI3MSwxMS45NDc1MWMuMTY1OTUuMzIuMzI5My42NDY3My40ODU3Ljk3MDhhOTAuNzMxNzQsOTAuNzMxNzQsMCwwLDEsOC44MDU1LDMyLjIyMzMzLDg4LjExMTYyLDg4LjExMTYyLDAsMCwxLC4wNjIyNSwxMy4zODc2Yy0uNDQwNjEsNi4xNTYxNy0xLjQwODE2LDEyLjc5Ni4xNjQzOSwxOC41NjgyNmExNS4xMTQxMSwxNS4xMTQxMSwwLDAsMCwuNTgyNiwxLjc3NzgybDI5Ljc2OTExLDExLjM0NzA5Yy4wODA2LS4wMDgxNy4xNTktLjAwOTQ1LjIzOTg3LS4wMTc0OWwxLjE2Nzg4LjUwNzQxYy4wMzI1LS4yMjg3Ni4wNjEyOS0uNDY2NzEuMDkzNzgtLjY5NTQ2LjAxOTQxLS4xMzI2Mi4wMzIxOC0uMjY3NzYuMDUxNTgtLjQwMDM3LjAxMDg0LS4wODkyMi4wMjEzNi0uMTc4NTkuMDM2MjMtLjI1ODQ4LjAwMzcyLS4wMjk2OC4wMDcxMS0uMDU5NDkuMDA4MjUtLjA4MjQxLjAxNDg4LS4wNzk4OC4wMjAyMS0uMTU1NjcuMDMyNS0uMjI4NzVxLjI0NjktMS45OTQ0Ni40NjY2MS0zLjk5OTMyYy4wMDI2LS4wMDY4LjAwMjYtLjAwNjgtLjAwMTQ1LS4wMTYxM2ExMjkuNTU2MTUsMTI5LjU1NjE1LDAsMCwwLC4wMDcxMS0zMC42M2MtLjA0MDE4LS4zMDMxMy0uMDc3NDQtLjYxMjkzLS4xMzEyMi0uOTIxMjRhODQuMDc5MjMsODQuMDc5MjMsMCwwLDAtMi45NzY4NC0xMy4zOTQsNzQuMzI5MzksNzQuMzI5MzksMCwwLDAtMi42MDg2Mi03LjA1NEE2MS44MSw2MS44MSwwLDAsMCw3ODIuNDk3MTUsMTg2Ljk2Yy04LjUyODMtOS43MDcwOC0yMC4wNjYxNy0xNi41Nzg1OS0zMi43ODkzOC0xNy40ODQ0N0M3NDkuMzgyMjcsMTY5LjQ1MjYzLDc0OS4wNjMwOSwxNjkuNDMyLDc0OC43MzUsMTY5LjQxNTlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2YwZjBmMCIvPjxwYXRoIGQ9Ik03NDguNjU3OTEsMTY5LjgxOTI0YTc2Ljk1MjY0LDc2Ljk1MjY0LDAsMCwxLDMwLjQyMzY4LDM2LjI3NzEsMzMuMTM4MjMsMzMuMTM4MjMsMCwwLDEsMi41MjQ1NywxMC4wNzEzMSwxOS4wMDYzNCwxOS4wMDYzNCwwLDAsMS0yLjA4OCw5Ljc4MjYyYy0xLjM5NTI2LDIuODQxMjQtMy4xNTE0OSw1LjU4NTk1LTMuODMxNzksOC43MTY4OGExMS42Mzc2NSwxMS42Mzc2NSwwLDAsMCwyLjA5Njk1LDkuMjgzNjRjMi4zNjY4LDMuMzMzNTksNS43OTAyNiw1LjYxNzkzLDkuMjE1NzQsNy43MzU0OSwzLjgwMzM1LDIuMzUxMTUsNy43OTEwOSw0LjczMywxMC4yMzg3OCw4LjYwMTQ1LjI5NjU4LjQ2ODcyLDEuMDA2NTMtLjAxODg2LjcxMDQtLjQ4Njg3LTQuMjU4NTYtNi43MzA0Ny0xMi41OTk4Ni04LjgzODE4LTE3LjkxODA5LTE0LjQ3MDgxLTIuNDgxNTktMi42MjgyOS00LjE4NjE0LTYuMDIwMzYtMy42NDIzLTkuNzExLjQ3NTU3LTMuMjI3MzMsMi4yODQxOC02LjA1OTI0LDMuNzIxNzgtOC45MjM4NGEyMC4yODEzNywyMC4yODEzNywwLDAsMCwyLjM5OC05LjQ4OTIzLDMwLjYzNTU2LDMwLjYzNTU2LDAsMCwwLTIuMTI4MDUtMTAuMTMxMjEsNzQuNjU3OSw3NC42NTc5LDAsMCwwLTExLjU0OTExLTIwLjI3NTMxLDc4LjMxNzQ1LDc4LjMxNzQ1LDAsMCwwLTE5LjgwNDktMTcuNzU5MTZjLS40Njg0MS0uMjkzNjItLjgzMy40ODcyNi0uMzY3NjcuNzc5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNzc3LjQwOSwyMDEuMTU0NzJhMTEuNTQ1MzQsMTEuNTQ1MzQsMCwwLDAsNS4wNzY3My0xNC4wNjE2NGMtLjE5NTgyLS41MTgzNi0xLjAxMDU0LS4yMzg0Mi0uODE0NDYuMjgwNjRhMTAuNjkwNzEsMTAuNjkwNzEsMCwwLDEtNC43NDkxNSwxMy4wNzA2Yy0uNDgyMi4yNzMxMi4wMDc0My45ODIuNDg2ODguNzEwNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTc4MC40MTUzNCwyMjQuNjAyODNhMjIuMjUyNzUsMjIuMjUyNzUsMCwwLDEtMTMuMTEwMjktOS41NDU0NmMtLjI5ODIyLS40Njc2NS0xLjAwODI2LjAxOTc5LS43MTA0LjQ4Njg4YTIzLjE0NjIyLDIzLjE0NjIyLDAsMCwwLDEzLjY2MjY0LDkuOTA1MThjLjUzNzUyLjEzOTI0LjY5MjY1LS43MDgxMi4xNTgwNS0uODQ2NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTc2Mi43NDkzNSwxODAuNzk5NjFhNi41MzUyLDYuNTM1MiwwLDAsMS02LjAzNjE1LDEuNDIxYy0uNTM1NDktLjE0Ni0uNjkwMDYuNzAxNTctLjE1ODA2Ljg0NjZhNy4zMjMyNCw3LjMyMzI0LDAsMCwwLDYuNjgxMDktMS41NTcxOC40NDUwOC40NDUwOCwwLDAsMCwuMTExNzYtLjU5ODY0LjQzMjc5LjQzMjc5LDAsMCwwLS41OTg2NC0uMTExNzZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03MDkuMzc0LDU5OC4xMTUzYy05OS44MDM3MSwwLTE4MS04MS4xOTYyOS0xODEtMTgxczgxLjE5NjI5LTE4MSwxODEtMTgxYTE4Mi43MjksMTgyLjcyOSwwLDAsMSwzMS40NzcsMi43Mjc1NC45OTk4OC45OTk4OCwwLDEsMS0uMzQ1MjIsMS45Njk3M0ExODAuNzgxOCwxODAuNzgxOCwwLDAsMCw3MDkuMzc0LDIzOC4xMTUzYy05OC43MDA5MywwLTE3OSw4MC4yOTg4My0xNzksMTc5czgwLjI5OTA3LDE3OSwxNzksMTc5LDE3OS04MC4yOTg4MywxNzktMTc5YTE3OC41NDc1OCwxNzguNTQ3NTgsMCwwLDAtNDYuNjk1MDctMTIwLjU2ODg0LDEuMDAwMSwxLjAwMDEsMCwwLDEsMS40NzgtMS4zNDc2NiwxODAuNTQ0LDE4MC41NDQsMCwwLDEsNDcuMjE3LDEyMS45MTY1Qzg5MC4zNzQsNTE2LjkxOSw4MDkuMTc3NzEsNTk4LjExNTMsNzA5LjM3NCw1OTguMTE1M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZTRlNGU0Ii8+PGNpcmNsZSBjeD0iNTUzLjMwNzQzIiBjeT0iMTExLjg1MjIyIiByPSIzNS44MTEwMiIgZmlsbD0iIzZjNjNmZiIvPjxwYXRoIGQ9Ik03ODQuMjk2MDcsMjgxLjAxODg1YTMuOTgyMzQsMy45ODIzNCwwLDAsMS0zLjE4NjQ3LTEuNTkzNzJsLTkuNzY5NzktMTMuMDI2NjFhMy45ODMzOSwzLjk4MzM5LDAsMSwxLDYuMzczNTgtNC43Nzk4Nmw2LjM5MTczLDguNTIxNjYsMTYuNDE2MzQtMjQuNjI0MThhMy45ODM1NiwzLjk4MzU2LDAsMCwxLDYuNjI5LDQuNDE5MzZsLTE5LjUzOTU5LDI5LjMwOTM4YTMuOTg1MTksMy45ODUxOSwwLDAsMS0zLjIwNCwxLjc3MjY3Qzc4NC4zNywyODEuMDE4Miw3ODQuMzMzLDI4MS4wMTg4NSw3ODQuMjk2MDcsMjgxLjAxODg1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNzA0LjcxNzMzLDM4OS4wMjYzOCw2NDkuNDkzNjksMjM1LjM5NTUzbDEuNDAwMzktLjUwMzQyLTEwLjE1NjI1LTI4LjI1Njg0LTEuNDAwMzkuNTAzOTEtMTYuOTU2MDUtNDcuMTY5NDRhMTQuMjU1NDYsMTQuMjU1NDYsMCwwLDAtMTguMjM3MzEtOC41OTMyNmwtOTkuODMyNTIsMzUuODg1MjZhMTQuMjU1NjksMTQuMjU1NjksMCwwLDAtOC41OTM3NSwxOC4yMzczbDExLjgyMjI3LDMyLjg4OTM0LTIuMjEyNzEuODUyMTIsNy41NDY3NiwxOS41OTcxLDEuNzcxMzYtLjY4MjE5LDEuNTY3LDQuMzU5MTMtMS44ODUwNy43MjYsNy41NDY3NiwxOS41OTcxLDEuNDQzNzItLjU1Niw1NC43MzU5LDE1Mi4yNzQwNWExNC4yMjk3LDE0LjIyOTcsMCwwLDAsMTguMjM3NzksOC41OTM3NWw5OS44MzItMzUuODg1MjVBMTQuMjcyODksMTQuMjcyODksMCwwLDAsNzA0LjcxNzMzLDM4OS4wMjYzOFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjM2YzZDU2Ii8+PHBhdGggZD0iTTU5MS4wNDEwNiw0MzguMDg2YTYuODQ1MDYsNi44NDUwNiwwLDAsMS02LjQyNDMyLTQuNTI0NDFMNTAxLjQxMjE1LDIwMi4wODc0NWE2LjgzMTQ3LDYuODMxNDcsMCwwLDEsNC4xMTc2OC04LjczODc3bDIxLjI0MTIxLTcuNjM1MjUtLjAzMTc0Ljc0MzE2YTcuODczNzQsNy44NzM3NCwwLDAsMCwxMC41Mjk3OCw3Ljc0MjE5TDU4NC40MDk3MSwxNzcuMjU0YTcuOTc0MzksNy45NzQzOSwwLDAsMCw0LjQ4Nzc5LTUuNjM2MjMsNy44MDgzLDcuODA4MywwLDAsMC0xLjg2MDg0LTYuODM1bC0uNDk3NTYtLjU1MzIzLDIxLjk0MDkyLTcuODg3MmE2Ljg0MDQsNi44NDA0LDAsMCwxLDguNzM5MjYsNC4xMTgxNkw2OTYuNjA0LDM4MS4zMDYyYTE4LjE0NywxOC4xNDcsMCwwLDEtMTAuOTI2NzUsMjMuMTg4TDU5My4zNTYsNDM3LjY3OTc0QTYuODQxNTQsNi44NDE1NCwwLDAsMSw1OTEuMDQxMDYsNDM4LjA4NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMzQ3LjAzMzQxIiBjeT0iOTYuMzc3MTciIHI9IjI3IiBmaWxsPSIjNmM2M2ZmIi8+PHBhdGggZD0iTTY0OS44MTMwNywyODYuMTcwMjRsLTkzLjUwMjI2LDMzLjYwOTk0YTIuMzYxNzMsMi4zNjE3MywwLDEsMS0xLjU5Nzc5LTQuNDQ1bDkzLjUwMjI3LTMzLjYwOTk0YTIuMzYxNzMsMi4zNjE3MywwLDAsMSwxLjU5Nzc4LDQuNDQ1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNlNmU2ZTYiLz48cGF0aCBkPSJNNjIyLjA0NiwzMDcuNDgwNDRsLTMwLjc1NTUyLDExLjA1NTI1YTIuMzYxODUsMi4zNjE4NSwwLDEsMS0xLjU5Nzg3LTQuNDQ1MjNsMzAuNzU1NTItMTEuMDU1MjZhMi4zNjE4NSwyLjM2MTg1LDAsMCwxLDEuNTk3ODcsNC40NDUyNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZTZlNmU2Ii8+PHBhdGggZD0iTTYyOS4zNjEyMywzMjcuODMxMjdsLTMwLjc1NTUyLDExLjA1NTI1YTIuMzYxODQsMi4zNjE4NCwwLDEsMS0xLjU5Nzg2LTQuNDQ1MjNMNjI3Ljc2MzM3LDMyMy4zODZhMi4zNjE4NCwyLjM2MTg0LDAsMCwxLDEuNTk3ODYsNC40NDUyM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZTZlNmU2Ii8+PHBhdGggZD0iTTYzMy4xMDgsMzM4LjI1NDczLDYwMi4zNTI0OCwzNDkuMzFhMi4zNjE3MywyLjM2MTczLDAsMSwxLTEuNTk3NzgtNC40NDVsMzAuNzU1NTItMTEuMDU1MjVhMi4zNjE3MywyLjM2MTczLDAsMSwxLDEuNTk3NzksNC40NDVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2U2ZTZlNiIvPjxwYXRoIGQ9Ik02NDIuOTAxLDMxMS4zMTI5MmwtNjUuMjUyODQsMjMuNDU1NTJhMi4zNjE3MywyLjM2MTczLDAsMSwxLTEuNTk3NzktNC40NDVsNjUuMjUyODQtMjMuNDU1NTJhMi4zNjE3MywyLjM2MTczLDAsMSwxLDEuNTk3NzksNC40NDVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2U2ZTZlNiIvPjxwYXRoIGQ9Ik02MjkuNzU3NTQsMzYzLjU1ODEzbC0xMS4xNjcxOCw0LjAxNDExYTQuMDE2MDksNC4wMTYwOSwwLDAsMS0yLjcxNy03LjU1ODY5bDExLjE2NzE4LTQuMDE0MTFhNC4wMTYwOSw0LjAxNjA5LDAsMCwxLDIuNzE3LDcuNTU4NjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iIzZjNjNmZiIvPjxjaXJjbGUgY3g9IjMwNS44ODI0NCIgY3k9IjM0LjM4MDM1IiByPSIxLjU1Mjk5IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM2My4xNTcxNiwyNzIuMjUyNDVjMTcuNDA1NjEtMjAuNDg4NDEsNDUuNjQ3LTMzLjQwMDUsNzEuNjgzNTQtMjYuNzA2MjFhMTIzLjg2MzI4LDEyMy44NjMyOCwwLDAsMC00Ni42MzQ1NSw3MS4xMTMzYy0yLjUzMDc3LDEwLjk4NzEzLTQuMjAxNTcsMjMuNDcxLTEzLjEyMjEsMzAuMzY2NDUtNS41NTA0Nyw0LjI5MDY0LTEzLjAxMzgyLDUuNDYzNTQtMTkuOTg1NzUsNC42ODQ5My02Ljk3MjI1LS43Nzg4Mi0xMy42MDgyOC0zLjMyMjkxLTIwLjE1NS01Ljg0NDYzbC0xLjc0MDY0LjE5MzE3QzMzNy41ODExNSwzMTkuNTM0ODEsMzQ1Ljc1MTU1LDI5Mi43NDA4NSwzNjMuMTU3MTYsMjcyLjI1MjQ1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNmMGYwZjAiLz48cGF0aCBkPSJNNDM0Ljc3NTE2LDI0Ni4xMDY1MmExMDUuODY5NzQsMTA1Ljg2OTc0LDAsMCwwLTU0LjY4NTcxLDM1LjM4ODU5LDQ1LjU5MTI0LDQ1LjU5MTI0LDAsMCwwLTcuMzk1NDQsMTIuMjIxMTYsMjYuMTQ4NTUsMjYuMTQ4NTUsMCwwLDAtMS4yMTM0OCwxMy43MDgyN2MuNjg0NzksNC4zMDA2MywxLjg4MzI4LDguNjIwNDEsMS41MTA3MiwxMy4wMTI2MmExNi4wMTA3OSwxNi4wMTA3OSwwLDAsMS02LjUxNDM5LDExLjM1ODVjLTQuNDYxMjIsMy40MjU1Mi05Ljg4NzIzLDUuMDQzNzUtMTUuMjQ4NDEsNi40NDE4NS01Ljk1MjU2LDEuNTUyMzItMTIuMTYsMy4wNzAzOS0xNi45NDQwNyw3LjE2NjQ5LS41Nzk2NS40OTYzLTEuMzE1ODUtLjQzMjE1LS43MzcwNy0uOTI3Nyw4LjMyMzQ1LTcuMTI2NTEsMjAuMTQ0NDktNi41MjIyMywyOS40MTctMTEuNzc2MzMsNC4zMjY3My0yLjQ1MTY2LDcuOTQwODMtNi4yMjIwOSw4LjcxOTMzLTExLjI5NTA3LjY4MDc4LTQuNDM2MDktLjU1MTMxLTguODkxNzQtMS4yODIzMS0xMy4yNDAyM2EyNy45MDI1MSwyNy45MDI1MSwwLDAsMSwuNjg3MTItMTMuNDQ3OTUsNDIuMTQ4MTEsNDIuMTQ4MTEsMCwwLDEsNi44OTgyOS0xMi40NjAzOSwxMDIuNzEyNDksMTAyLjcxMjQ5LDAsMCwxLDIzLjM5MTQ1LTIxLjk4NjI0QTEwNy43NDcxLDEwNy43NDcxLDAsMCwxLDQzNC42MDcsMjQ0LjkzMzQ2Yy43MzQ3NS0uMTk2NTEuODk4MTYuOTc3ODIuMTY4MjEsMS4xNzMwNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM4NC4yODg2NiwyNzUuNjc0MjRhMTUuODgzODMsMTUuODgzODMsMCwwLDEtLjk4NDY5LTIwLjU0NDMyYy40NjcyOC0uNjAyMzYsMS40MjUyNi4wOTU0Ni45NTczNy42OTg2MmExNC43MDgwNywxNC43MDgwNywwLDAsMCwuOTU1LDE5LjEwODYzYy41MjM1Mi41NTQyNy0uNDA3MTcsMS4yODgxNy0uOTI3Ny43MzcwN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM3MC44NDYxMiwzMDUuMjg5NjhBMzAuNjE0ODEsMzAuNjE0ODEsMCwwLDAsMzkxLjk0OCwyOTguMDQ0Yy41ODEzOS0uNDk0MjIsMS4zMTc3Ni40MzQwNy43MzcwNy45Mjc3YTMxLjg0NCwzMS44NDQsMCwwLDEtMjEuOTczNzQsNy40OTUxNGMtLjc2MzE0LS4wMzQ0NS0uNjI0Mi0xLjIxMTQzLjEzNDgtMS4xNzcxN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQxMS44MDI0NCwyNTQuODQxODlhOC45OTEsOC45OTEsMCwwLDAsNy4zNjE5Miw0LjMxMTI5Yy43NjMyLjAyNDc2LjYyMzQ0LDEuMjAxNzctLjEzNDc5LDEuMTc3MTdhMTAuMDc1MTYsMTAuMDc1MTYsMCwwLDEtOC4xNTQ4Mi00Ljc1MTM5LjYxMjMyLjYxMjMyLDAsMCwxLC4wOTUzMS0uODMyMzguNTk1NDIuNTk1NDIsMCwwLDEsLjgzMjM4LjA5NTMxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDczLjU1NjY0LDMyNy45MjQ0OGMtLjQ3Ny0uMDAxOTEtLjk1NC0uMDAzODEtMS40MzY4OC4wMDIzOGExMTguNDA2NSwxMTguNDA2NSwwLDAsMC0xOS4xNDIxNiwxLjU4MDUxYy0uNDkwNDguMDczLS45ODY0NS4xNTQzMS0xLjQ3MzgyLjI0MTIyYTEyNC44MjcxOSwxMjQuODI3MTksMCwwLDAtNDMuMDIxNjQsMTYuMTYyODYsMTIxLjIyMiwxMjEuMjIyLDAsMCwwLTE0Ljk3NDYzLDEwLjcyNGMtNi41MDc2NSw1LjQ1NDQzLTEzLjEyOTYyLDExLjg4NjIyLTIwLjgzMjM3LDE0Ljc4NjlhMjAuNzkzNTksMjAuNzkzNTksMCwwLDEtMi40NTE2Ljc4Mzg0TDMzMy41NzMzLDM0OC4xNjhjLS4wNTU4OC0uMDk2NDMtLjExNzYyLS4xODQ4MS0uMTczOTEtLjI4MTVsLTEuNTA3MjEtLjg5Mjg2Yy4yMjg4MS0uMjIwNjYuNDcwODYtLjQ0NDYuNjk5NjctLjY2NTI1LjEzMjItLjEyODU1LjI3MjU2LS4yNTE3NC40MDQ3Ni0uMzgwMjkuMDkwNzEtLjA4NC4xODE4Ny0uMTY3NzkuMjU4OTMtLjI0ODc4LjAzMDA5LS4wMjgwNy4wNjA1OS0uMDU1ODguMDg1MjMtLjA3NTYzLjA3NzA2LS4wODEuMTU3MjQtLjE0OC4yMjg4MS0uMjIwNjZxMi4wMjQzNi0xLjg4MzIyLDQuMDgyMjMtMy43NDQ1MmMuMDA1NDktLjAwODM3LjAwNTQ5LS4wMDgzNy4wMTkxNC0uMDExMzksMTAuNDc3NDUtOS40MjgxOCwyMS44MzQwNi0xOC4wNjQ0OCwzNC4xNDA0NS0yNC43MDI1Mi4zNzAzMi0uMTk5NTkuNzQ1NzItLjQwNzgyLDEuMTMyNzktLjU5NjQzYTExNS42NzQxMiwxMTUuNjc0MTIsMCwwLDEsMTcuMzMxNTUtNy40OCwxMDIuMjY0MzgsMTAyLjI2NDM4LDAsMCwxLDkuOTY2ODQtMi43NzksODUuMDM3Miw4NS4wMzcyLDAsMCwxLDI2LjUzNjA4LTEuNjU4MTVjMTcuNjk3MTMsMS42ODEyNSwzNC42NTk1Nyw5LjAwMzY0LDQ1LjkyNzE5LDIyLjQ1NzA5QzQ3Mi45OTM4NSwzMjcuMjMyNTEsNDczLjI3NDEzLDMyNy41NzE3NCw0NzMuNTU2NjQsMzI3LjkyNDQ4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNmMGYwZjAiLz48cGF0aCBkPSJNNDczLjE2OTE1LDMyOC4zMzU2YTEwNS44Njk3LDEwNS44Njk3LDAsMCwwLTY0Ljk2OTg2LTQuNjY4NzYsNDUuNTkwODcsNDUuNTkwODcsMCwwLDAtMTMuMjYyODIsNS4zMDUzNCwyNi4xNDg1OCwyNi4xNDg1OCwwLDAsMC05LjIyMjIzLDEwLjIxNDY4Yy0yLjA0MjUxLDMuODQ2MTEtMy42ODYzOCw4LjAxNjc5LTYuNjI4MjYsMTEuMjk5NDFhMTYuMDEwODEsMTYuMDEwODEsMCwwLDEtMTIuMDQsNS4xNDdjLTUuNjI0NDMuMDQ5MTItMTAuOTMxMDktMS45MjU2NC0xNi4wNTM0NC00LjAzNzE0LTUuNjg3MzktMi4zNDQ0MS0xMS41NTc2OC00Ljg2OTYzLTE3Ljg0MzYxLTQuNDc5NDYtLjc2MTYzLjA0NzI3LS43OTA0NS0xLjEzNzI4LS4wMy0xLjE4NDQ4LDEwLjkzNjQ1LS42Nzg4MywyMC4wMTEwNyw2LjkyMDc0LDMwLjU3OCw4LjMwODMyLDQuOTMwNzEuNjQ3NDcsMTAuMDg2NDMtLjE4NzA2LDEzLjc2MjMxLTMuNzY4ODMsMy4yMTQzOS0zLjEzMjExLDQuOTEzMjUtNy40MzE1LDYuOTQ3NjgtMTEuMzQzNjRhMjcuOTAyNDcsMjcuOTAyNDcsMCwwLDEsOC42NDUyMi0xMC4zMjM3NCw0Mi4xNDc5Myw0Mi4xNDc5MywwLDAsMSwxMy4wMDk5MS01Ljc5NTY3LDEwMi43MTI1NiwxMDIuNzEyNTYsMCwwLDEsMzEuOTE0LTMuNDcxNTIsMTA3Ljc0NywxMDcuNzQ3LDAsMCwxLDM1Ljc2NSw3Ljc2MDU4Yy43MDUuMjg1NDYuMTI4NDEsMS4zMjE0OC0uNTcyLDEuMDM3ODlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00MTUuMDU2NjksMzIxLjU0NzQxYTE1Ljg4MzgzLDE1Ljg4MzgzLDAsMCwxLDExLjU4Mjg5LTE2Ljk5NjM0Yy43MzU3NS0uMTk5NjIsMS4wODA1MS45MzQzMi4zNDM3OCwxLjEzNDIxYTE0LjcwODA4LDE0LjcwODA4LDAsMCwwLTEwLjc0MjE5LDE1LjgzMjE2Yy4wODQzLjc1Nzc1LTEuMTAwNjcuNzgzMzktMS4xODQ0OC4wM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM4Ni40OTMsMzM3LjEwMDM0YTMwLjYxNDc3LDMwLjYxNDc3LDAsMCwwLDIxLjIxMTA1LDYuOTE5NTNjLjc2MTc3LS4wNDQ1OC43OTA4MiwxLjE0LjAzLDEuMTg0NDhhMzEuODQ0LDMxLjg0NCwwLDAsMS0yMi4wNTczOS03LjI0NTI2Yy0uNTg4NTgtLjQ4Ny4yMzEtMS4zNDMwNy44MTYzNy0uODU4NzVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00NDkuNTY3NDIsMzIxLjQ3OTE0YTguOTkxLDguOTkxLDAsMCwwLDMuMjgyMzksNy44NzQ3MWMuNTk0NDcuNDc5MjctLjIyNTc3LDEuMzM0OS0uODE2MzYuODU4NzVhMTAuMDc1MTcsMTAuMDc1MTcsMCwwLDEtMy42NTA1MS04LjcwMzQ5LjYxMjMzLjYxMjMzLDAsMCwxLC41NzcyNi0uNjA3MjIuNTk1NDEuNTk1NDEsMCwwLDEsLjYwNzIyLjU3NzI1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODg1LjUyMzYsNjY2LjA0MjU0YzE4Ljk3ODUzLDQuNjUzMjksNDEuMTEyLjIyODc5LDUzLjU5NTQ2LTE0LjgwNDIzYTkwLjAzMTQyLDkwLjAzMTQyLDAsMCwxLTU3Ljc1NzM3LTIyLjAyMDE0Yy02LjE3MDUyLTUuMzkzMTktMTIuNDcyMDgtMTIuMDM0MjEtMjAuNjYzMTktMTIuMjk1NzktNS4wOTY3LS4xNjI4Ni05Ljk5MiwyLjMyNTMzLTEzLjc2NjcsNS43NTM2MS0zLjc3NDc2LDMuNDI4NTMtNi41OTk1Nyw3Ljc1MzU1LTkuMzgxMzQsMTIuMDI3MzhsLTEuMTA3NDguNjI3NjVDODUwLjMyLDY0OS4wODg0MSw4NjYuNTQ1MDYsNjYxLjM4OTI2LDg4NS41MjM2LDY2Ni4wNDI1NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZjBmMGYwIi8+PHBhdGggZD0iTTkzOC44NDE4MSw2NTAuOTM2MjNhNzYuOTUyNjMsNzYuOTUyNjMsMCwwLDEtNDcuMjgyMzksMi40NTAyOSwzMy4xMzgyMiwzMy4xMzgyMiwwLDAsMS05LjU2MTM0LTQuMDQ3OSwxOS4wMDYzMSwxOS4wMDYzMSwwLDAsMS02LjU1Mzc1LTcuNTU3Yy0xLjQyODUzLTIuODI0NjYtMi41NjI2NS01Ljg3OTQxLTQuNjUyOTQtOC4zMDc2M2ExMS42Mzc2NiwxMS42Mzc2NiwwLDAsMC04LjY3NS0zLjkxNTFjLTQuMDg2NjUtLjExNzI5LTcuOTcxNzMsMS4yNDA4MS0xMS43MjQ4NywyLjcwMS00LjE2NzEzLDEuNjIxMjEtOC40Njk4LDMuMzcxMTYtMTMuMDMyMjMsMi45OTY0Mi0uNTUyOC0uMDQ1NC0uNTkwOTMuODE1LS4wMzkuODYwMzUsNy45Mzc4NS42NTIsMTQuNjQyNzgtNC43MzkxLDIyLjM0MjA2LTUuNTk0MTcsMy41OTI2My0uMzk5LDcuMzI3MjYuMjgyMjcsOS45NDY2MiwyLjkzODU0LDIuMjkwNTEsMi4zMjI3OCwzLjQ2MjcyLDUuNDcxODYsNC44ODQ0Miw4LjM0NDM5YTIwLjI4MTE4LDIwLjI4MTE4LDAsMCwwLDYuMTMyODUsNy42Mjc4NiwzMC42MzU3NywzMC42MzU3NywwLDAsMCw5LjM3MDQzLDQuNDAwNTYsNzQuNjU3NDcsNzQuNjU3NDcsMCwwLDAsMjMuMTQyMDYsMi45ODU4MSw3OC4zMTcwNyw3OC4zMTcwNywwLDAsMCwyNi4xMDM2MS01LjEyMDg2Yy41MTY0Ni0uMTk3MjIuMTEyNDktLjk1ODQ4LS40MDA1OS0uNzYyNTVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04OTYuNTEyMDUsNjU1LjAyNjIzYTExLjU0NTM1LDExLjU0NTM1LDAsMCwwLDguMTcwODksMTIuNTE5NTZjLjUzMTc5LjE1NTc0Ljc5ODc4LS42NjMzMS4yNjYyOS0uODE5MjZhMTAuNjkwNzMsMTAuNjkwNzMsMCwwLDEtNy41NzY4My0xMS42NjEzNGMuMDcyMjUtLjU0OTQ0LS43ODg1MS0uNTg1MjctLjg2MDM1LS4wMzlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04NzUuOTgsNjQzLjMwOTI2YTIyLjI1Mjc1LDIyLjI1Mjc1LDAsMCwxLDE1LjUxNDgxLTQuNzIwODFjLjU1Mjk0LjA0MzQ1LjU5MTI0LS44MTcuMDM5LS44NjAzNGEyMy4xNDYxNywyMy4xNDYxNywwLDAsMC0xNi4xMzQ1OCw0Ljk0NTI0Yy0uNDM0OC4zNDUzNS4xNDgzNy45NzkzOC41ODA4MS42MzU5MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTkyMS41OTA1OCw2NTUuNTc2NTJhNi41MzUyLDYuNTM1MiwwLDAsMSwyLjQ5OTYxLTUuNjc1MDZjLjQzOS0uMzM5NjYtLjE0NDctLjk3MzM2LS41ODA4MS0uNjM1OTFhNy4zMjMyNiw3LjMyMzI2LDAsMCwwLTIuNzc5MTUsNi4yNzIuNDQ1MDguNDQ1MDgsMCwwLDAsLjQxMDY5LjQ0OTY2LjQzMjc5LjQzMjc5LDAsMCwwLC40NDk2Ni0uNDEwNjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik05MjYuODMyODgsNTg2LjIyODM3Yy0uMjgwMTIuMjA0My0uNTYwMjUuNDA4NTktLjg0NzMuNjEwNjNhODYuMDY0ODgsODYuMDY0ODgsMCwwLDEtMTEuOTQ3NTEsNy4yMjI3MWMtLjMyLjE2Ni0uNjQ2NzMuMzI5My0uOTcwOC40ODU3YTkwLjczMTc0LDkwLjczMTc0LDAsMCwxLTMyLjIyMzMzLDguODA1NSw4OC4xMTE1LDg4LjExMTUsMCwwLDEtMTMuMzg3NTkuMDYyMjVjLTYuMTU2MTgtLjQ0MDYxLTEyLjc5Ni0xLjQwODE2LTE4LjU2ODI3LjE2NDM5YTE1LjExNDExLDE1LjExNDExLDAsMCwwLTEuNzc3ODIuNTgyNmwtMTEuMzQ3MDgsMjkuNzY5MTFjLjAwODE2LjA4MDYuMDA5NDQuMTU5LjAxNzQ4LjIzOTg3bC0uNTA3NCwxLjE2Nzg4Yy4yMjg3NS4wMzI1LjQ2NjcuMDYxMjkuNjk1NDUuMDkzNzguMTMyNjIuMDE5NDEuMjY3NzYuMDMyMTguNDAwMzguMDUxNTguMDg5MjEuMDEwODQuMTc4NTkuMDIxMzYuMjU4NDcuMDM2MjMuMDI5NjguMDAzNzIuMDU5NDkuMDA3MTEuMDgyNDEuMDA4MjUuMDc5ODkuMDE0ODguMTU1NjcuMDIwMjEuMjI4NzUuMDMyNXExLjk5NDQ2LjI0NjksMy45OTkzMi40NjY2MWMuMDA2OC4wMDI2LjAwNjguMDAyNi4wMTYxMy0uMDAxNDVhMTI5LjU1NjE1LDEyOS41NTYxNSwwLDAsMCwzMC42My4wMDcxMWMuMzAzMTMtLjA0MDE4LjYxMjkzLS4wNzc0NC45MjEyNC0uMTMxMjJhODQuMDc5MjMsODQuMDc5MjMsMCwwLDAsMTMuMzk0LTIuOTc2ODQsNzQuMzI5MzksNzQuMzI5MzksMCwwLDAsNy4wNTM5NS0yLjYwODYyLDYxLjgwOTg3LDYxLjgwOTg3LDAsMCwwLDE2LjMzNTQzLTEwLjMyNjQyYzkuNzA3MDgtOC41MjgzLDE2LjU3ODU5LTIwLjA2NjE3LDE3LjQ4NDQ3LTMyLjc4OTM4QzkyNi43OTYxNiw1ODYuODc1NjQsOTI2LjgxNjc0LDU4Ni41NTY0Niw5MjYuODMyODgsNTg2LjIyODM3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNmMGYwZjAiLz48cGF0aCBkPSJNOTI2LjQyOTU0LDU4Ni4xNTEyOGE3Ni45NTI2NCw3Ni45NTI2NCwwLDAsMS0zNi4yNzcxLDMwLjQyMzY4LDMzLjEzODIzLDMzLjEzODIzLDAsMCwxLTEwLjA3MTMxLDIuNTI0NTcsMTkuMDA2MzQsMTkuMDA2MzQsMCwwLDEtOS43ODI2Mi0yLjA4OGMtMi44NDEyNC0xLjM5NTI2LTUuNTg1OTQtMy4xNTE0OS04LjcxNjg4LTMuODMxNzlhMTEuNjM3NjUsMTEuNjM3NjUsMCwwLDAtOS4yODM2NCwyLjA5N2MtMy4zMzM1OCwyLjM2NjgtNS42MTc5Myw1Ljc5MDI2LTcuNzM1NDksOS4yMTU3NC0yLjM1MTE0LDMuODAzMzUtNC43MzMsNy43OTEwOS04LjYwMTQ1LDEwLjIzODc4LS40Njg3Mi4yOTY1OC4wMTg4NiwxLjAwNjUzLjQ4Njg3LjcxMDQsNi43MzA0Ny00LjI1ODU2LDguODM4MTgtMTIuNTk5ODYsMTQuNDcwODEtMTcuOTE4MDksMi42MjgyOS0yLjQ4MTU5LDYuMDIwMzYtNC4xODYxNCw5LjcxMS0zLjY0MjMsMy4yMjczMy40NzU1Nyw2LjA1OTI0LDIuMjg0MTgsOC45MjM4NCwzLjcyMTc4YTIwLjI4MTM4LDIwLjI4MTM4LDAsMCwwLDkuNDg5MjQsMi4zOTgsMzAuNjM1NTYsMzAuNjM1NTYsMCwwLDAsMTAuMTMxMi0yLjEyOCw3NC42NTc5LDc0LjY1NzksMCwwLDAsMjAuMjc1MzEtMTEuNTQ5MTFBNzguMzE3NDUsNzguMzE3NDUsMCwwLDAsOTI3LjIwODUsNTg2LjUxOWMuMjkzNjItLjQ2ODQxLS40ODcyNi0uODMzLS43NzktLjM2NzY3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODk1LjA5NDA2LDYxNC45MDIzNWExMS41NDUzNiwxMS41NDUzNiwwLDAsMCwxNC4wNjE2NCw1LjA3NjczYy41MTgzNy0uMTk1ODIuMjM4NDItMS4wMTA1NC0uMjgwNjQtLjgxNDQ2YTEwLjY5MDcxLDEwLjY5MDcxLDAsMCwxLTEzLjA3MDYtNC43NDkxNWMtLjI3MzEyLS40ODIyLS45ODE5NS4wMDc0My0uNzEwNC40ODY4OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg3MS42NDYsNjE3LjkwODcxYTIyLjI1MjY5LDIyLjI1MjY5LDAsMCwxLDkuNTQ1NDUtMTMuMTEwMjljLjQ2NzY1LS4yOTgyMi0uMDE5NzktMS4wMDgyNi0uNDg2ODgtLjcxMDRhMjMuMTQ2MjYsMjMuMTQ2MjYsMCwwLDAtOS45MDUxOCwxMy42NjI2NGMtLjEzOTI0LjUzNzUyLjcwODEyLjY5MjY1Ljg0NjYxLjE1ODA1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTE1LjQ0OTE3LDYwMC4yNDI3MmE2LjUzNTIsNi41MzUyLDAsMCwxLTEuNDIxLTYuMDM2MTVjLjE0Ni0uNTM1NDktLjcwMTU3LS42OTAwNi0uODQ2Ni0uMTU4MDZhNy4zMjMyNCw3LjMyMzI0LDAsMCwwLDEuNTU3MTgsNi42ODEwOS40NDUwOS40NDUwOSwwLDAsMCwuNTk4NjQuMTExNzYuNDMyNzkuNDMyNzksMCwwLDAsLjExMTc2LS41OTg2NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTk2MS41NzA1NCw0ODMuNjNsLTI4Ljk0LDQ4LjcsMS4xLjU4LTkuOCwxOC41OC0yLjA0LTEuMDgtNi40NCwxMC44MywxLjYuOTItMTAuNSwxOC4xOC0xLjgyLTEuMDUtOTQuNDMsMTU4LjkyYTE4LjI3Mzg4LDE4LjI3Mzg4LDAsMCwxLTI1LjAyLDYuMzdMNjA5LjczMDUxLDY0MC4yN2ExOC4yNzE2OSwxOC4yNzE2OSwwLDAsMS02LjM3LTI1LjAybDE1MS4yNy0yNTQuNThhMTguMjc0LDE4LjI3NCwwLDAsMSwyNS4wMi02LjM3bDE3NS41NSwxMDQuMzFBMTguMjgwNTcsMTguMjgwNTcsMCwwLDEsOTYxLjU3MDU0LDQ4My42M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjM2YzZDU2Ii8+PHBhdGggZD0iTTc5MS41MzcwNiw3MzQuNzUzLDYxNS4zNjg2NCw2MzAuMDc2NDhhNS42MzM5LDUuNjMzOSwwLDAsMS0xLjk2MzI4LTcuNzEyNDVMNzY1LjY3OTE4LDM2Ni4wOTAzN2E1LjYzMzg5LDUuNjMzODksMCwwLDEsNy43MTI0NS0xLjk2MzI4TDk0OS41Niw0NjguODAzNjJhNS42MzM4OSw1LjYzMzg5LDAsMCwxLDEuOTYzMjksNy43MTI0NUw3OTkuMjQ5NTEsNzMyLjc4OTczQTUuNjMzOSw1LjYzMzksMCwwLDEsNzkxLjUzNzA2LDczNC43NTNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjYyOC4wMjgxMiIgY3k9IjI2MC4zMzMyMiIgcj0iMS41NTI5OSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04NTQuMjkxLDU5NS45OTM1MSw3MDcuMjM0MzUsNTA4LjYxNDc3YTQuMDY2LDQuMDY2LDAsMSwxLDQuMTUzOTItNi45OTA5NWwxNDcuMDU2NjEsODcuMzc4NzRhNC4wNjYsNC4wNjYsMCwxLDEtNC4xNTM5Miw2Ljk5MDk1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNlNmU2ZTYiLz48cGF0aCBkPSJNNzk1LjU3MjMzLDU4Mi40NTRsLTQ4LjM3MS0yOC43NDEzM2E0LjA2NjE2LDQuMDY2MTYsMCwxLDEsNC4xNTQxMS02Ljk5MTI4bDQ4LjM3MSwyOC43NDEzMmE0LjA2NjE2LDQuMDY2MTYsMCwwLDEtNC4xNTQxMSw2Ljk5MTI5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNlNmU2ZTYiLz48cGF0aCBkPSJNNzc2LjU1NDI4LDYxNC40NjFsLTQ4LjM3MS0yOC43NDEzM2E0LjA2NjE2LDQuMDY2MTYsMCwwLDEsNC4xNTQxMS02Ljk5MTI4bDQ4LjM3MSwyOC43NDEzMmE0LjA2NjE2LDQuMDY2MTYsMCwxLDEtNC4xNTQxMSw2Ljk5MTI5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNlNmU2ZTYiLz48cGF0aCBkPSJNNzY2LjgxMzQ2LDYzMC44NTQ1NmwtNDguMzcxLTI4Ljc0MTMyYTQuMDY2LDQuMDY2LDAsMSwxLDQuMTUzOTEtNi45OTFsNDguMzcxLDI4Ljc0MTMzYTQuMDY2LDQuMDY2LDAsMSwxLTQuMTUzOTEsNi45OTA5NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZTZlNmU2Ii8+PHBhdGggZD0iTTgxMy4zMjQ3NSw2MTQuMzUxOTJsLTEwMi42MjctNjAuOTc5MzlhNC4wNjYsNC4wNjYsMCwwLDEsNC4xNTM5MS02Ljk5MDk1bDEwMi42MjcsNjAuOTc5MzlhNC4wNjYsNC4wNjYsMCwxLDEtNC4xNTM5MSw2Ljk5MDk1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNlNmU2ZTYiLz48cGF0aCBkPSJNNzkzLjc2NDA5LDY5Mi4yODM2N2wtMTcuNTYzMy0xMC40MzU4NGE2LjkxNDEyLDYuOTE0MTIsMCwwLDEsNy4wNjM2Ny0xMS44ODhsMTcuNTYzMjksMTAuNDM1ODRhNi45MTQxMSw2LjkxNDExLDAsMCwxLTcuMDYzNjYsMTEuODg4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiM2YzYzZmYiLz48Y2lyY2xlIGN4PSI1OTAuNjU4NjQiIGN5PSIzMzYuMzE0NDUiIHI9IjM2IiBmaWxsPSIjNmM2M2ZmIi8+PHBhdGggZD0iTTIzNi4yOTgsNjMzLjEzNDE3SDcyMy40Nzg4MlYzNTEuMDg2MDhhNy45OCw3Ljk4LDAsMCwwLTcuOTcxLTcuOTcwNzhIMjQ0LjI2OWE3Ljk4LDcuOTgsMCwwLDAtNy45NzEsNy45NzA3OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjY2FjYWNhIi8+PHJlY3QgeD0iMTUuNDc2MTUiIHk9IjIwMy42MTA3NSIgd2lkdGg9IjQ1Ny4wNzY1MiIgaGVpZ2h0PSIyNTkuNDkwNTciIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjM1Ljg3NCw2MjUuNTAyMXYzNC44MDVhMTAuOTg3MjksMTAuOTg3MjksMCwwLDAsMTAuOTg3MjUsMTAuOTg3NDFINDI2LjY3NTg4djY4LjY4ODY4aC0yLjM4ODc1YTEuNDI3MTksMS40MjcxOSwwLDAsMC0xLjQyNzI4LDEuNDI3MjNWNzQ2LjE4OGExLjQyNzIsMS40MjcyLDAsMCwwLDEuNDI3MjgsMS40MjcyOEg1MzUuOTEzNjlBMS40MjcyMSwxLjQyNzIxLDAsMCwwLDUzNy4zNDEsNzQ2LjE4OHYtNC43Nzc1NmExLjQyNzIsMS40MjcyLDAsMCwwLTEuNDI3MjktMS40MjcyM2gtMi4zODg3NVY2NzEuMjk0NTVINzEzLjMzOTU3YTEwLjk4NzI5LDEwLjk4NzI5LDAsMCwwLDEwLjk4NzI2LTEwLjk4NzQxdi0zNC44MDVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iIzNmM2Q1NiIvPjxwYXRoIGQ9Ik02NDIuMjg3Myw0NDAuOTIzSDQyNS44MzM0NGE1LjE0NSw1LjE0NSwwLDEsMSwwLTEwLjI5SDY0Mi4yODczYTUuMTQ1LDUuMTQ1LDAsMSwxLDAsMTAuMjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iI2U2ZTZlNiIvPjxwYXRoIGQ9Ik01NjkuNjU5MTMsNDY0LjE0ODU0SDQ5OC40NjEzN2E1LjE0NTI2LDUuMTQ1MjYsMCwxLDEsMC0xMC4yOTA1Mmg3MS4xOTc3NmE1LjE0NTI2LDUuMTQ1MjYsMCwxLDEsMCwxMC4yOTA1MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZTZlNmU2Ii8+PHBhdGggZD0iTTU2OS42NTkxMyw1MTEuMjU5ODdINDk4LjQ2MTM3YTUuMTQ1MjYsNS4xNDUyNiwwLDAsMSwwLTEwLjI5MDUzaDcxLjE5Nzc2YTUuMTQ1MjYsNS4xNDUyNiwwLDAsMSwwLDEwLjI5MDUzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNlNmU2ZTYiLz48cGF0aCBkPSJNNTY5LjY1OTEzLDUzNS4zODk3NUg0OTguNDYxMzdhNS4xNDUsNS4xNDUsMCwxLDEsMC0xMC4yOWg3MS4xOTc3NmE1LjE0NSw1LjE0NSwwLDEsMSwwLDEwLjI5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNlNmU2ZTYiLz48cGF0aCBkPSJNNjA5LjU4OTA2LDQ4Ny4zNzM2NEg0NTguNTMxNDRhNS4xNDUsNS4xNDUsMCwxLDEsMC0xMC4yOUg2MDkuNTg5MDZhNS4xNDUsNS4xNDUsMCwxLDEsMCwxMC4yOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzUuODc0IC0xNTAuNTI4NjYpIiBmaWxsPSIjZTZlNmU2Ii8+PHBhdGggZD0iTTYzOC42ODM1NCw1ODQuNzk0NTRINjEyLjgzMmE4Ljc0OSw4Ljc0OSwwLDAsMSwwLTE3LjQ5ODA1aDI1Ljg1MTU2YTguNzQ5LDguNzQ5LDAsMCwxLDAsMTcuNDk4MDVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM1Ljg3NCAtMTUwLjUyODY2KSIgZmlsbD0iIzZjNjNmZiIvPjxjaXJjbGUgY3g9IjEyMS44OTQ1MSIgY3k9IjMyNS43NjU4OCIgcj0iNDUiIGZpbGw9IiM2YzYzZmYiLz48cGF0aCBkPSJNODg0LjM1ODcsNzQ5LjQ3MTM0aC02NDcuMjk0YTEuMTkwNjksMS4xOTA2OSwwLDAsMSwwLTIuMzgxMzdoNjQ3LjI5NGExLjE5MDY5LDEuMTkwNjksMCwwLDEsMCwyLjM4MTM3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNS44NzQgLTE1MC41Mjg2NikiIGZpbGw9IiNjYWNhY2EiLz48Y2lyY2xlIGN4PSIyNDMuODAyNDEiIGN5PSIxOTYuNDAyNjgiIHI9IjEuNjk2MDIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=",
  },
  plan: String,
  isPaid: Boolean,
  isSuspended: Boolean,
  gradePoints: gradeSchema,
  gradeStyle: {
    type: String,
    enum: ["Tertiary", "US", "WAEC"],
    default: "Tertiary",
  },
});

schoolSchema.pre("save", function (next) {
  if (this.isNew) {
    this.gradePoints = {
      A: 70,
      B: 60,
      C: 50,
      D: 40,
      F: 0,
    };
  }

  if (this.isModified("gradeStyle")) {
   
  }
  next();
  //manually changing the gradepoints,this is not redundant code,it doesnt edit
});
const School = mongoose.model("School", schoolSchema);
School.syncIndexes();
export { School };
