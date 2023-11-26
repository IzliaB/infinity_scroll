export interface BodyMessage {
    content?: string;
    toPhone: string;
    uploaded_file: any;
    customerID: string;
    conversationID: string;
    fromPhoneNumber: string;
}

export interface ResponseImage {
    messaging_product: string;
    to: string;
    type: string;
    image?: Image;
    text?: Text;
}

export interface Image {
    link: string;
}

export interface Text {
    body: string;
}

export interface Document{
    filename:string;
    link: string;
}

export type TypeMessage = 'image' | 'document'
