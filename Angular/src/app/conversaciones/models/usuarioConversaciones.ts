export interface UsuarioConversaciones {
    id?: string,
    customerInfo: CustomerInfo,
    date: CreatedAt,
    lastMessage: LastMessageInfo,
    uid: string,
    userID: string
}

export interface CustomerInfo {
    customerID: string;
    displayName: string;
    photoURL: string;
}

export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface LastMessageInfo {
    content: string;
    lastConversationID: string;
    lastMessageID: string;
    type: string
    isMessageCustomer: boolean
}