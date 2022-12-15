import { Component, ChangeEvent } from "react";
import TutorialDataService from "../services/tutorial.service";
import ITutorialData from '../types/tutorial.type';
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom"
import { EmailService } from "../services/firebase";
import { Text, Box, Button } from 'grommet';
import { Lock } from 'grommet-icons';

type State = ITutorialData & {
  submitted: boolean,
  email_id: string,
  referral_id: string,
  isMobile: boolean,
  isEmail: boolean
};

interface Props {
  match: {params: {id: string}};
}


// TODO: check e



export default class LandingPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.state = {
      isEmail: false,
      isMobile: (window.innerWidth < 1200), 
      title: "",
      description: "",
      published: false,
      submitted: false,
      email_id: "",
      referral_id: this.props.match.params.id ? this.props.match.params.id : "",
    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
    }, ()=>
    {
    this.setState({isEmail: this.isValidEmail(e.target.value)})
    }
    );
  }

  isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  submitRegistration(email: string) {
    EmailService.register(email).then( (res) => {
      if(this.state.referral_id !== ""){
          EmailService.incrementReferral(this.state.referral_id)
        }
        this.setState({email_id: res, submitted: true})
      }
    )
  }

  render() {
    const { submitted, title, description } = this.state;

    return (
      <Box>
        {(submitted && (this.state.email_id!== "")) ? (
          <>
            <Redirect to={"/referrals/" + this.state.email_id} />
          </>

          // <div>
          //   <h4>You submitted successfully!</h4>
          //   <button className="btn btn-success" onClick={
          //       () => {
          //         this.submitRegistration(this.state.title)}
          //       }
          //     >
          //     Add
          //   </button>
          // </div> 


        ) : (
          <>
          <Box
              style={
                this.state.isMobile 
                ? {
                  width: "100%",
                  height: "100%",
                  // backgroundColor: 'white',
                  textAlign: "center", //horizontal
                  marginBottom: "12px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  // '&:hover': {
                  // backgroundColor: 'primary.main',
                  // opacity: [0.9, 0.8, 0.7],
                  // },
              }
                : {
                  width: "100%",
                  height: "100%",
                  // backgroundColor: 'white',
                  textAlign: "center", //horizontal
                  marginBottom: "12px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  // '&:hover': {
                  // backgroundColor: 'primary.main',
                  // opacity: [0.9, 0.8, 0.7],
                  // },
              }
            }
          >
            <Text color="black" margin={{top: "40px", bottom: "15px"}} weight="bold" size="32px">
              We aim to make 90% of you stick with your 2023 resolutions for 2 months.
            </Text>
          </Box>
          
          <Box style={{justifyContent: "center"}} width="100%">
              <video 
              autoPlay loop muted playsInline
              style={
                this.state.isMobile 
                ? { height: "20%", width: "100%", marginBottom: "30px", alignSelf: "center"}
                : { height: "20%", width: "75%", marginBottom: "30px", alignSelf: "center"}
              }
              >
                <source src="/ezgif.com-gif-maker.mp4" type="video/mp4"/> 
              </video>
          </Box>
          <Box direction={this.state.isMobile ? "column" : "row"}
            style={(this.state.isMobile) ? {justifyContent: "center", marginLeft: "10px", marginRight: "10px"} : {justifyContent: "center"}}>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={this.onChangeTitle}
                name="title"
                placeholder="jeff@bezos.com"
                style={{borderRadius: 4, height: "30px", fontSize: "18px", transition: "0.3s"}}
              />
            <Button 
              style={
                this.state.isMobile ? {
                  backgroundColor: "#E78A1E",
                  // border: "1px solid #C2C2C2",
                  width: "100%",
                  height: "35px",
                  textAlign: "center",
                  borderRadius: 5
                }
                : {
                backgroundColor: "#E78A1E",
                // border: "1px solid #C2C2C2",
                width: "170px",
                height: "35px",
                textAlign: "center",
                borderRadius: 5,
              }}
              alignSelf={this.state.isMobile ? "center" : "start"}
              justify="center"
              focusIndicator={true}
              disabled={!this.state.isEmail}
              hoverIndicator="black"
              size="2-0px"
              margin={this.state.isMobile ? {top:'5px', bottom: "50px"} : {left: "1px", bottom: "200px"}}
              
                // '&:hover': {
                // backgroundColor: 'primary.main',
                // opacity: [0.9, 0.8, 0.7],
                // },
            
            onClick={
                () => {
                  this.submitRegistration(this.state.title)}
                } className="btn btn-success">
              <Text size="18px">Step inside {this.state.isEmail ||  (<Lock size="14px"/>) }</Text>
            </Button>
          </Box>
          </>
        )}
      </Box>
    );
  }
}
