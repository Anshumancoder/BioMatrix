import React, { useState } from "react";
import "./App.css";
import bgVideo from "./background_vid.mp4";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    vehicleOwned: "",
    foodType: "",
    meatType: "",
    clothType: "",
    IntTravelPerYear: "",
    buildingType: "",
    waterUsageDay: "",
    transportType: "",
    workCulture: "",
    Gardens: "",
    fuelTypeVehicle: "",
    fuelTypeDomestic: "",
    DailyTravel: ""
  });

  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 16;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCarbonFootprint = () => {
    let userTotalData = 0;

    if (formData.vehicleOwned === "Yes") userTotalData += 500;

    userTotalData +=
      formData.foodType === "Vegetarian" ? 100 :
      formData.foodType === "Lacto-Vegetarian" ? 200 :
      formData.foodType === "Pescetarian" ? 300 :
      formData.foodType === "Flexitarian" ? 400 :
      formData.foodType === "Non-Vegetarian" ? 500 : 0;

    userTotalData +=
      formData.meatType === "Beef" ? 800 :
      formData.meatType === "Mutton" ? 750 :
      formData.meatType === "Bacon" ? 700 :
      formData.meatType === "Pork" ? 650 :
      formData.meatType === "Turkey" ? 500 :
      formData.meatType === "Duck" ? 450 :
      formData.meatType === "Chicken" ? 400 :
      formData.meatType === "Seafood" ? 300 : 0;

    userTotalData +=
      formData.clothType === "Silk" ? 700 :
      formData.clothType === "Velvet" ? 660 :
      formData.clothType === "Georgette" ? 640 :
      formData.clothType === "Nylon" ? 580 :
      formData.clothType === "Wool" ? 550 :
      formData.clothType === "Rayon" ? 510 :
      formData.clothType === "Denim" ? 470 :
      formData.clothType === "Cotton" ? 440 : 0;

    userTotalData += Number(formData.IntTravelPerYear) * 200 || 0;

    userTotalData +=
      formData.buildingType === "High-Rise" ? 500 :
      formData.buildingType === "Low-Rise" ? 300 :
      formData.buildingType === "Independent" ? 650 : 0;

    userTotalData += Number(formData.waterUsageDay) || 0;

    userTotalData +=
      formData.transportType === "Bus" ? 600 :
      formData.transportType === "Bike" ? 400 :
      formData.transportType === "Car" ? 500 :
      formData.transportType === "Train" ? 750 : 0;

    if (formData.workCulture === "at home") {
      userTotalData /= 2;
    } else if (formData.workCulture === "at office") {
      userTotalData *= 2;
    }

    if (formData.Gardens === "Yes") {
      userTotalData /= 2;
    } else if (formData.Gardens === "No") {
      userTotalData *= 1.5;
    }

    userTotalData +=
      formData.fuelTypeVehicle === "Petrol" ? 500 :
      formData.fuelTypeVehicle === "Diesel" ? 450 :
      formData.fuelTypeVehicle === "Gasoline" ? 600 :
      formData.fuelTypeVehicle === "Hydrogen" ? 250 : 0;

    return userTotalData;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const total = calculateCarbonFootprint();
    setCarbonFootprint(total);
    setCurrentSlide(15);
  };

  const nextSlide = () => setCurrentSlide(prev => (prev + 1 < totalSlides ? prev + 1 : prev));
  const prevSlide = () => setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));

  return (
    <div>

      {/* ✅ WORKING BACKGROUND VIDEO */}
      <video autoPlay muted loop playsInline className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <h1 className="title">CarboPrint</h1>

      <form onSubmit={handleSubmit}>
        {currentSlide === 0 && (
          <>
            <label>First Name:</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} />

            <label>Last Name:</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
          </>
        )}

        {currentSlide === 1 && (
          <>
            <label>Do you own a vehicle? (Yes/No)</label>
            <input name="vehicleOwned" value={formData.vehicleOwned} onChange={handleChange} />
          </>
        )}

        {currentSlide === 2 && (
          <>
            <label>Choose one of the food types:</label>
            <input list="foodTypes" name="foodType" value={formData.foodType} onChange={handleChange} />
            <datalist id="foodTypes">
              <option value="Vegetarian" />
              <option value="Lacto-Vegetarian" />
              <option value="Non-Vegetarian" />
              <option value="Pescetarian" />
              <option value="Flexitarian" />
            </datalist>
          </>
        )}

        {currentSlide === 3 && (
          <>
            <label>Which meats do you eat?</label>
            <input name="meatType" value={formData.meatType} onChange={handleChange} />
          </>
        )}

        {currentSlide === 4 && (
          <>
            <label>What type of cloth do you use?</label>
            <input name="clothType" value={formData.clothType} onChange={handleChange} />
          </>
        )}

        {currentSlide === 5 && (
          <>
            <label>International travel per year:</label>
            <input type="number" name="IntTravelPerYear" value={formData.IntTravelPerYear} onChange={handleChange} />
          </>
        )}

        {currentSlide === 6 && (
          <>
            <label>Type of building you live in:</label>
            <input name="buildingType" value={formData.buildingType} onChange={handleChange} />
          </>
        )}

        {currentSlide === 7 && (
          <>
            <label>Daily water usage (L):</label>
            <input type="number" name="waterUsageDay" value={formData.waterUsageDay} onChange={handleChange} />
          </>
        )}

        {currentSlide === 8 && (
          <>
            <label>Transport type:</label>
            <input name="transportType" value={formData.transportType} onChange={handleChange} />
          </>
        )}

        {currentSlide === 9 && (
          <>
            <label>Work culture (home/office):</label>
            <input name="workCulture" value={formData.workCulture} onChange={handleChange} />
          </>
        )}

        {currentSlide === 10 && (
          <>
            <label>Do you garden? (Yes/No)</label>
            <input name="Gardens" value={formData.Gardens} onChange={handleChange} />
          </>
        )}

        {currentSlide === 11 && (
          <>
            <label>Vehicle fuel type:</label>
            <input name="fuelTypeVehicle" value={formData.fuelTypeVehicle} onChange={handleChange} />
          </>
        )}

        {currentSlide === 12 && (
          <>
            <label>Home fuel type:</label>
            <input name="fuelTypeDomestic" value={formData.fuelTypeDomestic} onChange={handleChange} />
          </>
        )}

        {currentSlide === 13 && (
          <>
            <label>Daily travel (km):</label>
            <input type="number" name="DailyTravel" value={formData.DailyTravel} onChange={handleChange} />
          </>
        )}

        {currentSlide === 14 && <button type="submit">Submit</button>}

        {currentSlide === 15 && (
          <>
            <h1>Your carbon footprint is:</h1>
            <h2>{carbonFootprint}</h2>
          </>
        )}
      </form>

      <button onClick={prevSlide} disabled={currentSlide === 0}>Previous</button>
      <button onClick={nextSlide} disabled={currentSlide === 15}>Next</button>

    </div>
  );
}

export default App;
