import React, { Component } from 'react';
import {allCities} from './Util';
import Cities from './Cities';


class Search extends Component {

  constructor(props){
    super(props)
    this.state = {
      search:'',
      badSearch:false,
      cities: []
        }
    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSubmitQuery = this.handleSubmitQuery.bind(this)
  }

  handleSearchInput(e){
    console.log("search input pressed");
    this.setState({
      search: e.target.value,
    })
  }

  // handleToggleSearch (e) {
  //   let badSearch = !this.state.badSearch
  //   this.setState(Object.assign(this.state, {badSearch, }))
  // }

  handleSubmitQuery(e){
    e.preventDefault()
    if(this.state.search.length > 2){
    allCities(this.state.search).then(data => {
      this.setState({
        search:'',
        badSearch: this.state.badSearch,
        cities: data
      })
      console.log("this is cityName from search", this.state.cities);
    })
  } else {
    this.setState({
      search:'',
      badSearch: !this.state.badSearch,
      cities:[]
    })
    alert('please enter more than 2 letters')
  }
 }

  render(){
    console.log("from search: ",this.state.cities)
    // let {handleSearchInput, handleSubmitQuery, query} = this.props

    return (
      <div>
      <form onSubmit={this.handleSubmitQuery}>
        <div className="form-group col-sm-4 col-sm-offset-4">
          <input
            onChange={this.handleSearchInput}
            value={this.state.value}
            className="form-control"
            type="text"
            placeholder="Enter a City..." />
        </div>
        <div className="form-group col-sm-4 col-sm-offset-4">
          <button
            className="btn btn-block btn-primary"
            type="submit">Search!</button>
        </div>
      </form>
      <Cities cities={this.state.cities}/>
      </div>
    )
  }
}

export default Search
