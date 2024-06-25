import { Socket } from 'phoenix';

export const test = () => {
  const socket = new Socket('ws://10.2.13.12:4000/socket/v2/websocket?vsn=2.0.0');

  socket.connect();

  const topic = 'platon_appchain_l2_validator:all_validator';
  const event = 'allvalidator';

  // const topic = 'transactions:new_transaction';
  // const event = 'transaction';

  //所有验证人
  const channel = socket.channel(topic);
  channel.join()
    .receive('ok', (res) => {
      console.log('join', res);
    });
  channel.on(event, (msg) => {
    console.log('msg', msg);
  });
};
