export interface MessageInterface {
    from_phone_number: string;
    to_phone_number: string;
    message_text: string;
}

export interface SendMessageInterface {
    conversationID?: string;
    customerID: string;
    fromPhoneNumber: string;
    toPhoneNumber: string;
    templateID: string;
    attachment: [];
    templateData?: TemplateData[];
}

export interface TemplateData {
    data: string;
    contentType: string;
    type: string;
}
export interface MessageTemplate {
    id: string;
    name: string;
    language: LanguageTemplate;
    components: Component[];
}

export interface LanguageTemplate {
    code: string;
}

export interface Component {
    type: string;
    format: Format[];
}

export interface Format {
    type: string;
    link?: string;
    filename?: string;
    text?: string;
    caption?: string;
    url_image?: string;
    url_video?: string;
}

//Usuarios
export interface UserData {
    id: string;
    channelsID: string[];
    email: string | null;
    hasTicketActive: boolean;
    lastChannelID: string;
    lastOrganizationID: string;
    organizationIDs: string[];
    phoneNumber: string;
    uid: string;
    createdAt: string;
}

export interface Customer {
    email?: string;
    fullName?: string;
    lastChannelID?: string;
    lastOrganizationID?: string;
    phoneNumber: string;
}
