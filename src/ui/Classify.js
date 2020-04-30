import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import {Spinner} from './spinner/Spinner';
import Dashboard from './Dashboard';
import axios from "axios";

const API_URL =  " http://localhost:5000/";

class Classify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_chart: true,
            result: []
        };
        this.inputFileRef = React.createRef();
        this.keyword_search = "";
        this.classifying = false;
        this.axios_instance = axios.create({
          baseURL: `${API_URL}/`,
          timeout: 30000
        });

    }

    inputHandler = async (event) => {
    };

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

    handleFormSubmit = e => {
        e.preventDefault();
        if (e.target.id == "btn_import") {
            this.inputFileRef.current.click();
        } else {
            this.keyword_search = this.input.value;

            if (this.classifying || this.keyword_search == "") {
              return;
            }
            console.log("keyword_search : " + this.keyword_search );
            // let res = await this.axios_instance.get('/classify');
            // console.log("keyword_search res : " + res);
            this.classifying = true;
            trackPromise(
              this.axios_instance.post('/classify', {
                text: this.keyword_search
              }, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })
                
            );

            trackPromise(
              this.axios_instance.get('/classify')
                .then(response => {
                    // handle success
                    console.log(response);
                    let data = response.data;
                    let key1 = Object.keys(data).map(key => {
                      return key;
                    });
        
                    let jsonData = [];
                    Object.keys(data[key1]).map(key2 => {
                        let val = data[key1][key2];
                        if (typeof val === 'number') {
                          let temp = { name: key2, value: val};
                          jsonData.push(temp);
                        } else {
                          val = "" + val.match(/[\d\.]+/g);
                          let temp = { name: key2, value: val};
                          jsonData.push(temp);
                        }

                        return key2;
                    });
                    this.input.value = "";
                    this.setState({result: jsonData});
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
                .then( () => {
                  // always executed
                  this.classifying = false
                })
                
            );
        }

    };

    
    onUploadFile = (e) => {
        let files = e.target.files;
        console.log("========= onUploadFile : " + files);
        let reader = new FileReader();
        reader.readAsText(files[0]);

        reader.onload = (e) => {
            // const content = e.target.result;

            this.keyword_search = e.target.result;

            this.keyword_search = this.keyword_search.replace(/(?:\r\n|\r|\n)/g, ';');

            console.log("keyword_search 2 : " + this.keyword_search);
            if (this.classifying || this.keyword_search == "") {
              return;
            }
            this.classifying = true;
            trackPromise(
              this.axios_instance.post('/classify', {
                text: this.keyword_search
              }, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })
                
            );

            
            trackPromise(
              this.axios_instance.get('/classify')
                .then(response => {
                    // handle success
                    console.log(response);
                    let data = response.data;
                    let key1 = Object.keys(data).map(key => {
                      return key;
                    });
        
                    let jsonData = [];
                    Object.keys(data[key1]).map(key2 => {
                        let val = data[key1][key2];
                        if (typeof val === 'number') {
                          let temp = { name: key2, value: val};
                          jsonData.push(temp);
                        } else {
                          val = "" + val.match(/[\d\.]+/g);
                          let temp = { name: key2, value: val};
                          jsonData.push(temp);
                        }

                        return key2;
                    });
                    this.input.value = "";
                    this.setState({result: jsonData});
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
                .then( () => {
                  // always executed
                  this.classifying = false
                })
                
            );

               
            // );
            // let jsonData = [];
            // JSON.parse(content, (key, val) => {
            //     console.log("=======type " + typeof val);
            //     if(typeof val === 'number') {
            //         console.log("======val (number) : " + val);
            //         let temp = { name: key, value: val};
            //         jsonData.push(temp);
            //     } else if (typeof val === 'string') {
            //         val = "" + val.match(/[\d\.]+/g);
            //         console.log("======val : " + val);
            //         let temp = { name: key, value: val};
            //         jsonData.push(temp);
            //     } else if (typeof key === 'string' && key.length > 0) {
            //         this.keyword_search = key;
            //     }
            //     return key;
            //   });
            //   this.setState({result: jsonData});
            //   e.target.value = null;
            //   this.input.value = "";

        }

    }
    render() {
        console.log("render search ui");
        const {result} = this.state;

        return (
            <div className='App'>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>Welcome to Sentimental Analysis Web User Interface</h1>
                    <div class='block'>
                    <label>Enter a tweet: </label>
                        <input
                            type='text'
                            onChange={this.inputHandler}
                            ref={(input) => this.input = input}
                            placeholder="e.g. #covid19"
                        />
                        <button id='btn_search' className='button' type="submit" onClick={this.handleFormSubmit}>Classify</button>
                        <button id='btn_import' className='button' type="submit" onClick={this.handleFormSubmit}>Import File</button>

                        <div >
                            <input  hidden="true"
                                    type="file"
                                    id="file"
                                    className="input-file"
                                    ref={this.inputFileRef} 
                                    onClick={e => (e.target.value = null)}
                                    onChange={this.onUploadFile} />
                        </div>

                    </div>
                </form>
                <Spinner />
                <br />
                <br />
                <br />
                <br />
                {result && result.length > 0 && (<Dashboard analyzed_data={result} keyword={this.keyword_search}  />)}
            </div>


        );
    }
}


export default Classify;