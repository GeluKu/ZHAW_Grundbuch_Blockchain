import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3'; //imports the local, metamask injected, web3 version from web3.js file
import estate from './estate'; //imports the smart contract for the real estate

let accounts;

class App extends Component {

  //WIP: others attribute to be defined here
  state={
    contractAddress:'',
    contractBalance:'',
    deployedFromAddress:'',
    email:'',
    newEmail:'',
    valueToBeTransferred:'',
    message:''
  };

  //event handler for the form submit ether to contract
  onFundsSubmit = async (event)=> {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    
    this.setState({message:'Waiting on transaction to be performed...'});

    await estate.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.valueToBeTransferred, 'ether')
     });

    this.setState({message:'Transaction performed!'});

  };

  //event handler for the change e-mail form
  onMailUpdateSubmit = async (event)=> {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    
    this.setState({message:'Waiting on transaction to be performed...'});
    let email=this.state.newEmail;
    this.setState({newEmail:''});

    await estate.methods.setEmail(email).send({from: accounts[0]});

    this.setState({message:'Transaction performed!'});
    
  }


  async componentDidMount(){

    const accounts=await web3.eth.getAccounts();
//WIP
    const contractAddress = await estate.options.address;
    let contractBalance = await estate.methods.queryBalance().call();
    let email = await estate.methods.email().call();
    const deployedFromAddress=accounts[0];

//WIP
    this.setState({contractAddress});
    this.setState({email});
    this.setState({deployedFromAddress});
  }

  render() {

    return (
      <div>

        
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">

  <header class="mdl-layout__header">
    
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">ZHAW project | Land Registry with Blockchain</span>
    </div>
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">Project authors: Kristina Grishina, Sasa Kelebuda, Gelu Constantin Liuta, Reto Odermatt </span>
      </div>


    <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
      <a href="#fixed-tab-1" class="mdl-layout__tab is-active">New real estate registration</a>
      <a href="#fixed-tab-2" class="mdl-layout__tab">Real estate information</a>
      <a href="#fixed-tab-3" class="mdl-layout__tab">Change real estate informaton</a>
      <a href="#fixed-tab-4" class="mdl-layout__tab">Delete real estate registration</a>
    </div>
  </header>

  <main class="mdl-layout__content">
  
  <section class="mdl-layout__tab-panel is-active" id="fixed-tab-1">
            <div class="page-content">
    
              <div id="mycard">
    
                <div class="demo-card-wide mdl-card mdl-shadow--2dp">
    
                  <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Register new real estate</h2>
                  </div>
    
    
                  <div class="mdl-card__supporting-text">
                    Please fill out all relevant information (all fields are mandatory)
                    <form action="#">
    
                      <div id="name">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                          <input class="mdl-textfield__input" type="number" id="GrundNr"></input>
                          <label class="mdl-textfield__label" for="sample3">Real estate nr.</label>
                        </div>
    
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                          <input class="mdl-textfield__input" type="text" id="EGrid"></input>
                          <label class="mdl-textfield__label" for="sample3">E-Grid</label>
                        </div>
                      </div>
    
                      <div id="name">
                        <div class="mdl-textfield mdl-js-textfield getmdl-select">
                            <input type="text" value="" class="mdl-textfield__input" id="GrundstückArt" readonly></input>
                            <input type="hidden" value="" name="GrundstückArt"></input>
                            <label for="GrundstückArt" class="mdl-textfield__label">Real estate type</label>
                            <ul for="GrundstückArt" class="mdl-menu mdl-menu--bottom-left mdl-js-menu">
                                <li class="mdl-menu__item" data-val="DEU">Construction</li>
                                <li class="mdl-menu__item" data-val="BLR">Land</li>
                                <li class="mdl-menu__item" data-val="RUS">...</li>
                            </ul>
                        </div>
    
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                          <input class="mdl-textfield__input" type="number" id="Flaeche"></input>
                          <label class="mdl-textfield__label" for="Flaeche">Surface</label>
                        </div>
                      </div>
    
                      <div id="name">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                          <input class="mdl-textfield__input" type="number" id="PlanNr"></input>
                          <label class="mdl-textfield__label" for="PlanNr">Plan nr.</label>
                        </div>
    
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                          <input class="mdl-textfield__input" type="text" id="Ortsbezeichnung"></input>
                          <label class="mdl-textfield__label" for="Ortsbezeichnung">Property Address</label>
                        </div>
                      </div>
    
                      <div id="next">
                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                          <i class="material-icons">arrow_forward</i>
                        </button>
                      </div>
    
                    </form>
    
                  </div>
    
                </div>
    
              </div>
    
            </div>
    
          </section>
  
          
<section class="mdl-layout__tab-panel" id="fixed-tab-2">

  <div class="page-content">

  <div id="mycard">

    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Search real estate information</h2>
      </div>


      <div class="mdl-card__supporting-text">
      Please input the ID (hash value) for the real estate
        <form action="#">

          <div id="name">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="number" id="GrundNr"></input>
              <label class="mdl-textfield__label" for="sample3">hashkey</label>
            </div>
          </div>

       

        <div id="next">
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
          <i class="material-icons">arrow_forward</i>
          </button>
        </div>
        </form>

        
        <hr />
        <h6>Real estate data</h6> 
        <p>The real estate ID is:  {this.state.contractAddress}</p>
        <p>Blockchain registration was executed from the account: {this.state.deployedFromAddress}</p>
        <p>The real estate owner e-mail is: {this.state.email}</p>
        

           
      
        
        </div>
        </div>
        </div>
        

      </div>

</section>

<section class="mdl-layout__tab-panel" id="fixed-tab-3">

<div class="page-content">

  <div id="mycard">

    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Change real estate registration</h2>
      </div>
      <div class="mdl-card__supporting-text">
      Please input the ID (hash value) for the real estate
        <form action="#">

          <div id="name">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="number" id="GrundNr"></input>
              <label class="mdl-textfield__label" for="sample3">hashkey</label>
            </div>
          </div>

          <div id="next">
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
              <i class="material-icons">arrow_forward</i>
            </button>
          </div>

        </form>
        <br/>
      

      {/*change e-mail adress of the contract */}
      Please enter the new e-mail address

        <form action="#" onSubmit={this.onMailUpdateSubmit}>

          <div id="name">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="E-Mail" value={this.state.newEmail}
onChange={event => this.setState({newEmail: event.target.value})}></input>
              <label class="mdl-textfield__label" for="sample3"> new e-mail adress</label>
            </div>
          </div>

          <div id="next">
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
              <i class="material-icons">arrow_forward</i>
            </button>
          </div>

        </form>




{/* status message for waiting times*/}
<br />
<h7>{this.state.message}</h7>

      </div>    
        
      
      </div>
      </div>

    </div>

  </section>

  <section class="mdl-layout__tab-panel" id="fixed-tab-4">

    <div class="page-content">

      <div id="mycard">

        <div class="demo-card-wide mdl-card mdl-shadow--2dp">

          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Delete real estate registration</h2>
          </div>


          <div class="mdl-card__supporting-text">
          Please input the ID (hash value) for the real estate
            <form action="#">

              <div id="name">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="number" id="GrundNr"></input>
                  <label class="mdl-textfield__label" for="sample3">hashkey</label>
                </div>

              </div>

              <div id="next">
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                  <i class="material-icons">arrow_forward</i>
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  </section>
  
  </main>

  </div>   

</div>  

    );
  }
}

export default App;