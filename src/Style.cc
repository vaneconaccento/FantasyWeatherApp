/*fonts*/
@font-face {
  font-family: "Hobbiton Brushhand"; /* Name of the font */
  src: url("HobbitonBrushhandhobbitonBrush-WygA.ttf") format("truetype"); /* Relative path */
  font-weight: normal;
  font-style: normal;
}

/* app background and borders*/
.app-container {
  height: 100%;
  padding: 25px;
  color: #ffffff;
  font-stretch: extra-expanded;
  position: relative; /* Change to absolute or relative */
  display: flex;
  justify-content: center;
  align-items: center;
  animation: center;
  margin: 0 auto; /* Ensure centering */
  left: 0; /* Optional: adjust as needed */
  right: 0; /* Optional: adjust as needed */
  top: 0; /* Optional: adjust as needed */
  bottom: 0;
}

/* app content*/
.content-container {
  display: grid;
  position: relative; /* Change from fixed to relative */
  margin: auto;
  top: 25px;
  grid-template-columns: 3fr 1fr 3fr;
  grid-template-rows: 150px 150px 150px;
  gap: 15px;
  max-height: 450px;
  max-width: 650px;
  padding: 15px;
  background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/76f7b3f1-b080-4fc2-b063-acfc6981d5a8/d70c1s1-fa7abcdc-8331-4dd2-94ff-e7919b302c33.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc2ZjdiM2YxLWIwODAtNGZjMi1iMDYzLWFjZmM2OTgxZDVhOFwvZDcwYzFzMS1mYTdhYmNkYy04MzMxLTRkZDItOTRmZi1lNzkxOWIzMDJjMzMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Yd_6KkqFYOgWJY8671bqfQa_N1DNoN81r9eJPyFNfN4");
  background-size: cover;
  background-blend-mode: lighten;
  z-index: -15;
  border: 1px solid #000000;
  border-radius: 48px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  overflow-x: hidden;
}

/* search form container*/
.search-form {
  position: relative;
  grid-column: 2/3;
  grid-row:3/3;
  right:250px;
  width: auto;
  height: auto;
  
}

/* search form bar */
#search-field {
  font-family: serif;
  color: #ffffff;
  background-color: rgba(248, 247, 244, 0.3);
  border: 5px transparent; /* Set border to transparent */
  box-shadow: 0 0 0 3px rgb(251, 200, 65, 0.6); /* Keep the golden glow effect */
  border-radius: 15px; /* Rounded corners */
  padding: 2px 6px;
  width: 100%;
  height: 20px;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 3 / 3;
}

/* search form input*/
.search-input {
  flex-grow: .99; /* Makes input take up remaining space */
  height: 25px;
  background-color: rgba(248, 247, 244, 0.2);
  border: none;
  border-radius: 0;
  font-family: "Uncial Antiqua", serif;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  padding: 5px 10px;
}

.search-input:hover {
 
}

/* text under search bar that toggles on/off when go button clicked*/
#searching {
}

.search-button {
  color: #ffffff;
  font-family: "Uncial Antiqua", serif;
  font-size: 18px;
  position: absolute;
  top:10px;
  left:350px;
    }

/* search button glow config*/
.search-button:before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: rgba(255, 215, 0, 0.8); /* Golden inscription glow */
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 8px rgba(255, 215, 0, 1), 0 0 20px rgba(255, 215, 0, 0.7);
}

/* search button hover config*/
.search-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px 5px rgba(251, 200, 65, 0.8);
  cursor: pointer;
}

.temp {
  position: relative; /* Or absolute, depending on your layout */
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  font-family: "Uncial Antiqua", serif;
  font-size: 55px;
  text-align: left;
  white-space: nowrap;
  bottom: 70px;
  left: 25px;
  align-self: start
}

p #temperature {
}
.icon {
  height: 60px;
  width: 60px;
  left: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  grid-column: 1/1;
  grid-row:2/2;
}
.info {
  height: 160px;
  width: 160px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  grid-column: 1/1;
  grid-row:2/2;
  left:160px;
  bottom: 25px;
  font-family: "Uncial Antiqua", serif;
  font-size: 14px;
  font-stretch: expanded;
  text-align: left;
}
#wind,
#humidity,
#descriptor {
}

.time {
  height: 160px;
  width: 160px;
  grid-column: 3/3;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
 position: absolute;
  grid-column: 3/3;
  grid-row:2/2;
  font-family: "Uncial Antiqua", serif;
  font-size: 13px;
  font-stretch: expanded;
  text-align: left;
  right:45px;
  bottom:3px;
}
#hour,
#min {
}

.city {
  height: 160px;
  width: 160px;
  grid-column: 3/3;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  position: absolute;
  grid-column: 3/3;
  grid-row:2/2;
  right:80px;
  bottom:3px;
  font-family: "Uncial Antiqua", serif;
  font-size: 20px;
  font-stretch: expanded;
  text-align: left;
}

#city-result {
}

.date {
  display: flex;
  flex-direction: row; /* Ensure items are in a row */
  flex-wrap: nowrap; /* Prevent wrapping to new lines */
  justify-content: center; /* Center items horizontally */
  align-items: center; /* Align items vertically (optional) */
  position: absolute;
  grid-column: 2 / 3; /* Ensure it spans in the correct grid column */
  grid-row: 2 / 2; /* Ensure it spans in the correct grid row */
  right: 80px; /* Position from the right */
  top: 70px; /* Position from the top */
  width: auto;
  font-family: "Uncial Antiqua", serif;
  font-size: 13px;
  font-stretch: expanded;
  text-align: left;
}

#weekday,
#month,
#day,
#year {
}

footer {
  grid-column: 2 / 3;
  grid-row: 3;
  position: relative;
  bottom: 50px;
  text-align: center;
  font-size: 12px;
  font-family: "Uncial Antiqua", serif;
  color: rgb(247, 246, 243);
}

a: {
  color: #d40202;
}

a:before {
  color: #d40202;
}
a:hover {
  color: #d4af37;
}
