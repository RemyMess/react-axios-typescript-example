import React, { Component } from "react";
import {Grid, Button} from '@mui/material';
import { Text, Box } from 'grommet';
import { Link } from "react-router-dom";


import { Lock } from 'grommet-icons';
import { isThisTypeNode } from "typescript";

interface Props {
  referral_n_requirement: number;
  price_title: any;
  price_description: any;
  price_icon_url?: string;
  claim_url?: string;
  claim_msg?: string;
  user_n_referrals: number;
}

export default class ReferralPriceCard extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let isAvailable = (this.props.user_n_referrals >= this.props.referral_n_requirement);
    let claimMsg = "Claim!";
    if(this.props.claim_msg){
      claimMsg = this.props.claim_msg
    }

    return (
        <>
        <Box 
          style={
            isAvailable 
            ? {
              width: 250,
              height: 200,
              borderRadius: 10,
              backgroundColor: '#63d83a',
              justifyContent: "center",
              }
              : {
              width: 250,
              height: 200,
              borderRadius: 10,
              backgroundColor: '#DDDDDD',
              justifyContent: "center",
              }
            }
          direction="column"
          hoverIndicator={true}
          // justify="center"
          >
            {(this.props.referral_n_requirement == 0) || (
              <Text alignSelf="center" size="16px">{this.props.referral_n_requirement} friend(s) joining =</Text>
            )
            }
            <Text alignSelf="center" size="18px" weight="bold" margin={{top: "10px"}}>{this.props.price_title}</Text>
            
            <Box alignSelf="center">
              <Text alignSelf="center" style={{justifySelf:"center"}} size="14px" margin={{top: "10px"}}>{this.props.price_description}</Text>

            </Box>


            {/* background="#EAF1F1"
                    focusIndicator={true}
                    hoverIndicator="#DDDDDD" */}



            {isAvailable ?
              (
                <Box
                background="orange"
                round="xsmall"
                pad="xsmall"
                height="50px"
                width="100px"
                justify="center"
                alignSelf="center"
                focusIndicator={true}
                hoverIndicator="#D2FF09"
                margin={{ top: "15px" }}
                direction="column"
                onClick={()=>{}}
              >
                <Text alignSelf="center" weight="bold">
                  <a href={this.props.claim_url}>
                    {claimMsg}
                  </a>
                </Text>
            </Box>
              ) :
              (
              <Box
                background="grey"
                round="xsmall"
                pad="xsmall"
                height="50px"
                width="100px"
                justify="center"
                alignSelf="center"
                focusIndicator={true}
                hoverIndicator={false}
                margin={{ top: "15px" }}
                direction="column"
                onClick={()=>{}}
              >
              <Text alignSelf="center" >Locked <Lock size="14px"/></Text>
              </Box>
              ) 
              }
            </Box>


            {/* <Box
            // height="60px"
            direction="row"
            background="#606EEB"
            round="small"
            align="center"
            justify="center"
            pad="small"
            gap="xsmall"
            >
            {/* <img
                src={`/images/channel-icons/${this.props.channelName}.png`}
                width={40}
                height={40}
            ></img> */}
            {/* <Text color="white" size="24px" weight="bold">
                {this.props.channelName}
            </Text>
            </Box> */}
        </>
    );
  }
}