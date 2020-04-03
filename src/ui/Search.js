import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import {Spinner} from './spinner/Spinner';
import Dashboard from './Dashboard';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_chart: true,
            result: []
        };
        this.inputFileRef = React.createRef();
        this.keyword_search = "";
    }

    inputHandler = (event) => {
        this.keyword_search = event.target.value
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
        if (e.target.id == "btn_import") {
            this.inputFileRef.current.click();
        } else {
            console.log("keyword_search : " + this.keyword_search);
            trackPromise(
                this.fetchWithDelay("google.com").then((time) => {
                    console.log("please waiting...." + time);
                    const dummy_data = [
                        {
                          name: 'Postive', value: '80',
                        },
                        {
                          name: 'Negative', value: '23',
                        },
                        {
                          name: 'Non-Hate Speech', value: '85',
                        },
                        {
                          name: 'Hate Speech', value: '31',
                        },
                      ];
                    this.setState({result: dummy_data});
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
            const content = e.target.result;
            
            let jsonData = [];
            JSON.parse(content, (key, val) => {

                if (typeof val === 'string') {
                    //val = val.substring(0, val.length - 1);
                    val = "" + val.match(/\d+/g);
                    let temp = { name: key, value: val};
                    jsonData.push(temp);
                } else if (typeof key === 'string' && key.length > 0) {
                    this.keyword_search = key;
                }
                return key;
              });
              this.setState({result: jsonData});
              e.target.value = null;
        }

    }
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


export default Search;