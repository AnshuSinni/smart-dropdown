import React, { useState, useEffect } from 'react';

import Dropdown from './Dropdown';
import './index.css'

function SmartDropdown(props) {
  const { privelege } = props
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = React.useState("")
  const [getCountries, setGetCountries] = useState(false)

  useEffect(() => {
    fetch("http://168.235.109.53:5000/countries")
      .then(response => response.json())
      .then(data => {
        setCountries(data.countries)
      });
  }, [getCountries])

  useEffect(() => {
    setSelectedCountry("")
  }, [privelege])

  const onSelectCountry = (eventKey, event) => {
    setSelectedCountry(eventKey)
  }

  const onAddCountry = (searchValue) => {
    fetch(`http://168.235.109.53:5000/addcountry?name=${searchValue}`)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === "Success") {
          setGetCountries(true)
          setSelectedCountry(searchValue)
        }
      });
  }

  return (
    <div>
      <div className={"parent"}>
        Selected Country: {selectedCountry}
      </div>
      <Dropdown privelege={privelege} maxList="5" countries={countries} selectedCountry={selectedCountry} onSelectCountry={onSelectCountry} onAddCountry={onAddCountry} />
    </div>
  );
}

export default SmartDropdown;
