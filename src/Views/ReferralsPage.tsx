import { Component, ChangeEvent , useState, useRef} from "react";
import TutorialDataService from "../services/tutorial.service";
import ITutorialData from '../types/tutorial.type';
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom"
import { EmailService } from "../services/firebase";
import { Text, Box, Button } from 'grommet';
import ReactGA from 'react-ga';

import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import ReferralPriceCard from "../components/ReferralPriceCard";

import AccountabilityImage from "../assets/social_accountability.png";
import HabitopiaLogoBlack from "../assets/habitopia_logo_black.png";


import { FaDiscord } from 'react-icons/fa';
import { Slack, Reddit, Twitter, Instagram} from 'grommet-icons';

import { useMediaQuery } from 'react-responsive'

import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  RedditIcon
} from "react-share";



type State = ITutorialData & {
  submitted: boolean,
  email_id: string,
  id: string,
  n_referral: number,
  share_url: string,
  isMobile: boolean,
};

interface Props {
    match: {params: {id: string}};

}



export default class ReferralsPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMobile: (window.innerWidth < 1200), 
      title: "",
      description: "",
      published: false,
      submitted: false,
      email_id: "",
      id: this.props.match.params.id ? this.props.match.params.id : "",
      n_referral: 0,
      share_url: this.props.match.params.id ? ("http://2023resolutions.me/ref/" + this.props.match.params.id) : "http://2023resolutions.me/ref/"
    };
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname)
    if(this.state.id !==""){
        EmailService.getNumberReferrals(this.state.id).then(
            (res: any) => {
                if(res){
                    this.setState({n_referral: res})
                }
            }
        )
    }
  }


  
  render() {

    return (
        <>
        {/* Banner */}
          <Box direction="column"
              style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: 'black',
                  // textAlign: "center", //horizontal
                  marginBottom: "12px"
                  // '&:hover': {
                  // backgroundColor: 'primary.main',
                  // opacity: [0.9, 0.8, 0.7],
                  // },
              }}
          >

            <Box alignSelf="center" direction="row" alignContent="center" style={{justifySelf: "center", display: "flex", textAlign: "center"}}>
            {(this.state.isMobile) ? (
              <>
              <Text color="white" margin={{top: "11px"}} alignSelf="center">
                Welcome! ❤️
                </Text>
              </>
              ) :
              (
              <>
              <Text color="white" margin={{top: "11px"}} alignSelf="center">
                Welcome to the
              </Text>
              <img src={"https://uploads-ssl.webflow.com/63624335410aba3df9a7c18f/63624335410abac499a7c1ff_logo%2520dark%2520background-p-500.png"}
              style={{height: "19px", alignSelf: "center", justifySelf: "center", marginTop: "15px", marginLeft: "10px"}}/>
              <Text size="20x" margin={{top: "15px", left: "5px"}}>❤️</Text>
              </>
              )
          }
            </Box>
          </Box>


            {/* Section */}
            <Grid2 container spacing={3} justifyContent="center" paddingLeft={"20px"} paddingRight={"20px"} direction={this.state.isMobile ? "column" : "row"}
              // style={{background: "#DDDDDD"}}
            >
            <Box
                  style={
                    (this.state.isMobile) ?
                    {
                      width: "100%",
                      // height: "200px",
                    }
                    : {
                      width: "50%",
                      // height: "100px",
                  }}
              >
                {/* <video 
                  autoPlay loop muted playsInline
                  style={{ height: "200%", width: "auto", marginTop: "10px", marginBottom: "10px"}}
                  > */}
                    <img src={AccountabilityImage} width="450px" style={
                      this.state.isMobile 
                      ? {alignSelf: "center", justifySelf: "center", alignItems: "center", borderRadius: "30px"}
                      : {alignSelf: "center", justifySelf: "center", alignItems: "center", borderRadius: "30px", marginTop: "50px"}
                      }/> 
                {/* </video> */}

              </Box>
             
             <Box
                  style={
                    (this.state.isMobile) ? 
                      {
                        width: "100%",
                        height: 620,
                        backgroundColor: 'primary.dark',
                        textAlign: "center",
                        paddingLeft: "20px",
                        paddingRight: "20px"
                      }
                      : {
                        width: "50%",
                        height: 500,
                        backgroundColor: 'primary.dark',
                        textAlign: "center",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        marginTop: "100px"
                    }}
              >
                <Text size="22px" margin={{bottom: "30px", top: "50px"}}>
                  Don't leave your friends behind 🏃🏽
                </Text>
                <Text size="32px" weight="bold" margin={{bottom: "0px"}}>
                  INVITE FRIENDS & GET EXTRA PERKS 🔥
                </Text> 
                <Text color="grey" size="18px" margin={{top: "15px", bottom: "30px"}}>
                  Share your unique link via WhatsApp, Twitter, Telegram, or other media with your friends and earn free products for each friend who signs up.
                </Text>
                  



                <Box direction={this.state.isMobile ? "column" : "row"} justify="center"
                >
                  <input type="text" value = {this.state.share_url} style={{borderRadius: "5px"}}/>
                  <Box onClick={() => {
                      navigator.clipboard.writeText(this.state.share_url);
                    }}
                    background="orange"
                    style={{
                      // border: "1px solid #C2C2C2",
                      width: "140px",
                      height: "40px",
                      textAlign: "center",
                      borderRadius: "10px"
                    }}
                    justify={"center"}
                    alignSelf="center"
                    focusIndicator={false}
                    hoverIndicator="#D2FF09"
                    margin={this.state.isMobile 
                      ? {top: "15px", "bottom": "15px"}
                      : {left:'15px', right: "15px"}}
                  >
                      <Text size="18px" weight="bold">Copy</Text>
                  </Box>
                  <Box direction="row" justify="center">
                    <WhatsappShareButton
                        url={this.state.share_url}
                        title={"Hey! I just found a cool suit of tools making sticking to New Years' resolutions easy: check it out!"}>
                        <WhatsappIcon
                          size={40}
                          round />
                      </WhatsappShareButton>

                    <TwitterShareButton
                      url={this.state.share_url}
                      title={"Hey! I just found a cool suit of tools making sticking to New Years' resolutions easy: check it out!"}>
                      <TwitterIcon
                        size={40}
                        round />
                    </TwitterShareButton>

                    <TelegramShareButton
                      url={this.state.share_url}
                      title={"Hey! I just found a cool suit of tools making sticking to New Years' resolutions easy: check it out!"}>
                      <TelegramIcon
                        size={40}
                        round />
                    </TelegramShareButton>
                  </Box>
                </Box>


              </Box>
            </Grid2>


          {/* WEB */}
          <Box
            pad="medium"
            style={
              this.state.isMobile 
              ? {
                width: "100%",
                height: "100px",
                // backgroundColor: "white",
                textAlign: "center", //horizontal
                marginTop: "60px"
              }
              : {
                width: "100%",
                height: "100px",
                // backgroundColor: "white",
                textAlign: "center", //horizontal
                marginTop: "20px"
              }
            }>
              <Text size="32px" weight="bold">How does it work?</Text>
          </Box>


          <Grid2 container spacing={3} alignContent="center" marginBottom={"40px"}
          justifyContent="center">
            <Grid2 xs={12} sm={4} justifyContent="center" display="flex">
              <ReferralPriceCard
                referral_n_requirement={0}
                price_title="Accountability groups 👥🙌🏼"
                price_description="Stick with a team in groups of ~25!"
                claim_url="https://forms.gle/yiJVYfD2BTyju4Df8"
                claim_msg="Join!"
                user_n_referrals={this.state.n_referral}
                />
            </Grid2>
                {/* price_description={(<>Groups of ~25 people (<Slack size="20px" color="plain"/> <WhatsappIcon size="20px" round={true}/> <TelegramIcon size="20px" round={true}/>)</>)} */}
            <Grid2 xs={12} sm={4} justifyContent="center" display="flex">
              <ReferralPriceCard
                referral_n_requirement={1}
                price_title={"Global Communities 🌍"}
                price_description={(<>Meet habit-builders from all 🌍!</>)}
                claim_url="https://chat.whatsapp.com/Jw3HCIYeKJz5bDjX1d7Njr"
                claim_msg="Join!"
                user_n_referrals={this.state.n_referral}
              />
            </Grid2>
            <Grid2 xs={12} sm={4} justifyContent="center" display="flex" alignSelf="center">
            <ReferralPriceCard
                referral_n_requirement={5}
                price_title="60-day tricks! 🧠"
                price_description="Science-backed habit-building hacks!"
                claim_url="https://habitopia.ghost.io/"
                // claim_msg="CLaim!"
                user_n_referrals={this.state.n_referral}
              />
            </Grid2>
            <Grid2 xs={12} sm={4} justifyContent="center" display="flex">
            <ReferralPriceCard
                  referral_n_requirement={10}
                  price_title={(<>Shout-out on <TwitterIcon size="20px" color="plain" round={true}/> <Instagram size="20px"/> <RedditIcon size="20px" round={true}/></>)}
                  price_description="Be globally known by the community!"
                  claim_url="asdas"
                  user_n_referrals={this.state.n_referral}
                  />
            </Grid2>
                  {/* // price_description="Be known by the community! " */}
            {/* <Grid2 xs={12} sm={4} justifyContent="center" display="flex">
              <ReferralPriceCard
                referral_n_requirement={25}
                price_title={(<><img src={HabitopiaLogoBlack} style={{height: "25px"}}/> beta key 🔑🤫</>)}
                price_description={"Habit-building made easy and fun."}
                claim_url="asdas"
                user_n_referrals={this.state.n_referral}
              />
            </Grid2>             */}
            <Grid2 xs={12} sm={4} justifyContent="center" display="flex">
              <ReferralPriceCard
                referral_n_requirement={25}
                price_title="Exclusive access key 🔑🤫"
                price_description={"Habit-building made easy and fun."}
                claim_url="https://www.producthunt.com/upcoming/habitopia"
                user_n_referrals={this.state.n_referral}
              />
            </Grid2>
        </Grid2>

        <Box style={{
                  width: "100%",
                  height: 200,
                  backgroundColor: 'black',
                  textAlign: "center", //horizontal
              }}
          >
            <Text weight="bold" size="28px" color="orange" margin={{top: "50px", bottom: "40px"}}>
              {this.state.n_referral} friends have joined!
            </Text>

            <Text color="white" size="28px" margin={{bottom: "40px"}}>
              Keep checking! 👀
            </Text>

            
          </Box>


      </>
    );
  }
}
