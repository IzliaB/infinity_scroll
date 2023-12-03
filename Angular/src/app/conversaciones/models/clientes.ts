import { CreatedAt } from "./usuarioConversaciones";

export interface ClienteInterface {
    lastOrganizationID: string;
    email:              null;
    fullName:           null;
    phoneNumber:        string;
    uid:                string;
    channelsID:         string[];
    lastChannelID:      string;
    organizationIDs:    string;
    hasTicketActive:    boolean;
    createdAt:          CreatedAt;
}