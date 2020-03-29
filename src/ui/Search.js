import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import {Spinner} from './spinner/Spinner';
import Dashboard from './Dashboard';
import {stringify} from 'querystring';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            keyword_search: "",
            result: ""
        };
    }

    inputHandler = (event) => {
        this.setState({keyword_search: event.target.value});
    };

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

    fetchWithDelay = (url) => {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            // resolve(fetch(url, {
            //   method: 'GET',
            // })
            //   .then((response) => response.json()));
            var timeout = 3000;
            resolve(timeout) 
          }, 3000)
        });
      
        return promise;
      }

    handleFormSubmit = e => {
        e.preventDefault();
        const {keyword_search} = this.state;
        console.log("keyword_search :" + keyword_search)
        trackPromise(
            this.fetchWithDelay("google.com").then((time) => {
                console.log("please waiting...." + time);
                this.setState({result: "Prediction Covid 19"});
              })
        );

    };

    render() {
        console.log("render search ui");
        const {result} = this.state;
        return (
            <div className='App'>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>Welcome come to Sentimental Analysis</h1>
                    <div class='block'>
                    <label>Enter a keyword: </label>
                        <input
                            type='text'
                            onChange={this.inputHandler}
                            placeholder="e.g. #covid19"
                        />
                        <button className='button' type="submit" onClick={this.handleFormSubmit}>Search</button>
                    </div>
                </form>
                <Spinner />
                <br />
                <br />
                <Dashboard analyzed_data={result} />
            </div>


        );
    }
}


export default Search;