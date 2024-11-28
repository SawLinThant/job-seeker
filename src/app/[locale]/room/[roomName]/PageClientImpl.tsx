'use client';

import "@livekit/components-styles";

import { decodePassphrase } from '@/components/pages/livekit/client-utils';
import MyVideoConference from '@/components/pages/livekit/MyVideoConferences';
import { RecordingIndicator } from '@/components/pages/livekit/RecordingIndicator';
import { SettingsMenu } from '@/components/pages/livekit/SettingsMenu';
import appAxios from '@/lib/axios';
// import { SettingsMenu } from '@/components/pages/livekit/SettingsMenu';
import { ConnectionDetails } from '@/types/livekit';
import {
    ControlBar,
  formatChatMessageLinks,
  LiveKitRoom,
  LocalUserChoices,
  PreJoin,
  RoomAudioRenderer,
  VideoConference,
} from '@livekit/components-react';
import axios from 'axios';
import {
  ExternalE2EEKeyProvider,
  RoomOptions,
  VideoCodec,
  VideoPresets,
  Room,
  DeviceUnsupportedError,
  RoomConnectOptions,
} from 'livekit-client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import BackIcon from "@/components/icons/back";


const CONN_DETAILS_ENDPOINT =
  process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? '/api/connection-details';
const SHOW_SETTINGS_MENU = process.env.NEXT_PUBLIC_SHOW_SETTINGS_MENU == 'true';

export function PageClientImpl(props: {
  roomName: string;
  region?: string;
  hq: boolean;
  codec: VideoCodec;
}) {
  const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(
    undefined,
  );

  const {roomName} =useParams()

  const searchParams=useSearchParams()
  const username=searchParams.get("username");
  const preJoinDefaults = React.useMemo(() => {
    return {
      username: '',
      videoEnabled: true,
      audioEnabled: true,
    };
  }, []);
  const [connectionDetails, setConnectionDetails] = React.useState<ConnectionDetails | undefined>(
    undefined,
  );

  const handlePreJoinSubmit = React.useCallback(async (values: LocalUserChoices) => {
    setPreJoinChoices(values);
    const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
    url.searchParams.append('roomName', props.roomName);
    url.searchParams.append('participantName', values.username);
    if (props.region) {
      url.searchParams.append('region', props.region);
    }
    const connectionDetailsResp = await fetch(url.toString());
    const connectionDetailsData = await connectionDetailsResp.json();
    setConnectionDetails(connectionDetailsData);
  }, []);''

  useEffect(()=>{

    const getRoomToken=async()=>{    
        //  const connectionDetailsResp = await axios.get("https://dummyjson.com/todos");
         const connectionDetailsResp = await axios.post("https://api.jncs-mm.com/api/v1/live-kit",{ "room-name": roomName,"user-name":username },{ headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },});

    if(connectionDetailsResp?.data?.data?.token){
    setConnectionDetails({
                 serverUrl: "wss://cx-blbxkaog.livekit.cloud",
  roomName: connectionDetailsResp?.data?.data?.roomName,
  participantName: connectionDetailsResp?.data?.data?.participantName,
  participantToken: connectionDetailsResp?.data?.data?.token
    });

    }
    }
    getRoomToken()
    // const connectionDetailsData = await connectionDetailsResp.json();
    // console.log("connectionDetailsData",connectionDetailsData)
    // setConnectionDetails(connectionDetailsData);
    // const roomConnectFun=()=>{
    //      const url = new URL("https://api.jncs-mm.com/api/live-kit", window.location.origin);
    // url.searchParams.append('room-name','test');
    // url.searchParams.append('user-name', "testing");
    // if (props.region) {
    //   url.searchParams.append('region', props.region);
    // }
    // // console.log("url",url.toString())

    // const params = new URLSearchParams({ "room-name": "test","user-name":"testing" });
    // console.log("Params",params.toString())

   
    // }
    // roomConnectFun();
  },[])
  const handlePreJoinError = React.useCallback((e: any) => console.error(e), []);

  return (
    <main data-lk-theme="default" style={{ height: '100%' }}>
      {connectionDetails === undefined || username ===undefined ? (
        <div 
        >
         
        </div>
      ) : (
        <>
        
        {
            username ?  <VideoConferenceComponent
          connectionDetails={connectionDetails}
          userChoices={{
  videoEnabled: false,
  audioEnabled: false,
  videoDeviceId: '',
  audioDeviceId: '',
  username: username,
}}
          options={{ codec: props.codec, hq: props.hq }}
        />:null
        }
        </>
      
      )}
    </main>
  );
}

