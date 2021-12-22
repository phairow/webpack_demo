const PubNub = require("pubnub");

const pubnub = new PubNub({
  publishKey: "demo",
  subscribeKey: "demo",
  uuid: "my-id",
});

async function publishSampleMessage() {
  console.log(
    "Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish."
  );
  const result = await pubnub.publish({
    channel: "hello_world",
    message: {
      title: "greeting",
      description: "hello world!",
    },
  });
  console.log(result);
}

pubnub.addListener({
  status: function (statusEvent) {
    if (statusEvent.category === "PNConnectedCategory") {
      publishSampleMessage();
    }
  },
  message: function (messageEvent) {
    console.log(messageEvent.message.title);
    console.log(messageEvent.message.description);
  }
});
console.log("Subscribing..");

pubnub.subscribe({
  channels: ["hello_world"],
});