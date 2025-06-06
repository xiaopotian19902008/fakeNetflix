import { useWebSocket } from '@/composables/chat/useWebSocket';
import { useChatState } from '@/store/modules/chat';

/**
 * chat
 */
export function useChat() {

  /**
   * 接收消息
   */
  const receiveMsg = (webSocketMsg: Websocket.webSocketMsg): void => {
    const msgStore = useChatState()
    const data = JSON.parse(webSocketMsg.data.toString())
    switch (webSocketMsg.type) {
      // 未读消息数
      case 'unreadCount':
        msgStore.setUnreadCount(data.count)
        break
      // 消息
      case 'msg':
        msgStore.addMsg(data.list)
        break
      default:
        break
    }
  }

  const { send } = useWebSocket(receiveMsg)


  /**
   * 发送"活跃状态"信息
   */
  const sendActiveStatusMsg = (active: boolean) => {
    let data = {
      active: active
    }
    send('activeStatus', data)
  }

  /**
   * 发送"会话建立"信息
   */
  const sendSessionEstablishMsg = (contact: Chat.user) => {
    send('sessionEstablish', contact)
  }

  /**
   * 发送"通信消息"消息
   */
  const sendCommunicateMsg = (msg: string) => {
    let data = {
      msg: msg
    }
    send('communicateMsg', data)
  }

  return {
    sendActiveStatusMsg,
    sendSessionEstablishMsg,
    sendCommunicateMsg
  }
}
