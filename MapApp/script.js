'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;
navigator.geolocation.getCurrentPosition(
    function (position) {
      
      //console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
      const coords=[latitude, longitude];
      
      map = L.map("map").setView(coords, 16);  
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
  
      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        .openPopup();

        map.on("click",function(mapE){
            mapEvent=mapE;
            form.classList.remove("hidden");
            inputDistance.focus();

            console.log(mapEvent)
            
            
        })
    },
    function () {
      alert("could not get position");
    }
  );
  form.addEventListener("submit",function(e){
    form.reset()
    e.preventDefault()
    const lat=mapEvent.latlng.lat
    const lng=mapEvent.latlng.lng

    L.marker([lat, lng]).addTo(map)

                .bindPopup(L.popup({
                    maxWidth:250,
                    minWidth:100,
                    autoClose:false,
                    closeOnClick:false,
                    className:'running-popup',}))
                .setPopupContent("NOOOOO")    
                .openPopup();
    
  })
  inputType.addEventListener('change', function(){
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
 })
  

