export interface ConversationMessagesInterface {
    id:               string;
    channelID:        string;
    status:           boolean;
    isClosed:         boolean;
    readDateTime:     CreatedAt;
    userIDs:          any[];
    uid?:             string;
    read:             boolean;
    customerID:       string;
    accountServiceID: string;
    lastMessageID:    string;
    createdAt:        CreatedAt;
    ticketID:         string;
    messages:         Message[];
    updateAt?:        CreatedAt;
}

export interface CreatedAt {
    seconds:     number;
    nanoseconds: number;
}

export interface Message {
    content:           string;
    createdAt:         CreatedAt;
    status:            boolean;
    customerID:        string;
    uid:               string;
    messageStatus:     string;
    channelID:         string;
    ticketID:          string;
    read:              boolean;
    userIDs:           any[];
    readDateTime:      CreatedAt | null;
    isMessageCustomer: boolean;
    conversationID:    string;
    attachment:        Attachment[];
    typeMessage:       TypeMessage;
    id:                string;
}

export interface Attachment {
    content:     string;
    type:        Type;
    filename:    string;
    contentType: string;
}

export enum Type {
    Body = "BODY",
    Header = "HEADER",
}

export enum TypeMessage {
    Audio = "audio",
    Document = "document",
    Image = "image",
    Template = "template",
    Text = "text",
    Video = "video",
}