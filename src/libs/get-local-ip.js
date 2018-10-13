export const getLoaclIp = () => {
  window.RTCPeerConnection = window.RTCPeerConnection
    || window.mozRTCPeerConnection
    || window.webkitRTCPeerConnection // compatibility for Firefox and chrome
  const pc = new RTCPeerConnection({ iceServers: [] })
  const noop = () => {}
  pc.createDataChannel('') // create a bogus data channel
  pc.createOffer(pc.setLocalDescription.bind(pc), noop) // create offer and set local description
  return new Promise((resolve) => {
    pc.onicecandidate = (ice) => {
      if (ice && ice.candidate && ice.candidate.candidate) {
        const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
          ice.candidate.candidate,
        )[1]
        resolve(myIP)
        pc.onicecandidate = noop
      }
    }
  })
}