function VideoConferenceComponent(props: {
  userChoices: LocalUserChoices;
  connectionDetails: ConnectionDetails;
  options: {
    hq: boolean;
    codec: VideoCodec;
  };
}) {
  const e2eePassphrase =
    typeof window !== 'undefined' && decodePassphrase(location.hash.substring(1));

  const worker =
    typeof window !== 'undefined' &&
    e2eePassphrase &&
    new Worker(new URL('livekit-client/e2ee-worker', import.meta.url));
  const e2eeEnabled = !!(e2eePassphrase && worker);
  const keyProvider = new ExternalE2EEKeyProvider();
  const [e2eeSetupComplete, setE2eeSetupComplete] = React.useState(false);

  const roomOptions = React.useMemo((): RoomOptions => {
    let videoCodec: VideoCodec | undefined = props.options.codec ? props.options.codec : 'vp9';
    if (e2eeEnabled && (videoCodec === 'av1' || videoCodec === 'vp9')) {
      videoCodec = undefined;
    }
    return {
      videoCaptureDefaults: {
        deviceId: props?.userChoices?.videoDeviceId ?? undefined,
        resolution: props.options.hq ? VideoPresets.h2160 : VideoPresets.h720,
      },
      publishDefaults: {
        dtx: false,
        videoSimulcastLayers: props.options.hq
          ? [VideoPresets.h1080, VideoPresets.h720]
          : [VideoPresets.h540, VideoPresets.h216],
        red: !e2eeEnabled,
        videoCodec,
      },
      audioCaptureDefaults: {
        deviceId: props.userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
      e2ee: e2eeEnabled
        ? {
            keyProvider,
            worker,
          }
        : undefined,
    };
  }, [props.userChoices, props.options.hq, props.options.codec]);

  const room = React.useMemo(() => new Room(roomOptions), []);

  React.useEffect(() => {
    if (e2eeEnabled) {
      keyProvider
        .setKey(decodePassphrase(e2eePassphrase))
        .then(() => {
          room.setE2EEEnabled(true).catch((e) => {
            if (e instanceof DeviceUnsupportedError) {
              alert(
                `You're trying to join an encrypted meeting, but your browser does not support it. Please update it to the latest version and try again.`,
              );
              console.error(e);
            } else {
              throw e;
            }
          });
        })
        .then(() => setE2eeSetupComplete(true));
    } else {
      setE2eeSetupComplete(true);
    }
  }, [e2eeEnabled, room, e2eePassphrase]);

  const connectOptions = React.useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);

  const router = useRouter();
  const handleOnLeave = React.useCallback(() => router.push('/'), [router]);
  const handleError = React.useCallback((error: Error) => {
    console.error(error);
    alert(`Encountered an unexpected error, check the console logs for details: ${error.message}`);
  }, []);
  const handleEncryptionError = React.useCallback((error: Error) => {
    console.error(error);
    alert(
      `Encountered an unexpected encryption error, check the console logs for details: ${error.message}`,
    );
  }, []);

  const handleBack=()=>{
    router.back()
  }

  return (
    <>
      <button onClick={handleBack} className="flex mx-10 my-6 text-black items-center gap-2 font-semibold">
            <BackIcon /> <span className="text-black font-bold">Go back</span> 
          </button>
      <LiveKitRoom
     
        // connect={e2eeSetupComplete}
        // room={room}
        // token={props.connectionDetails.participantToken}
        // serverUrl={props.connectionDetails.serverUrl}
        // // connectOptions={connectOptions}
    
        // video={props.userChoices.videoEnabled}
        // audio={props.userChoices.audioEnabled}
        // onDisconnected={handleOnLeave}
        // onEncryptionError={handleEncryptionError}
        // onError={handleError}
                            


            video={false}
      audio={false}
      token={props.connectionDetails.participantToken}
      serverUrl={props.connectionDetails.serverUrl}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100dvh' }}
      >
        {/* <VideoConference
          chatMessageFormatter={formatChatMessageLinks}
          SettingsComponent={SHOW_SETTINGS_MENU ? SettingsMenu : undefined}
        /> */}
        
        <RecordingIndicator />

          {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      {/* <RoomAudioRenderer /> */}
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <ControlBar  />
      </LiveKitRoom>
    </>
  );
}
