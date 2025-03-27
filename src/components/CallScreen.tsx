import {
  CallingState,
  IncomingCall,
  StreamCall,
  useCall,
  useCalls,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type CallPanelProps = {
  setOverlayVisible?: Dispatch<SetStateAction<boolean>>;
};

const CallPanel = ({ setOverlayVisible }: CallPanelProps) => {
  const call = useCall();

  const [hasAnswered, setHasAnswered] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    const show =
      call &&
      callingState === CallingState.RINGING &&
      !call.isCreatedByMe &&
      !hasAnswered;

    setOverlayVisible?.(!!show);
  }, [call, callingState, hasAnswered]);

  const onAcceptCallHandler = async () => {
    if (!call) return;
    setHasAnswered(true);
    router.push({
      pathname: `/(room)/${call.id}`,
    });
  };

  const onRejectCallHandler = async () => {
    if (!call) return;

    try {
      await call.reject("busy");
      console.log("Call rejected successfully");
    } catch (error) {
      console.error("Error rejecting call:", error);
    }
  };

  // Display the incoming call if the call state is RINGING and the call is not created by me, i.e., recieved from others.
  if (
    callingState === CallingState.RINGING &&
    !call?.isCreatedByMe &&
    !hasAnswered
  ) {
    return (
      <IncomingCall
        onAcceptCallHandler={onAcceptCallHandler}
        onRejectCallHandler={onRejectCallHandler}
      />
    );
  }
};

export default function Call({ setOverlayVisible }: CallPanelProps) {
  const calls = useCalls();

  if (calls.length === 0) {
    return null; // No calls available, render nothing
  }

  const call = calls[0];

  return (
    <StreamCall call={call}>
      <CallPanel setOverlayVisible={setOverlayVisible} />
    </StreamCall>
  );
}
