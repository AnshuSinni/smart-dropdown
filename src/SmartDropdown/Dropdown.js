import React, { useState, useEffect } from 'react';
import { Dropdown, FormControl, InputGroup, Button } from "react-bootstrap"
import { BsSearch } from "react-icons/bs";

function CustomDropdown(props) {
  const { countries, onSelectCountry, onAddCountry, parent } = props;

  const [searchValue, setSearchValue] = useState("")
  const [countriesList, setCountriesList] = useState([])
  const [more, setMore] = useState(countries.length - countriesList.length)
  const [showMore, setShowMore] = useState(more > 0 ? true : false)

  useEffect(() => {
    setCountriesList(countries.length > 5 ? countries.slice(0, 5) : countries)
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
          Select a location
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
