export interface CardSpDocument {
    spdoc_data: any;
    id_sp_data: number;
    sending: Text;
    sending_date: Date;
    receiver: Text;
    receive_date: Date;
    status_card: 'Open' | 'Delivered'
}