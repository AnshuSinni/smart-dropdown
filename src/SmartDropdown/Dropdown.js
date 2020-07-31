import React, { useState, useEffect } from 'react';
import { Dropdown, FormControl, InputGroup, Button } from "react-bootstrap"
import { BsSearch } from "react-icons/bs";

function CustomDropdown(props) {
  const { countries, onSelectCountry, onAddCountry, parent, maxList, selectedCountry } = props;

  const [searchValue, setSearchValue] = useState("")
  const [countriesList, setCountriesList] = useState([])
  const [more, setMore] = useState("")
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    setCountriesList(countries.length > maxList ? countries.slice(0, maxList) : countries)
    setMore(countries.length - maxList)
    if (countries.length > maxList) {
      setShowMore(true)
    }
    setSearchValue("")
  }, [countries, parent])

  const onChangeSearchValue = (event) => {
    let searchVal = event.target.value
    let tempCountriesList
    setSearchValue(searchVal)
    if (searchVal !== "") {
      tempCountriesList = countries.filter((item) => {
        if (item.toString().toLowerCase().includes(searchVal.toLowerCase())) {
          return item;
        };
      })
    } else {
      tempCountriesList = countries
    }
    console.log(tempCountriesList, tempCountriesList.length , maxList)
    if(tempCountriesList.length > maxList) {
      setMore(tempCountriesList.length - maxList)
    } else {
      setShowMore(false)
    }
    
    setCountriesList(tempCountriesList)
  }

  const getAllCountriesList = () => {
    setShowMore(false)
    setCountriesList(countries)
  }

  return (
    <div className="child">
      <Dropdown variant="secondary" className={"dropdown"}>
        <Dropdown.Toggle >
          {selectedCountry ? selectedCountry : "Select a location"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text ><BsSearch /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search"
              value={searchValue}
              onChange={onChangeSearchValue}
            />
          </InputGroup>
          {
            countriesList && countriesList.length ?
              countriesList.map((country, index) => {
                return (
                  <Dropdown.Item key={index} eventKey={country} onSelect={(eventKey, event) => onSelectCountry(eventKey, event)}>
                    {country}
                  </Dropdown.Item>
                )
              }) :
               searchValue && searchValue === " " &&
              <div>
                {`"${searchValue}" not found`}
                {
                  parent &&
                  <Button className="add-button" variant="secondary" onClick={() => onAddCountry(searchValue)}>Add & Select</Button>
                }
              </div>
          
          }
          {
            showMore &&
            <div className="show-more"
              style={{ float: "right", cursor: "pointer" }}
              onClick={getAllCountriesList}>
              {more} more...
             </div>
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default CustomDropdown;
