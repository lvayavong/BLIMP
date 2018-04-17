import React from 'react';
import "../styles/style.css";

const Budget = (props) => { 
        
    return (
        <body>
        <div class="jumbotron">
             <h1 className="display-4"><strong>Simple Budgeting</strong></h1>
             <hr className="my-4"></hr>
             <p>Learn the basics of creating a budget and save!</p>
        </div>

        <div>
            <div className="container-fluid center-meh-boi">
                <div className="row">

                    <div className="col-sm-6 col-sm-offset-1">
                        <div className="box-of-stuff">
                            <form>
                                <input className="form-control input-lg" type="text" id="income" placeholder="Monthly Income" />
                                <input className="form-control input-lg" type="text" id="rent" placeholder="Rent" />
                                <input className="form-control input-lg" type="text" id="food" placeholder="Food" />
                                <input className="form-control input-lg" type="text" id="utilities" placeholder="Utilities" />
                                <input className="form-control input-lg" type="text" id="insurance" placeholder="Insurance" />
                            </form>
                            <button type="button" id="submit" className="btn btn-outline-secondary btn-lg">Submit</button>
                                <button data-balloon="Whats up!" data-balloon-pos="up">Hover me!</button>

                        </div>
                        
                    </div>
                
                            
                        
                    <div className="col-sm-4">
                        <div className="results">
                            <h1 className="title">Results</h1>
                            <span className="emoji">
                            </span>
                            <div id="results" className="results-data">
                                <p>Hit the submit button to see your results!</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </body>
    )
}
export default Budget;
