export interface CardSpDocument {
    no_sp_document: number;
    sending: Text;
    sending_date: Date;
    receiver: Text;
    receive_date: Date;
    status_card: 'Open' | 'Delivered'
}